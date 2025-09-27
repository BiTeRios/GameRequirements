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

    }
}
