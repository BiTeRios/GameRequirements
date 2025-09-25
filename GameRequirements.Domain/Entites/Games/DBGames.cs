using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.Games
{
    public class DBGames : BaseId
    {
        [Required]
        [Display(Name = "Name")]
        [StringLength(50)]
        public required string Name { get; set; }

        [Display(Name = "description")]
        [StringLength(500)]
        public string Description { get; set; } = null!;

        [Required]
        [Display(Name = "MinCpuModel")]
        [StringLength(60)]
        public required string MinCpuModel { get; set; }

        [Required]
        [Display(Name = "MinGpuModel")]
        [StringLength(60)]
        public required string MinGpuModel { get; set; }

        [Required]
        [Display(Name = "MinRamGB")]
        public required int MinRamGB { get; set; }

        [Required]
        [Display(Name = "RecCpuModel")]
        [StringLength(60)]
        public required string RecCpuModel { get; set; }

        [Required]
        [Display(Name = "RecGpuModel")]
        [StringLength(60)]
        public required string RecGpuModel { get; set; }

        [Required]
        [Display(Name = "RecRamGB")]
        public required int RecRamGB { get; set; }
    }
}
