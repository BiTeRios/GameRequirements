using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.Completing_computers
{
    public class DBVideoCard : BaseId
    {
        [Required]
        [Display(Name = "Name")]
        [StringLength(50)]
        public required string Name { get; set; }

        [Required]
        [Display(Name = "Cores")]
        public required int Cuda_Or_Stream_Cores { get; set; } // Количество вычислительных ядер

        [Required]
        [Display(Name = "Boost_Clock_MHz")]
        public required double Boost_Clock_MHz { get; set; } // Максимальная частота памяти

        [Required]
        [Display(Name = "VRAM_GB")]
        public required int VRAM_GB { get; set; } // Видеопамять в GB

        [Required]
        [Display(Name = "Memory_Bandwidth_GB")]
        public required int Memory_Bandwidth_GB { get; set; } // Пропускная способность памяти в GB/с

        [Required]
        [Display(Name = "Bus_Width")]
        public required int Bus_Width { get; set; } // Ширина шины памяти в bit

        [Required]
        [Display(Name = "RT_Units")]
        public required int RT_Units { get; set; } // Количество аппаратных блоков трассировки лучей

        [Required]
        [Display(Name = "Tensor_Units")]
        public required int Tensor_Units { get; set; } // Rоличество тензорных ядер

    }
}
