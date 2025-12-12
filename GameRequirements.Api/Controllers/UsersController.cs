using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GameRequirements.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserBL _users;

        public UsersController(IUserBL users)
        {
            _users = users;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            // достаём UUID из токена (sub / NameIdentifier)
            var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
                      ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (string.IsNullOrWhiteSpace(sub) || !Guid.TryParse(sub, out var uuid))
                return Unauthorized(new { message = "Invalid token subject (sub)" });

            var dto = await _users.GetByUuidAsync(uuid);
            if (dto is null)
                return NotFound(new { message = "User not found" });

            // Если фронту нужен только email — раскомментируй:
            // return Ok(new { email = dto.Email });

            return Ok(dto); // Вернём весь UserPublicDto: Uuid, Email, LoginDateTime
        }
    }
}
