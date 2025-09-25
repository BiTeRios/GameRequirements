using GameRequirements.Domain.Entites.Completing_computers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.User
{
    public class DBUser : BaseId
    {

        [Required]
        [Display(Name = "Email Address")]
        [StringLength(30)]
        public required string Email { get; set; }

        [Display(Name = "UserName")]
        [StringLength(30)]
        public string UserName { get; set; } = null!;

        [DataType(DataType.Date)]
        public DateTime LoginDateTime { get; set; }

        [Required]
        [Display(Name = "Password")]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Password cannot be shorter than 8 charicters.")]
        public required string PasswordHash { get; set; }

        public virtual ICollection<DBComputer> Computers { get; set; } = new List<DBComputer>();
    }
}
