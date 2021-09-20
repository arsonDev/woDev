using Microsoft.EntityFrameworkCore.Migrations;

namespace WoDevServer.Migrations
{
    public partial class UserTypeRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Profile",
                newName: "UserProfileTypeId");

            migrationBuilder.InsertData("UserProfileType", "Name", "Creator");
            migrationBuilder.InsertData("UserProfileType", "Name", "Programmer");

            migrationBuilder.CreateIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile",
                column : "UserProfileTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_UserProfileType_UserProfileTypeId",
                table: "Profile",
                column: "UserProfileTypeId",
                principalTable: "UserProfileType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profile_UserProfileType_UserProfileTypeId",
                table: "Profile");

            migrationBuilder.RenameColumn(
                name: "UserProfileTypeId",
                table: "Profile",
                newName: "TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Profile_UserProfileTypeId",
                table: "Profile",
                newName: "IX_Profile_TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_UserProfileType_TypeId",
                table: "Profile",
                column: "TypeId",
                principalTable: "UserProfileType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
