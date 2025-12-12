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
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            name = name.Replace('\u00A0', ' ').Trim();
            while (name.Contains("  ")) name = name.Replace("  ", " ");

            var lower = name.ToLower();

            return await _dataContext.Processors
                .AsNoTracking()
                .FirstOrDefaultAsync(c =>
                    // SQL Server переведёт в LOWER/TRIM
                    c.Name.Replace("\u00A0", " ").Trim().ToLower() == lower);
        }

        public IEnumerable<DBProcessor> GetAllCpus()
        => GetAll<DBProcessor>();

        public async Task<List<DBProcessor>> FindCpusAsync(string? q, int take = 20)
        {
            IQueryable<DBProcessor> query = _dataContext.Processors.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(p => p.Name.Contains(q));

            return await query
                .OrderBy(p => p.Name)
                .Take(take)
                .ToListAsync();
        }

        // ================= GPU =================
        public DBVideoCard? GetGpuByName(string name)
        => _dataContext.VideoCards.FirstOrDefault(g => g.Name == name);

        public async Task<DBVideoCard?> GetGpuByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            name = name.Replace('\u00A0', ' ').Trim();
            while (name.Contains("  ")) name = name.Replace("  ", " ");

            var lower = name.ToLower();

            return await _dataContext.VideoCards
                .AsNoTracking()
                .FirstOrDefaultAsync(g =>
                    g.Name.Replace("\u00A0", " ").Trim().ToLower() == lower);
        }

        public IEnumerable<DBVideoCard> GetAllGpus()
        => GetAll<DBVideoCard>();

        public async Task<List<DBVideoCard>> FindGpusAsync(string? q, int take = 20)
        {
            IQueryable<DBVideoCard> query = _dataContext.VideoCards.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(g => g.Name.Contains(q));

            return await query
                .OrderBy(g => g.Name)
                .Take(take)
                .ToListAsync();
        }
    }
}
