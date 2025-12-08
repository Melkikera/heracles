using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heracles.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminModif : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2025, 12, 5, 11, 22, 28, 123, DateTimeKind.Local).AddTicks(6733));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2025, 12, 2, 16, 39, 21, 76, DateTimeKind.Local).AddTicks(6159));
        }
    }
}
