using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Computer;

namespace GameRequirements.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public sealed class ComputersController : ControllerBase
    {
        private readonly IComputerBL _computerBL;
        private readonly IUserBL _userBL;
        private readonly ILogger<ComputersController> _logger;

        public ComputersController(
            IComputerBL computerBL,
            IUserBL userBL,
            ILogger<ComputersController> logger)
        {
            _computerBL = computerBL;
            _userBL = userBL;
            _logger = logger;
        }

        // GET: /api/computers/my
        [HttpGet("my")]
        public async Task<IActionResult> GetMy()
        {
            var userId = await ResolveUserIdAsync();
            if (userId <= 0)
                return Conflict(new { message = "Invalid userId in access token." });

            var list = await _computerBL.GetUserComputersAsync(userId);
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ComputerDTO dto)
        {
            if (dto is null)
                return BadRequest(new { message = "Body is required" });

            var userId = await ResolveUserIdAsync();
            if (userId <= 0)
                return Conflict(new { message = "Invalid userId in access token." });

            // 🔧 Нормализация строк (убираем NBSP, двойные пробелы и т.п.)
            static string Norm(string s) =>
                string.IsNullOrWhiteSpace(s) ? "" :
                System.Text.RegularExpressions.Regex.Replace(
                    s.Replace('\u00A0', ' ').Trim(), @"\s{2,}", " ");

            dto.CpuName = Norm(dto.CpuName);
            dto.GpuName = Norm(dto.GpuName);

            try
            {
                var created = await _computerBL.AddComputerForUserAsync(userId, dto);

                // Лучше вернуть 201 + Location
                return CreatedAtAction(nameof(GetMy), new { }, created);
            }
            catch (ArgumentException ex) // будем кидать из BL, см. ниже
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ----------------- helpers -----------------

        /// <summary>
        /// 1) Пытаемся взять числовой userId из клеймов.
        /// 2) Иначе берём UUID из токена и через IUserBL получаем числовой Id,
        ///    не меняя DTO/интерфейсы (рефлексия).
        /// </summary>
        private async Task<long> ResolveUserIdAsync()
        {
            // 1) Прямой числовой userId из токена (если ты его когда-нибудь добавишь)
            var rawId =
                User.FindFirstValue("userId") ??
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!string.IsNullOrWhiteSpace(rawId) && long.TryParse(rawId, out var id) && id > 0)
                return id;

            // 2) UUID пользователя: сейчас у тебя sub = uuid
            var rawUuid =
                User.FindFirstValue("sub") ??
                User.FindFirstValue("uuid") ??
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(rawUuid) || !Guid.TryParse(rawUuid, out var uuid) || uuid == Guid.Empty)
                return 0;

            // 2.a) Если в IUserBL есть метод GetIdByUuidAsync(Guid) — используем его (без изменения интерфейсов в коде)
            try
            {
                var blType = _userBL.GetType();
                var getIdMethod = blType.GetMethod("GetIdByUuidAsync", BindingFlags.Public | BindingFlags.Instance);
                if (getIdMethod != null)
                {
                    var taskObj = getIdMethod.Invoke(_userBL, new object[] { uuid });
                    if (taskObj is Task task)
                    {
                        await task.ConfigureAwait(false);
                        var resultProp = task.GetType().GetProperty("Result");
                        if (resultProp != null)
                        {
                            var resultVal = resultProp.GetValue(task);
                            if (resultVal != null && long.TryParse(resultVal.ToString(), out var idByUuid) && idByUuid > 0)
                                return idByUuid;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "ResolveUserIdAsync: GetIdByUuidAsync not available or failed.");
            }

            // 2.b) Иначе — GetByUuidAsync(Guid) и достаём Id рефлексией у возвращаемого DTO (не меняя UserPublicDto)
            try
            {
                var blType = _userBL.GetType();
                var getUserMethod = blType.GetMethod("GetByUuidAsync", BindingFlags.Public | BindingFlags.Instance);
                if (getUserMethod != null)
                {
                    var taskObj = getUserMethod.Invoke(_userBL, new object[] { uuid });
                    if (taskObj is Task task)
                    {
                        await task.ConfigureAwait(false);
                        var resultProp = task.GetType().GetProperty("Result");
                        var userDto = resultProp?.GetValue(task);
                        if (userDto != null)
                        {
                            // пробуем стандартные имена полей/свойств с id
                            var idProp = userDto.GetType().GetProperty("Id")
                                        ?? userDto.GetType().GetProperty("UserId")
                                        ?? userDto.GetType().GetProperty("DBUserId");

                            if (idProp != null)
                            {
                                var idVal = idProp.GetValue(userDto);
                                if (idVal != null && long.TryParse(idVal.ToString(), out var idFromDto) && idFromDto > 0)
                                    return idFromDto;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "ResolveUserIdAsync: failed to resolve user by UUID via GetByUuidAsync.");
            }

            return 0;
        }
    }
}
