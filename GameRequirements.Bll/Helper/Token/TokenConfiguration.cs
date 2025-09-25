using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Helper.Token
{
    public class TokenConfiguration
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpiryMinutes { get; set; }
        public int RefreshTokenExpirationDays { get; set; }
        public string SecretKey { get; set; }
    }
}
