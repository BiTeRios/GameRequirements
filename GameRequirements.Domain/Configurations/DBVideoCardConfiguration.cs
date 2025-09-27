using GameRequirements.Domain.Entites.Completing_computers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DBVideoCardConfiguration : IEntityTypeConfiguration<DBVideoCard>
{
    public void Configure(EntityTypeBuilder<DBVideoCard> b)
    {
        b.ToTable("VideoCards");

        b.HasKey(x => x.Id);

        b.Property(x => x.Uuid).HasDefaultValueSql("NEWID()");
        b.Property(x => x.IsActive).HasDefaultValue(true);
        b.Property(x => x.CreatedDate).HasDefaultValueSql("SYSUTCDATETIME()");

        b.Property(x => x.Name).IsRequired().HasMaxLength(50);

        b.HasAlternateKey(x => x.Name).HasName("AK_VideoCards_Name");
        b.HasIndex(x => x.Name).HasDatabaseName("IX_VideoCards_Name");
    }
}
