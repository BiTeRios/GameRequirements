using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class AuthSuccessResponse
    {
        public string AccessToken { get; set; }    // JWT токен
        public string RefreshToken { get; set; }   // Refresh токен
        public DateTime RefreshTokenExpiration { get; set; } // Срок действия refresh-токена
    }
}
