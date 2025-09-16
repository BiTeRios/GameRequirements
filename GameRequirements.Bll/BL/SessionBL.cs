using GameRequirements.Bll.Helper.PasswordHash;
using GameRequirements.Bll.Helper.Token;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Auth;
using GameRequirements.Common.Exceptions;
using GameRequirements.Dal.Core;
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
    public class SessionBL : UserApi, ISession
    {
        private readonly TokenService _tokenService;
        private readonly TokenConfiguration _tokenConfiguration;

        public SessionBL(IOptions<TokenConfiguration> tokenConfiguration)
        {
            _tokenConfiguration = tokenConfiguration.Value;
        }
        public SingInSuccess SingIn(SingInDTO singInDTO)
        {
            var result = new SingInSuccess();

            if (EmailExistsAction(singInDTO.Email))
            {
                result.Success = false;
                result.EmailSuccess = false;
                result.Message = "Email is already registered.";
                return result;
            }

            var passwordHash = PasswordHelper.HashPassword(singInDTO.Password);

            var newUser = new DBUser
            {
                Email = singInDTO.Email,
                PasswordHash = passwordHash,
                LoginDateTime = DateTime.Now,
            };

            AddUserAction(newUser);

            //await userRepository.SaveChangesAsync();   ???

            var tokenId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(newUser.Id, tokenId);

            var userSession = new DBUserSession
            {
                Id = Guid.NewGuid(),
                UserId = newUser.Id,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            AddUserSessionAction(userSession);

            //await userRepository.SaveChangesAsync();   ???

            result.Success = true;
            result.EmailSuccess = true;
            result.Message = "User registered successfully";
            result.AccessToken = token.AccessToken;
            result.RefreshToken = token.RefreshToken;

            return result;
        }
        public LogInSuccess LogIn(LogInDTO logInDTO)
        {
            var result = new LogInSuccess();

            var user = GetUserByCredentialAction(logInDTO.Email);

            if (user != null)
            {
                result.Success = false;
                result.EmailSuccess = false;
                result.PasswordSuccess = false;
                result.Message = "User not found.";
                return result;
            }

            result.EmailSuccess = true;

            if(!PasswordHelper.VerifyPassword(logInDTO.Password, user.PasswordHash))
            {
                result.Success = false;
                result.PasswordSuccess = false;
                result.Message = "Incorrect password.";
                return result;
            }

            var tokenId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(user.Id, tokenId);

            var userSession = new DBUserSession
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                RefreshToken = token.RefreshToken,
                JwtId = tokenId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            AddUserSessionAction(userSession);

            result.Success = true;
            result.UserId = user.Id;
            result.PasswordSuccess = true;
            result.Message = "Login successful.";
            result.AccessToken = token.AccessToken;
            result.RefreshToken = token.RefreshToken;
            result.RefreshTokenExpiration = userSession.RefreshTokenExpiration;

            return result;
        }
        public LogInSuccess RefreshTokens(string accessToken, string refreshToken)
        {
            var tokenHalder = new JwtSecurityTokenHandler();
            var validationParametrs = _tokenService.GetValidationParameters();

            var principal = tokenHalder.ValidateToken(accessToken, validationParametrs, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken 
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new ForbiddenException("Invalid token");

            var storedToken = GetSessionByRefreshTokenAction(refreshToken);

            if(storedToken ==  null)
                throw new ForbiddenException("Invalid refresh token");

            if(storedToken.Redeemed)
                throw new ForbiddenException("Refresh token already used");

            var jwtId = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.ToString(); // спросить Андрея, если не понимаю как работает(Виорел)
            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (jwtId == null || userIdClaim == null 
                || storedToken.User.Id.ToString() != userIdClaim 
                || "jti: " + storedToken.JwtId != jwtId 
                || DateTime.Now > storedToken.RefreshTokenExpiration)
                throw new ForbiddenException("Invalid access token");

            var newJwtId = Guid.NewGuid().ToString();
            var token = _tokenService.GetToken(storedToken.User.Id, newJwtId);

            var newSession = new DBUserSession
            {
                Id = Guid.NewGuid(),
                UserId = storedToken.User.Id,
                RefreshToken = token.RefreshToken,
                JwtId = newJwtId,
                RefreshTokenExpiration = DateTime.Now.AddDays(_tokenConfiguration.RefreshTokenExpirationDays),
                Redeemed = false
            };

            AddUserSessionAction(newSession);

            storedToken.Redeemed = true;
            UpdateUserSessionAction(storedToken);

            return new LogInSuccess
            {
                Success = true,
                UserId = storedToken.User.Id,
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken,
                RefreshTokenExpiration = newSession.RefreshTokenExpiration,
                Message = "Token refreshed successfully",
                EmailSuccess = true,
                PasswordSuccess = true
            };
        }
    }
}
