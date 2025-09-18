using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Entites
{
    public abstract class BaseId
    {
        [Key]
        public long Id { get; set; }

        public required Guid Uuid { get; set; }

        public bool IsActive = true;

        public DateTime CreatedDate = DateTime.Now;
    }
}
