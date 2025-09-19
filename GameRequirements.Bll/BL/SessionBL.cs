using GameRequirements.Bll.Helper.PasswordHash;
using GameRequirements.Bll.Helper.Token;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Auth;
using GameRequirements.Common.Exceptions;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.Context;
using GameRequirements.Domain.Entites.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.BL
{
    public class SessionBL(IOptions<TokenConfiguration> tokenConfiguration, UserRepository userRepository, TokenService tokenService) : ISessionBL
    {
        public async Task<AuthSuccessResponse> SingIn(SingInDTO singInDTO)
        {

            if (userRepository.EmailExists(singInDTO.Email))
            {
                throw new ForbiddenException("Пользователь с таким email уже существует.");
            }

            var passwordHash = PasswordHelper.HashPassword(singInDTO.Password);

            var newUser = new DBUser
            {
                Uuid = Guid.NewGuid(),
                Email = singInDTO.Email,
                PasswordHash = passwordHash,
                LoginDateTime = DateTime.Now,
            };

            var tokenId = Guid.NewGuid().ToString();
            var token = tokenService.GetToken(newUser.Uuid, tokenId);

            var userSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                User = newUser,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(tokenConfiguration.Value.RefreshTokenExpirationDays),
                Redeemed = false
            };

            using var transaction = await userRepository.BeginTransactionAsync();

            try
            {
                userRepository.Add(newUser);
                userRepository.Add(userSession);
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new ForbiddenException("Ошибка при создании пользователя.", ex);
            }

            await userRepository.SaveChangesAsync();

            return new AuthSuccessResponse
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken
            };
        }
        public async Task<AuthSuccessResponse> LogIn(LogInDTO logInDTO)
        {
            var user = userRepository.GetUserByEmail(logInDTO.Email);
            if (user == null)
            {
                throw new ForbiddenException("Пользователь с таким email не найден.");
            }

            if (!PasswordHelper.VerifyPassword(logInDTO.Password, user.PasswordHash))
            {
                throw new ForbiddenException("Неверный пароль.");
            }

            var tokenId = Guid.NewGuid().ToString();
            var token = tokenService.GetToken(user.Uuid, tokenId);

            var userSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                User = user,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(tokenConfiguration.Value.RefreshTokenExpirationDays),
                Redeemed = false
            };

            try
            {
                userRepository.Add(userSession);
                
            }
            catch (Exception ex)
            {
                throw new ForbiddenException("Ошибка при создании сессии пользователя.", ex);
            }

            await userRepository.SaveChangesAsync();

            return new AuthSuccessResponse
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken
            };
        }
        public async Task<AuthSuccessResponse> RefreshTokens(string accessToken, string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = tokenService.GetValidationParameters();

            var principal = tokenHandler.ValidateToken(accessToken, validationParameters, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new ForbiddenException("Invalid token");
            }

            var storedToken = await userRepository.GetSessionByRefreshToken(refreshToken);
            if (storedToken == null)
                throw new ForbiddenException("Invalid refresh token");

            if (storedToken.Redeemed)
                throw new ForbiddenException("Refresh token already used");

            var jwtId = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.ToString();
            var userUuid = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (jwtId == null || userUuid == null 
                || !string.Equals(storedToken.User.Uuid.ToString(), userUuid, StringComparison.CurrentCultureIgnoreCase) 
                || !string.Equals("jti: " + storedToken.JwtId, jwtId, StringComparison.CurrentCultureIgnoreCase) 
                || DateTime.Now > storedToken.RefreshTokenExpiration)
            {
                throw new ForbiddenException("Invalid access token");
            }

            var newJwtId = Guid.NewGuid().ToString();
            var token = tokenService.GetToken(storedToken.User.Uuid, newJwtId);

            var newSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                UserId = storedToken.UserId,
                RefreshToken = token.RefreshToken,
                JwtId = newJwtId,
                RefreshTokenExpiration = DateTime.Now.AddDays(tokenConfiguration.Value.RefreshTokenExpirationDays),
                Redeemed = false
            };

            try
            {
                userRepository.Add(newSession);
                storedToken.Redeemed = true;
                userRepository.Update(storedToken);
            }
            catch (Exception ex)
            {
                throw new ForbiddenException("Ошибка при обновлении токенов.", ex);
            }

            await userRepository.SaveChangesAsync();

            return new AuthSuccessResponse
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken
            };
        }
    }
}
