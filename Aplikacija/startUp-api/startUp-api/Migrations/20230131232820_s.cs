using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class s : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Rated",
                table: "Notices",
                newName: "Saved");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Saved",
                table: "Notices",
                newName: "Rated");
        }
    }
}
