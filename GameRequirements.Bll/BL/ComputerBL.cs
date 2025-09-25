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
        {
            var cpu = await hardwareRepository.GetCpuByNameAsync(computerDto.CpuName);
            var gpu = await hardwareRepository.GetGpuByNameAsync(computerDto.GpuName);

            var computer = new DBComputer
            {
                Uuid = Guid.NewGuid(),
                ProcessorId = cpu!.Id,
                VideoCardId = gpu!.Id,
                RAM = computerDto.RamGB,
                UserId = userId
            };

            try
            {
                computerRepository.Add(computer);
            }
            catch (Exception ex)
            {
                throw new ForbiddenException("Ошибка при добавлении компьютера.", ex);
            }

            await computerRepository.SaveChangesAsync();

            return computer;
        }
        public async Task<List<DBComputer>> GetUserComputersAsync(long userId)
            => await computerRepository.GetUserComputersAsync(userId);

    }
}
