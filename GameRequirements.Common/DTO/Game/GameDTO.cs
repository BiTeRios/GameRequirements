using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Game
{
    public class GameDTO
    {
        public string Name { get; set; } = string.Empty;

        // Минимальные требования
        public string MinCpu { get; set; } = string.Empty;
        public string MinGpu { get; set; } = string.Empty;
        public int MinRamGB { get; set; }

        // Рекомендуемые требования
        public string RecCpu { get; set; } = string.Empty;
        public string RecGpu { get; set; } = string.Empty;
        public int RecRamGB { get; set; }
    }
}
