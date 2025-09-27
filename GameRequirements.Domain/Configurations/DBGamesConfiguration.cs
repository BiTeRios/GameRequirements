using GameRequirements.Domain.Entites;
using GameRequirements.Domain.Entites.Completing_computers;
using GameRequirements.Domain.Entites.Games;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DBGamesConfiguration : IEntityTypeConfiguration<DBGames>
{
    public void Configure(EntityTypeBuilder<DBGames> b)
    {
        b.ToTable("Games");

        b.HasKey(x => x.Id);

        b.Property(x => x.Uuid).HasDefaultValueSql("NEWID()");
        b.Property(x => x.IsActive).HasDefaultValue(true);
        b.Property(x => x.CreatedDate).HasDefaultValueSql("SYSUTCDATETIME()");

        b.Property(x => x.Name).IsRequired().HasMaxLength(50);
        b.Property(x => x.Description).HasMaxLength(500);

        // ВАЖНО: длина/обязательность как у Name в CPU/GPU
        b.Property(x => x.MinCpuModel).IsRequired().HasMaxLength(50);
        b.Property(x => x.RecCpuModel).IsRequired().HasMaxLength(50);
        b.Property(x => x.MinGpuModel).IsRequired().HasMaxLength(50);
        b.Property(x => x.RecGpuModel).IsRequired().HasMaxLength(50);

        // Индексы для скорости поиска
        b.HasIndex(x => x.MinCpuModel);
        b.HasIndex(x => x.RecCpuModel);
        b.HasIndex(x => x.MinGpuModel);
        b.HasIndex(x => x.RecGpuModel);

        // ------ Связи по имени (FK на альтернативные ключи Name) ------
        b.HasOne<DBProcessor>().WithMany()
 .HasForeignKey(nameof(DBGames.MinCpuModel))
 .HasPrincipalKey(nameof(DBProcessor.Name))
 .OnDelete(DeleteBehavior.Restrict)
 .HasConstraintName("FK_Games_MinCpuModel_Processors_Name");

        b.HasOne<DBProcessor>().WithMany()
         .HasForeignKey(nameof(DBGames.RecCpuModel))
         .HasPrincipalKey(nameof(DBProcessor.Name))
         .OnDelete(DeleteBehavior.Restrict)
         .HasConstraintName("FK_Games_RecCpuModel_Processors_Name");

        b.HasOne<DBVideoCard>().WithMany()
         .HasForeignKey(nameof(DBGames.MinGpuModel))
         .HasPrincipalKey(nameof(DBVideoCard.Name))
         .OnDelete(DeleteBehavior.Restrict)
         .HasConstraintName("FK_Games_MinGpuModel_VideoCards_Name");

        b.HasOne<DBVideoCard>().WithMany()
         .HasForeignKey(nameof(DBGames.RecGpuModel))
         .HasPrincipalKey(nameof(DBVideoCard.Name))
         .OnDelete(DeleteBehavior.Restrict)
         .HasConstraintName("FK_Games_RecGpuModel_VideoCards_Name");
    } 
}
