using GameRequirements.Bll.Interface;
using GameRequirements.Common.DTO.Computer;
using GameRequirements.Common.Exceptions;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.Entites.Completing_computers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.BL
{
    public class ComputerBL(ComputerRepository computerRepository, HardwareRepository hardwareRepository) : IComputerBL
    {
        public async Task<DBComputer> AddComputerForUserAsync(long userId, ComputerDTO computerDto)
        {    // 💡 быстрая валидация
            if (userId <= 0) throw new ArgumentException("Invalid user.");
            if (computerDto is null) throw new ArgumentException("Empty body.");
            if (computerDto.RamGB <= 0) throw new ArgumentException("RAM must be positive.");

            // 🔧 Нормализация (та же функция, что и в контроллере, можно вынести в утилиту)
            static string Norm(string s) =>
                string.IsNullOrWhiteSpace(s) ? "" :
                System.Text.RegularExpressions.Regex.Replace(
                    s.Replace('\u00A0', ' ').Trim(), @"\s{2,}", " ");
            var cpuName = Norm(computerDto.CpuName);
            var gpuName = Norm(computerDto.GpuName);

            var cpu = await hardwareRepository.GetCpuByNameAsync(computerDto.CpuName);
            if (cpu is null) throw new ArgumentException($"Processor not found: '{cpuName}'");
            var gpu = await hardwareRepository.GetGpuByNameAsync(computerDto.GpuName);
            if (gpu is null) throw new ArgumentException($"Video card not found: '{gpuName}'");


            var computer = new DBComputer
            {
                Uuid = Guid.NewGuid(),
                ProcessorId = cpu!.Id,
                VideoCardId = gpu!.Id,
                RAM = computerDto.RamGB,
                UserId = userId
            };

            computerRepository.Add(computer);
            await computerRepository.SaveChangesAsync();
            return computer;
        }
        public async Task<List<DBComputer>> GetUserComputersAsync(long userId)
            => await computerRepository.GetUserComputersAsync(userId);
        public async Task<DBComputer> UpdateComputerForUserAsync(long userId, long computerId, ComputerDTO dto)
{
    if (dto == null) throw new ArgumentNullException(nameof(dto));
    if (dto.RamGB <= 0) throw new ArgumentException("RAMGB должен быть > 0.");

    var cpu = await hardwareRepository.GetCpuByNameAsync(dto.CpuName)
              ?? throw new ArgumentException($"Процессор «{dto.CpuName}» не найден.");
    var gpu = await hardwareRepository.GetGpuByNameAsync(dto.GpuName)
              ?? throw new ArgumentException($"Видеокарта «{dto.GpuName}» не найдена.");

    var computer = await computerRepository.GetByIdForUserAsync(userId, computerId)
                   ?? throw new KeyNotFoundException("Конфигурация не найдена или принадлежит другому пользователю.");

    computer.ProcessorId = cpu.Id;
    computer.VideoCardId = gpu.Id;
    computer.RAM = dto.RamGB;

    computerRepository.Update(computer);
    await computerRepository.SaveChangesAsync();
    return computer;
}

public async Task DeleteComputerForUserAsync(long userId, long computerId)
{
    var computer = await computerRepository.GetByIdForUserAsync(userId, computerId)
                   ?? throw new KeyNotFoundException("Конфигурация не найдена или принадлежит другому пользователю.");
    computerRepository.Remove(computer);
    await computerRepository.SaveChangesAsync();
}
    }
}
