using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class SingInSuccess
    {
        public bool Success { get; set; } //Registration result
        public bool EmailSuccess { get; set; } //Check if a user with this email is registered
        public string Message { get; set; } //Message for the user
        public string AccessToken { get; set; }   //JWT token
        public string RefreshToken { get; set; } //Refresh token
    }
}
