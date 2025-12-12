using GameRequirements.Common.DTO.Computer;
using GameRequirements.Domain.Entites.Completing_computers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Interface
{
    public interface IComputerBL
    {
        Task<DBComputer> AddComputerForUserAsync(long userId, ComputerDTO computerDto);
        Task<List<DBComputer>> GetUserComputersAsync(long userId);
        Task<DBComputer> UpdateComputerForUserAsync(long userId, long computerId, ComputerDTO computerDto);
        Task DeleteComputerForUserAsync(long userId, long computerId);
    }
}
