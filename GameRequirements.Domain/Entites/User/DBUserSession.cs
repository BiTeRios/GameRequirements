using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites.User
{
    public class DBUserSession : BaseId
    {
        [ForeignKey("UserId")]
        public long UserId { get; set; }  // внешний ключ на пользователя

        public DBUser User { get; set; } = null!;

        [Required]
        [Display(Name = "RefreshToken")]
        [StringLength(200)]
        public required string RefreshToken { get; set; }  // токен обновления

        [Required]
        [Display(Name = "JwtId")]
        [StringLength(100)]
        public required string JwtId { get; set; }  // ID JWT токена

        [Required]
        public DateTime RefreshTokenExpiration { get; set; }  // срок действия токена

        [Required]
        public bool Redeemed { get; set; }  // использован ли токен
    }
}
