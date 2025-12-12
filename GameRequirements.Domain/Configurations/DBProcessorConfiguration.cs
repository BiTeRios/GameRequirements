using GameRequirements.Domain.Entites.Completing_computers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DBProcessorConfiguration : IEntityTypeConfiguration<DBProcessor>
{
    public void Configure(EntityTypeBuilder<DBProcessor> b)
    {
        b.ToTable("Processors");

        b.HasKey(x => x.Id);

        b.Property(x => x.Uuid).HasDefaultValueSql("NEWID()");
        b.Property(x => x.IsActive).HasDefaultValue(true);
        b.Property(x => x.CreatedDate).HasDefaultValueSql("SYSUTCDATETIME()");

        b.Property(x => x.Name).IsRequired().HasMaxLength(50);

        // Уникальность имени → сможем делать FK по имени
        b.HasAlternateKey(x => x.Name).HasName("AK_Processors_Name");
        b.HasIndex(x => x.Name).HasDatabaseName("IX_Processors_Name");
    }
}
