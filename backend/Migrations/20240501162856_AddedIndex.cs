using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bookolog.Migrations
{
    /// <inheritdoc />
    public partial class AddedIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Books_ModifyDate",
                table: "Books",
                column: "ModifyDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Books_ModifyDate",
                table: "Books");
        }
    }
}
