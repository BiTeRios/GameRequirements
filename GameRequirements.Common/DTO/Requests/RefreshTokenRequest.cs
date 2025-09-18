using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Requests
{
    public class RefreshTokenRequest
    {
        public required string AccessToken { get; set; }

        public required string RefreshToken { get; set; }
    }
}
