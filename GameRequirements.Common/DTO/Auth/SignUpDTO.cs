using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Auth
{
    public class SingInDTO
    {
        public required string Email { get; set; } //email
        public required string Password { get; set; } //pasword
    }
}
