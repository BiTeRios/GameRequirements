using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GameRequirements.Api.Migrations
{
    /// <inheritdoc />
    public partial class Add_Processors_Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Processors",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "Processors",
                columns: new[] { "Id", "BaseFrequencyGHz", "BoostFrequencyGHz", "Cores", "Name", "Threads", "Uuid" },
                values: new object[,]
                {
                    { 1L, 3.6000000000000001, 4.2999999999999998, 4, "Intel Core i3-10100", 8, new Guid("ea7a7139-5ca2-4b74-87a2-41198dfb338a") },
                    { 2L, 3.6000000000000001, 4.2999999999999998, 4, "Intel Core i3-10100F", 8, new Guid("273ab482-080e-4062-a5f7-7ebfd3f45a5e") },
                    { 3L, 2.8999999999999999, 4.2999999999999998, 6, "Intel Core i5-10400F", 12, new Guid("6f642142-4354-4a79-8a8e-9383d81726ff") },
                    { 4L, 2.6000000000000001, 4.4000000000000004, 6, "Intel Core i5-11400F", 12, new Guid("5c63858d-8e62-4516-835d-4189895185e3") },
                    { 5L, 2.5, 4.4000000000000004, 6, "Intel Core i5-12400F", 12, new Guid("8a7ea12b-f767-4b99-bf02-acc625fa7a4f") },
                    { 6L, 2.5, 4.5999999999999996, 10, "Intel Core i5-13400F", 16, new Guid("f5569059-104a-4ea1-80db-cce9df74c7a9") },
                    { 7L, 3.7000000000000002, 4.7000000000000002, 6, "Intel Core i7-8700K", 12, new Guid("b4f431d6-3c87-487b-9a26-bbb6ecdee9bc") },
                    { 8L, 3.7999999999999998, 5.0999999999999996, 8, "Intel Core i7-10700K", 16, new Guid("6b0edbe9-92c7-4a5f-90ff-a85ead1d26fd") },
                    { 9L, 3.6000000000000001, 5.0, 8, "Intel Core i9-9900K", 16, new Guid("a0d839ee-9e47-4c6e-b381-03c021d15fba") },
                    { 10L, 3.2000000000000002, 5.2000000000000002, 16, "Intel Core i9-12900K", 24, new Guid("e794ae77-890c-4fe8-ba07-c8e525fb0790") },
                    { 101L, 3.6000000000000001, 4.2000000000000002, 6, "AMD Ryzen 5 3600", 12, new Guid("299d8c53-bcc2-4fb5-8b87-df4a47390a74") },
                    { 102L, 3.6000000000000001, 4.4000000000000004, 8, "AMD Ryzen 7 3700X", 16, new Guid("4256ff61-0d44-43c9-95bc-0b148542d3dd") },
                    { 103L, 3.5, 4.4000000000000004, 6, "AMD Ryzen 5 5600", 12, new Guid("e13f45dc-9e17-4b95-a654-2d398f2009b6") },
                    { 104L, 3.7000000000000002, 4.5999999999999996, 6, "AMD Ryzen 5 5600X", 12, new Guid("2744b009-b20c-4675-8f46-31161942512c") },
                    { 105L, 3.7999999999999998, 4.7000000000000002, 8, "AMD Ryzen 7 5800X", 16, new Guid("7d47e51c-00b2-4185-9863-761b645d95b2") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 101L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 102L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 103L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 104L);

            migrationBuilder.DeleteData(
                table: "Processors",
                keyColumn: "Id",
                keyValue: 105L);

            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Processors",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");
        }
    }
}
