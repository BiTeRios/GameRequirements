using GameRequirements.Domain.Entites.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.Completing_computers
{
    public class DBComputer : BaseId
    {
        [Required]
        [ForeignKey(nameof(Processor))]
        public long ProcessorId { get; set; } // FK на процессор

        public virtual DBProcessor Processor { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(VideoCard))]
        public long VideoCardId { get; set; } // FK на видеокарту

        public virtual DBVideoCard VideoCard { get; set; } = null!;

        [Required]
        [Display(Name = "RAM")]
        public required int RAM { get; set; } // Оперативная память

        [Required]
        [ForeignKey(nameof(User))] // FK на пользователя
        public long UserId { get; set; }
        public virtual DBUser User { get; set; } = null!;
    }
}
