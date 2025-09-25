// GameRequirements.Api/Controllers/UsersController.cs
using GameRequirements.Dal.Core;
using GameRequirements.Common.DTO.Users; // если нужно, но мы вернём анонимку
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace GameRequirements.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _users;

        public UsersController(UserRepository users) // <-- БЕЗ IMapper
        {
            _users = users;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            try
            {
                // достаём UUID из токена
                var uuidStr = User.FindFirstValue(ClaimTypes.NameIdentifier)
                           ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

                if (string.IsNullOrWhiteSpace(uuidStr) || !Guid.TryParse(uuidStr, out var uuid))
                    return Unauthorized(new { message = "Invalid token subject (sub)" });

                var dbUser = await _users.GetByUuidAsync(uuid);
                if (dbUser == null)
                    return NotFound(new { message = "User not found" });

                // Возвращаем ТОЛЬКО email — как ты просил
                return Ok(new { email = dbUser.Email });
            }
            catch (Exception ex)
            {
                // временно даём понятный ответ, чтобы увидеть первопричину
                return StatusCode(500, new { message = "Internal error in /users/me", error = ex.Message });
            }
        }
    }
}
