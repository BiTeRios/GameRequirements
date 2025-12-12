using GameRequirements.Common.DTO.Computer;
using GameRequirements.Common.DTO.Game;
using GameRequirements.Common.Enums;
using GameRequirements.Domain.Entites.Completing_computers;
using GameRequirements.Domain.Entites.Games;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll.Interface
{
    public interface IPerformanceBL
    {
        Task<PerformanceLevel> EvaluateAsync(GameDTO game, ComputerDTO computer);
        Task<Dictionary<string, PerformanceLevel>> EvaluateAllGamesAsync(ComputerDTO computer, int batchSize = 30);
        Task<List<DBProcessor>> FindCpusAsync(string? q, int take = 20);
        Task<List<DBVideoCard>> FindGpusAsync(string? q, int take = 20);
    }
}
