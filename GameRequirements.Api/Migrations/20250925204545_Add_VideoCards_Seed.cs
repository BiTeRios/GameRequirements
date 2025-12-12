using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GameRequirements.Api.Migrations
{
    /// <inheritdoc />
    public partial class Add_VideoCards_Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "VideoCards",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "VideoCards",
                columns: new[] { "Id", "Boost_Clock_MHz", "Bus_Width", "Cuda_Or_Stream_Cores", "Memory_Bandwidth_GB", "Name", "RT_Units", "Tensor_Units", "Uuid", "VRAM_GB" },
                values: new object[,]
                {
                    { 1001L, 1680.0, 192, 1920, 336, "GeForce RTX 2060 6GB", 30, 240, new Guid("11111111-1111-1111-1111-111111111001"), 6 },
                    { 1002L, 1777.0, 192, 3584, 360, "GeForce RTX 3060 12GB", 28, 112, new Guid("11111111-1111-1111-1111-111111111002"), 12 },
                    { 1003L, 1665.0, 256, 4864, 448, "GeForce RTX 3060 Ti", 38, 152, new Guid("11111111-1111-1111-1111-111111111003"), 8 },
                    { 1004L, 1725.0, 256, 5888, 448, "GeForce RTX 3070", 46, 184, new Guid("11111111-1111-1111-1111-111111111004"), 8 },
                    { 1005L, 1710.0, 320, 8704, 760, "GeForce RTX 3080 10GB", 68, 272, new Guid("11111111-1111-1111-1111-111111111005"), 10 },
                    { 1006L, 1695.0, 384, 10496, 936, "GeForce RTX 3090", 82, 328, new Guid("11111111-1111-1111-1111-111111111006"), 24 },
                    { 1007L, 2460.0, 128, 3072, 272, "GeForce RTX 4060", 24, 96, new Guid("11111111-1111-1111-1111-111111111007"), 8 },
                    { 1008L, 2475.0, 192, 5888, 504, "GeForce RTX 4070", 46, 184, new Guid("11111111-1111-1111-1111-111111111008"), 12 },
                    { 1009L, 2610.0, 192, 7680, 504, "GeForce RTX 4070 Ti", 60, 240, new Guid("11111111-1111-1111-1111-111111111009"), 12 },
                    { 1010L, 2505.0, 256, 9728, 717, "GeForce RTX 4080", 76, 304, new Guid("11111111-1111-1111-1111-111111111010"), 16 },
                    { 1011L, 2520.0, 384, 16384, 1008, "GeForce RTX 4090", 128, 512, new Guid("11111111-1111-1111-1111-111111111011"), 24 },
                    { 1101L, 2491.0, 128, 1792, 224, "Radeon RX 6600", 28, 0, new Guid("22222222-2222-2222-2222-222222222001"), 8 },
                    { 1102L, 2589.0, 128, 2048, 256, "Radeon RX 6600 XT", 32, 0, new Guid("22222222-2222-2222-2222-222222222002"), 8 },
                    { 1103L, 2581.0, 192, 2560, 384, "Radeon RX 6700 XT", 40, 0, new Guid("22222222-2222-2222-2222-222222222003"), 12 },
                    { 1104L, 2105.0, 256, 3840, 512, "Radeon RX 6800", 60, 0, new Guid("22222222-2222-2222-2222-222222222004"), 16 },
                    { 1105L, 2250.0, 256, 4608, 512, "Radeon RX 6800 XT", 72, 0, new Guid("22222222-2222-2222-2222-222222222005"), 16 },
                    { 1106L, 2250.0, 256, 5120, 512, "Radeon RX 6900 XT", 80, 0, new Guid("22222222-2222-2222-2222-222222222006"), 16 },
                    { 1107L, 2655.0, 128, 2048, 288, "Radeon RX 7600", 32, 0, new Guid("22222222-2222-2222-2222-222222222007"), 8 },
                    { 1108L, 2544.0, 192, 3456, 432, "Radeon RX 7700 XT", 54, 0, new Guid("22222222-2222-2222-2222-222222222008"), 12 },
                    { 1109L, 2430.0, 256, 3840, 624, "Radeon RX 7800 XT", 60, 0, new Guid("22222222-2222-2222-2222-222222222009"), 16 },
                    { 1110L, 2400.0, 320, 5376, 800, "Radeon RX 7900 XT", 84, 0, new Guid("22222222-2222-2222-2222-222222222010"), 20 },
                    { 1111L, 2500.0, 384, 6144, 960, "Radeon RX 7900 XTX", 96, 0, new Guid("22222222-2222-2222-2222-222222222011"), 24 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1001L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1002L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1003L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1004L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1005L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1006L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1007L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1008L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1009L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1010L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1011L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1101L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1102L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1103L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1104L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1105L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1106L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1107L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1108L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1109L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1110L);

            migrationBuilder.DeleteData(
                table: "VideoCards",
                keyColumn: "Id",
                keyValue: 1111L);

            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "VideoCards",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");
        }
    }
}
