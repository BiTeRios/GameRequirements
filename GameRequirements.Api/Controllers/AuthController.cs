using GameRequirements.Bll;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Auth;
using GameRequirements.Common.DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameRequirements.Api.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly ISessionBL _sessionBL;

        public AuthController(ISessionBL sessionBL)
        {
            _sessionBL = sessionBL;
        }

        [Route("token")]
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SingInDTO dto)
        {
            var result = await _sessionBL.SingIn(dto);
            return Ok(result);
        }
    }
}
