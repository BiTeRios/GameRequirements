using AutoMapper; // +++
using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameRequirements.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/hardware
    public sealed class HardwareController : ControllerBase
    {
        private readonly IPerformanceBL _hardware;
        private readonly IMapper _mapper; // +++

        public HardwareController(IPerformanceBL hardware, IMapper mapper) // +++
        {
            _hardware = hardware;
            _mapper = mapper; // +++
        }

        // GET /api/hardware/cpus?q=ryzen
        [HttpGet("cpus")]
        [AllowAnonymous]
        public async Task<IActionResult> Cpus([FromQuery(Name = "q")] string? query, [FromQuery] int take = 20)
        {
            var list = await _hardware.FindCpusAsync(query, take);
            var dto = _mapper.Map<List<ComboItemDto>>(list);
            return Ok(dto);
        }

        // GET /api/hardware/gpus?q=rtx
        [HttpGet("gpus")]
        [AllowAnonymous]
        public async Task<IActionResult> Gpus([FromQuery(Name = "q")] string? query, [FromQuery] int take = 20)
        {
            var list = await _hardware.FindGpusAsync(query, take);
            var dto = _mapper.Map<List<ComboItemDto>>(list);
            return Ok(dto);
        }
    }
}
