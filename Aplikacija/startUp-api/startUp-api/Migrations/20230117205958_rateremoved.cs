using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class rateremoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Companies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rate",
                table: "Companies",
                type: "float",
                nullable: true);
        }
    }
}
