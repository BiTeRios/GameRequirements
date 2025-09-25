using GameRequirements.Common.DTO.Responses;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Helper.Token
{
    public class TokenService
    {
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly SymmetricSecurityKey _signingKey;

        public TokenService(IOptions<TokenConfiguration> tokenConfiguration)
        {
            _tokenConfiguration = tokenConfiguration.Value;
            _signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfiguration.SecretKey));
        }
        internal TokenResponse GetToken(Guid userUuid, string jwtId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, userUuid.ToString()), // sub = кто владелец токена (userId)
                new(JwtRegisteredClaimNames.Jti, jwtId), // jti = уникальный id токена
                new(JwtRegisteredClaimNames.Iat, DateTimeOffset.Now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64), // iat = когда был выпущен (issued at)
            };

            var now = DateTime.UtcNow;
            var expiry = now.AddMinutes(_tokenConfiguration.ExpiryMinutes);
            var expiresIn = (int)(expiry - now).TotalSeconds;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiry,
                SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256Signature), // ключ + алгоритм
                Issuer = _tokenConfiguration.Issuer, 
                Audience = _tokenConfiguration.Audience 
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenResponse = new TokenResponse
            {
                AccessToken = tokenHandler.WriteToken(token),
                RefreshToken = GenerateRefreshToken(),
                ExpiresIn = expiresIn
            };

            return tokenResponse;
        }
        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        internal TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,
                ValidateIssuer = true,
                ValidIssuer = _tokenConfiguration.Issuer,
                ValidateAudience = true,
                ValidAudience = _tokenConfiguration.Audience,
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero
            };
        }
    }
}
