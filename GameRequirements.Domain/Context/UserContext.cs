using GameRequirements.Domain.Entites.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Context
{
    public class UserContext : DbContext
    {
        //public UserConext() : base("name=") { }                        //Entry name DB later !!!!!!!!!!!!!!!!
        public virtual DbSet<DBUser> Users { get; set; }
        public virtual DbSet<DBUserSession> Sessions { get; set; }
    }
}
