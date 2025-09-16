using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class LogInSuccess
    {
        public bool Success { get; set; } //Login result
        public bool EmailSuccess { get; set; } //Check if user is registered by email
        public bool PasswordSuccess { get; set; } //Password verification
        public string Message { get; set; }
        public Guid UserId { get; set; }
        public string AccessToken { get; set; }    // JWT токен
        public string RefreshToken { get; set; }   // Токен обновления
        public DateTime RefreshTokenExpiration { get; set; } // Срок действия refresh-токена (опционально)
    }
}
