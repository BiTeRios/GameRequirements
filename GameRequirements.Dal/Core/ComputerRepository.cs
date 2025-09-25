using GameRequirements.Domain.Context;
using GameRequirements.Domain.Entites.Completing_computers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Dal.Core
{
    public class ComputerRepository : BaseRepository
    {
        private readonly DataContext _dataContext;

        public ComputerRepository(DataContext dataContext)
        : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<DBComputer>> GetUserComputersAsync(long userId)
        {
            return await _dataContext.Computers
                .Include(c => c.Processor)
                .Include(c => c.VideoCard)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }
    }
}
