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
    public class SessionBL : ISessionBL
    {
        private readonly TokenService _tokenService;
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly UserRepository _userRepository;

        public SessionBL(IOptions<TokenConfiguration> tokenConfiguration, UserRepository userRepository, TokenService tokenService)
        {
            _tokenConfiguration = tokenConfiguration.Value;
            _userRepository = userRepository;
            _tokenService = tokenService;
        }
        public async Task<AuthSuccessResponse> SignUp(SignUpDTO signUpDTO)
        {
            if (_userRepository.EmailExists(signUpDTO.Email))
            {
                throw new ConflictAppException("Пользователь с таким email уже существует.", "email_taken");
            }

            var passwordHash = PasswordHelper.HashPassword(signUpDTO.Password);

            var newUser = new DBUser
            {
                Uuid = Guid.NewGuid(),
                Email = signUpDTO.Email,
                PasswordHash = passwordHash,
                LoginDateTime = DateTime.Now,
            };

            var tokenId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(newUser.Uuid, tokenId);

            var userSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                User = newUser,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            try
            {
                _userRepository.Add(newUser);
                _userRepository.Add(userSession);
                await _userRepository.SaveChangesAsync();

                return new AuthSuccessResponse
                {
                    AccessToken = token.AccessToken,
                    RefreshToken = token.RefreshToken
                };
            }
            catch (Exception ex)
            {
                throw new ForbiddenAppException("Ошибка при создании пользователя.", "user_create_failed");
            }
        }
        public async Task<AuthSuccessResponse> LogIn(LogInDTO logInDTO)
        {
            var user = _userRepository.GetUserByEmail(logInDTO.Email);
            if (user == null)
            {
                throw new UnauthorizedAppException("Пользователь с таким email не найден.", "user_not_found");
            }

            if (!PasswordHelper.VerifyPassword(logInDTO.Password, user.PasswordHash))
            {
                throw new UnauthorizedAppException("Неверный пароль.", "bad_credentials");
            }

            var tokenId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(user.Uuid, tokenId);

            var userSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                User = user,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            try
            {
                _userRepository.Add(userSession);
                await _userRepository.SaveChangesAsync();

                return new AuthSuccessResponse
                {
                    AccessToken = token.AccessToken,
                    RefreshToken = token.RefreshToken
                };
            }
            catch (Exception ex)
            {
                throw new ForbiddenAppException("Ошибка при создании сессии пользователя.", "session_create_failed");
            }
        }
        public async Task<AuthSuccessResponse> RefreshTokens(string accessToken, string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = _tokenService.GetValidationParameters();

            var principal = tokenHandler.ValidateToken(accessToken, validationParameters, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new UnauthorizedAppException("Invalid token", "invalid_access");
            }

            var storedToken = await _userRepository.GetSessionByRefreshToken(refreshToken);
            if (storedToken == null)
                throw new UnauthorizedAppException("Invalid refresh token", "invalid_refresh");

            if (storedToken.Redeemed)
                throw new ForbiddenAppException("Refresh token already used", "refresh_redeemed");

            var jwtId = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.ToString();
            var userUuid = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (jwtId == null || userUuid == null 
                || !string.Equals(storedToken.User.Uuid.ToString(), userUuid, StringComparison.CurrentCultureIgnoreCase) 
                || !string.Equals("jti: " + storedToken.JwtId, jwtId, StringComparison.CurrentCultureIgnoreCase) 
                || DateTime.Now > storedToken.RefreshTokenExpiration)
            {
                throw new UnauthorizedAppException("Invalid access token", "invalid_access");
            }

            var newJwtId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(storedToken.User.Uuid, newJwtId);

            var newSession = new DBUserSession
            {
                Uuid = Guid.NewGuid(),
                UserId = storedToken.UserId,
                RefreshToken = token.RefreshToken,
                JwtId = newJwtId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            try
            {
                _userRepository.Add(newSession);
                storedToken.Redeemed = true;
                _userRepository.Update(storedToken);

                await _userRepository.SaveChangesAsync();

                return new AuthSuccessResponse
                {
                    AccessToken = token.AccessToken,
                    RefreshToken = token.RefreshToken
                };
            }
            catch (Exception ex)
            {
                throw new ForbiddenAppException("Ошибка при обновлении токенов.", "refresh_failed");
            }
        }
    }
}
