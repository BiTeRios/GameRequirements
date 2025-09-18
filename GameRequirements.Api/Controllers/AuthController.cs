using GameRequirements.Bll;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Auth;
using GameRequirements.Common.DTO.Requests;
using GameRequirements.Common.DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameRequirements.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ISessionBL _sessionBL;

        public AuthController(ISessionBL sessionBL)
        {
            _sessionBL = sessionBL;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SingInDTO singInDTO)
        {
            var result = await _sessionBL.SingIn(singInDTO);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LogInDTO logInDTO)
        {
            var token = await _sessionBL.LogIn(logInDTO);
            return Ok(token);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest userData)
        {
            var token = await _sessionBL.RefreshTokens(userData.AccessToken, userData.RefreshToken);
            return Ok(token);
        }
    }
}
