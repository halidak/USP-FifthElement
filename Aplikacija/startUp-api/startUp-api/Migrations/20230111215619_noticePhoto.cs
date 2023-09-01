using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class noticePhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyPhoto",
                table: "Notices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyPhoto",
                table: "Notices");
        }
    }
}
