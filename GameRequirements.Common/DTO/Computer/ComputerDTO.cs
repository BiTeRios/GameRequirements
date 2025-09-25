using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Common.DTO.Computer
{
    public class ComputerDTO
    {
        public required string CpuName { get; set; }
        public required string GpuName { get; set; }
        public required int RamGB { get; set; }
    }
}
