using Microsoft.EntityFrameworkCore.Migrations;

namespace WoDevServer.Migrations
{
    public partial class RemoveUSerTypeIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Profile",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile",
                column: "UserProfileTypeId",
                unique: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Profile",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile",
                column: "UserProfileTypeId",
                unique: true);
        }
    }
}
