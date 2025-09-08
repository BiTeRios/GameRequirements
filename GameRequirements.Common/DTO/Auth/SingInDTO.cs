using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class SingInDTO
    {
        public string Email { get; set; } //email
        public string Password { get; set; } //pasword
        public string LoginIp { get; set; } //ID user
        public DateTime DateTime { get; set; } // Time register

    }
}
