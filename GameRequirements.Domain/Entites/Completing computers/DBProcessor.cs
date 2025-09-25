using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.Completing_computers
{
    public class DBProcessor : BaseId
    {
        [Required]
        [Display(Name = "Name")]
        [StringLength(50)]
        public required string Name { get; set; }

        [Required]
        [Display(Name = "Cores")]
        public int Cores { get; set; } // Кол-во ядер

        [Required]
        [Display(Name = "Threads")]
        public int Threads { get; set; } // Кол-во потоков

        [Required]
        [Display(Name = "BaseGHz")]
        public double BaseFrequencyGHz { get; set; } // Базовая частота (в GHz)

        [Required]
        [Display(Name = "BoostGHz")]
        public double BoostFrequencyGHz { get; set; } // Турбочастота (в GHz, если есть)
    }
}
