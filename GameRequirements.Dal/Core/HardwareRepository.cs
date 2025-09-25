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
    public class HardwareRepository : BaseRepository
    {
        private readonly DataContext _dataContext;

        public HardwareRepository(DataContext dataContext)
        : base(dataContext) 
        {
            _dataContext = dataContext;
        }

        // ================= CPU =================
        public DBProcessor? GetCpuByName(string name)
        => _dataContext.Processors.FirstOrDefault(c => c.Name == name);

        public async Task<DBProcessor?> GetCpuByNameAsync(string name)
        => await _dataContext.Processors.FirstOrDefaultAsync(c => c.Name == name);

        public IEnumerable<DBProcessor> GetAllCpus()
        => GetAll<DBProcessor>();

        // ================= GPU =================
        public DBVideoCard? GetGpuByName(string name)
        => _dataContext.VideoCards.FirstOrDefault(g => g.Name == name);

        public async Task<DBVideoCard?> GetGpuByNameAsync(string name)
        => await _dataContext.VideoCards.FirstOrDefaultAsync(g => g.Name == name);


        public IEnumerable<DBVideoCard> GetAllGpus()
        => GetAll<DBVideoCard>();

    }
}
