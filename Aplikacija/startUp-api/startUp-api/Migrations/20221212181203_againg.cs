using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class againg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Notices",
                newName: "Loaction");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Loaction",
                table: "Notices",
                newName: "Location");
        }
    }
}
