using GameRequirements.Domain.Context;
using GameRequirements.Domain.Entites.Games;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Dal.Core
{
    public class GamesRepository : BaseRepository
    {
        private readonly DataContext _dataContext;

        public GamesRepository(DataContext dataContext)
        : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<DBGames>> GetGamesBatchAsync(int skip, int take)
        {
            return await dataContext.Games
                .AsNoTracking()
                .OrderBy(g => g.Id)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

    }
}
