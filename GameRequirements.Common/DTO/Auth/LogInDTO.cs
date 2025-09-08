using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class LogInDTO
    {
        public string Email { get; set; } //Email
        public string Password { get; set; } //Password
        public string LoginIp { get; set; } //ID user
        public DateTime DateTime { get; set; } //Entry time
    }
}
