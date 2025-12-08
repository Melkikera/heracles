using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heracles.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddContactIsMine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMine",
                table: "Contacts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Email", "Facebook", "Instagram", "IsMine", "LinkedIn", "Mobile", "PostalAddress", "SchedulesJson", "SubmittedAt", "Telephone" },
                values: new object[] { 1, "me@example.com", "https://facebook.com/myprofile", "https://instagram.com/myprofile", true, "https://linkedin.com/in/myprofile", "+1 987 654 321", "123 Main St, City, Country", "{\"Monday\":\"9:00-17:00\",\"Tuesday\":\"9:00-17:00\",\"Wednesday\":\"9:00-17:00\",\"Thursday\":\"9:00-17:00\",\"Friday\":\"9:00-17:00\"}", new DateTime(2025, 12, 2, 15, 7, 15, 943, DateTimeKind.Utc).AddTicks(5770), "+1 234 567 890" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "IsMine",
                table: "Contacts");
        }
    }
}
