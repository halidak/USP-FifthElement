using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class companiesPropertiesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordResetToken",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "PasswordResetToken",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Companies");
        }
    }
}
