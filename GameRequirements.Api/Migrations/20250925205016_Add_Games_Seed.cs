using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GameRequirements.Api.Migrations
{
    /// <inheritdoc />
    public partial class Add_Games_Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Games",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Description", "MinCpuModel", "MinGpuModel", "MinRamGB", "Name", "RecCpuModel", "RecGpuModel", "RecRamGB", "Uuid" },
                values: new object[,]
                {
                    { 3001L, "RPG от CDPR в Найт-Сити. Данные соответствуют обновлённым требованиям Update 2.0/Phantom Liberty.", "Core i7-6700 / Ryzen 5 1600", "GTX 1060 6GB / RX 580 8GB", 12, "Cyberpunk 2077", "Core i7-4790 / Ryzen 3 3200G", "GTX 1660 Super / RX 590", 12, new Guid("33333333-3333-3333-3333-333333333001") },
                    { 3002L, "Тактический шутер на Source 2. Valve указывает «DX11, 1GB VRAM, i5-750+».", "Core i5-750 (4 потока) или выше", "DX11, 1GB VRAM (напр. GTX 660)", 8, "Counter-Strike 2", "Core i5 или лучше (6+ потоков)", "DX12-class (напр. GTX 970 / RX 570)", 16, new Guid("33333333-3333-3333-3333-333333333002") },
                    { 3003L, "Экшен-RPG от FromSoftware. Требует SSD/быструю память для стабильности.", "Core i5-8400 / Ryzen 3 3300X", "GTX 1060 3GB / RX 580 4GB", 12, "ELDEN RING", "Core i7-8700K / Ryzen 5 3600X", "GTX 1070 8GB / RX Vega 56", 16, new Guid("33333333-3333-3333-3333-333333333003") },
                    { 3004L, "Открытый мир в школе магии. Официальные PC-спеки WB Games.", "Core i5-6600 / Ryzen 5 1400", "GTX 960 4GB / RX 470 4GB", 16, "Hogwarts Legacy", "Core i7-8700 / Ryzen 5 3600", "RTX 2060 / RX 5700 XT", 16, new Guid("33333333-3333-3333-3333-333333333004") },
                    { 3005L, "Вестерн от Rockstar. Требования взяты из поддержки Rockstar.", "Core i5-2500K / AMD FX-6300", "GTX 770 2GB / Radeon R9 280 3GB", 8, "Red Dead Redemption 2", "Core i7-4770K / Ryzen 5 1500X", "GTX 1060 6GB / RX 480 4GB", 12, new Guid("33333333-3333-3333-3333-333333333005") },
                    { 3006L, "Открытый мир Los Santos. Данные по обновлённой PC-версии.", "Core i7-4770 / AMD FX-9590", "GTX 1630 4GB / RX 6400 4GB", 8, "Grand Theft Auto V", "Core i5-9600K / Ryzen 5 3600", "RTX 2060 / RX 5600 XT", 16, new Guid("33333333-3333-3333-3333-333333333006") },
                    { 3007L, "CRPG от Larian. Рекомендуемые — на оф. сайте Larian.", "Core i5-4690 / Ryzen 3 1200", "GTX 970 / RX 480", 8, "Baldur's Gate 3", "Core i7-8700K / Ryzen 5 3600", "RTX 2060 Super / RX 5700 XT", 16, new Guid("33333333-3333-3333-3333-333333333007") },
                    { 3008L, "Королевская битва от Respawn. Мин/рек — по EA.", "Core i3-6300 / AMD FX-4350", "GTX 950 / Radeon HD 7790", 6, "Apex Legends", "Core i5-3570K или экв.", "GTX 970 / Radeon R9 290", 8, new Guid("33333333-3333-3333-3333-333333333008") },
                    { 3009L, "Тактический шутер от Riot. Спеки по FPS-целям.", "Core i3-540 / Athlon 200GE (30 FPS)", "Intel HD 4000 / Radeon R5 220", 4, "VALORANT", "Core i3-4150 / Ryzen 3 1200 (60 FPS)", "GeForce GT 730 / Radeon R7 240", 4, new Guid("33333333-3333-3333-3333-333333333009") },
                    { 3010L, "MOBA от Valve. Минимальные требования со Steam-страницы.", "2-ядерный 2.8GHz (Intel/AMD)", "GeForce 8600/9600GT или Radeon HD 2600/3600", 4, "Dota 2", "4-ядерный 3.0GHz (Intel/AMD)", "GeForce GTX 970 / Radeon RX 470", 8, new Guid("33333333-3333-3333-3333-333333333010") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3001L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3002L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3003L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3004L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3005L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3006L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3007L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3008L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3009L);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3010L);

            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Games",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");
        }
    }
}
