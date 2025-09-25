using GameRequirements.Domain.Entites.Completing_computers;
using GameRequirements.Domain.Entites.Games;
using GameRequirements.Domain.Entites.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Domain.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<DBUser> Users { get; set; }
        public DbSet<DBUserSession> Sessions { get; set; }
        public DbSet<DBComputer> Computers { get; set; }
        public DbSet<DBProcessor> Processors { get; set; }
        public DbSet<DBVideoCard> VideoCards { get; set; }
        public DbSet<DBGames> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Пример: связь User -> Sessions
            modelBuilder.Entity<DBUserSession>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId);
        }
    }
}
