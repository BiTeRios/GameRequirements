using GameRequirements.Domain.Entites.Completing_computers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GameRequirements.Domain.Configurations
{
    public class DBComputerConfiguration : IEntityTypeConfiguration<DBComputer>
    {
        public void Configure(EntityTypeBuilder<DBComputer> b)
        {
            b.ToTable("Computers");

            b.Property(x => x.RAM).IsRequired();
            b.Property(x => x.Uuid).HasDefaultValueSql("NEWID()");

            b.HasOne(c => c.Processor)
             .WithMany()
             .HasForeignKey(c => c.ProcessorId)
             .OnDelete(DeleteBehavior.Restrict);

            b.HasOne(c => c.VideoCard)
             .WithMany()
             .HasForeignKey(c => c.VideoCardId)
             .OnDelete(DeleteBehavior.Restrict);

            b.HasOne(c => c.User)
             .WithMany()
             .HasForeignKey(c => c.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            b.HasIndex(c => new { c.UserId, c.ProcessorId, c.VideoCardId, c.RAM });
        }
    }
}
