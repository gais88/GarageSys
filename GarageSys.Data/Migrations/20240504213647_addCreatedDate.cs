using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GarageSys.Data.Migrations
{
    /// <inheritdoc />
    public partial class addCreatedDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "PanelUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "PanelUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "PanelUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "PanelUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "PanelUsers");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "PanelUsers");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "PanelUsers");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "PanelUsers");
        }
    }
}
