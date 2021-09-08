using Microsoft.EntityFrameworkCore.Migrations;

namespace WoDevServer.Migrations
{
    public partial class Order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileData",
                table: "OrderFile",
                newName: "Data");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "OrderFile",
                newName: "FileData");
        }
    }
}
