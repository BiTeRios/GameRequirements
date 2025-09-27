using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameRequirements.Api.Migrations
{
    /// <inheritdoc />
    public partial class Add_Computers_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Computers_Processors_ProcessorId",
                table: "Computers");

            migrationBuilder.DropForeignKey(
                name: "FK_Computers_VideoCards_VideoCardId",
                table: "Computers");

            migrationBuilder.DropIndex(
                name: "IX_Computers_UserId",
                table: "Computers");

            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Computers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<long>(
                name: "DBUserId",
                table: "Computers",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Computers_DBUserId",
                table: "Computers",
                column: "DBUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Computers_UserId_ProcessorId_VideoCardId_RAM",
                table: "Computers",
                columns: new[] { "UserId", "ProcessorId", "VideoCardId", "RAM" });

            migrationBuilder.AddForeignKey(
                name: "FK_Computers_Processors_ProcessorId",
                table: "Computers",
                column: "ProcessorId",
                principalTable: "Processors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Computers_Users_DBUserId",
                table: "Computers",
                column: "DBUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Computers_VideoCards_VideoCardId",
                table: "Computers",
                column: "VideoCardId",
                principalTable: "VideoCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Computers_Processors_ProcessorId",
                table: "Computers");

            migrationBuilder.DropForeignKey(
                name: "FK_Computers_Users_DBUserId",
                table: "Computers");

            migrationBuilder.DropForeignKey(
                name: "FK_Computers_VideoCards_VideoCardId",
                table: "Computers");

            migrationBuilder.DropIndex(
                name: "IX_Computers_DBUserId",
                table: "Computers");

            migrationBuilder.DropIndex(
                name: "IX_Computers_UserId_ProcessorId_VideoCardId_RAM",
                table: "Computers");

            migrationBuilder.DropColumn(
                name: "DBUserId",
                table: "Computers");

            migrationBuilder.AlterColumn<Guid>(
                name: "Uuid",
                table: "Computers",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "NEWID()");

            migrationBuilder.CreateIndex(
                name: "IX_Computers_UserId",
                table: "Computers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Computers_Processors_ProcessorId",
                table: "Computers",
                column: "ProcessorId",
                principalTable: "Processors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Computers_VideoCards_VideoCardId",
                table: "Computers",
                column: "VideoCardId",
                principalTable: "VideoCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
