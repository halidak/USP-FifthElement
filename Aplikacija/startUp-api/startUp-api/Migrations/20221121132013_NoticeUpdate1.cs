using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace startUpapi.Migrations
{
    /// <inheritdoc />
    public partial class NoticeUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notice_Companies_CompanyId",
                table: "Notice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notice",
                table: "Notice");

            migrationBuilder.RenameTable(
                name: "Notice",
                newName: "Notices");

            migrationBuilder.RenameIndex(
                name: "IX_Notice_CompanyId",
                table: "Notices",
                newName: "IX_Notices_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notices",
                table: "Notices",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notices_Companies_CompanyId",
                table: "Notices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notices",
                table: "Notices");

            migrationBuilder.RenameTable(
                name: "Notices",
                newName: "Notice");

            migrationBuilder.RenameIndex(
                name: "IX_Notices_CompanyId",
                table: "Notice",
                newName: "IX_Notice_CompanyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notice",
                table: "Notice",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notice_Companies_CompanyId",
                table: "Notice",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
