using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heracles.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2025, 12, 2, 15, 7, 15, 943, DateTimeKind.Utc).AddTicks(5770));
        }
    }
}
