using GarageSys.Core.Enums;
using GarageSys.Core.Models;
using GarageSys.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.Seed
{
    public class Seed
    {
        public static async Task SeedServicesAsync(AppDbContext dbContext)
        {
            if (await dbContext.Services.AnyAsync())
            {
                return;
            }

            var banks = new List<Service>()
            {
                new Service()
                {
                    Title = "Diagnostic Test",
                    Desc =  "Diagnostic Test for car or vichel",
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Migration"
                },
                new Service()
                {
                    Title= "Engine Servicing",
                    Desc =  "Engine Servicing for car or vechel ",
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Migration"
                },
                new Service()
                {
                    Title = "Tires Replacement",

                    CreatedDate = DateTime.Now,
                    CreatedBy = "Migration"
                },
                new Service()
                {
                    Title = "Oil Changing",
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Migration"
                },
                new Service()
                {
                    Title = "Vacuam Cleaning",
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Migration"
                },
              
            };

            await dbContext.AddRangeAsync(banks);
            await dbContext.SaveChangesAsync();
        }
        public static async Task SeedRolesAsync(RoleManager<AppRole> roleManager)
        {
            if (await roleManager.Roles.AnyAsync())
            {
                return;
            }
            var roles = new List<AppRole>()
            {
                new AppRole
                {
                    Name = nameof(RoleType.SuperAdmin),
                    CreatedBy = "Migration",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Migration",
                    ModifiedDate = DateTime.Now
                },
                new AppRole
                {
                    Name = nameof(RoleType.DepartmentManager),
                    CreatedBy = "Migration",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Migration",
                    ModifiedDate = DateTime.Now
                },
                new AppRole
                {
                    Name = nameof(RoleType.Employee),
                    CreatedBy = "Migration",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Migration",
                    ModifiedDate = DateTime.Now
                },
                new AppRole
                {
                    Name = nameof(RoleType.Customer),
                    CreatedBy = "Migration",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Migration",
                    ModifiedDate = DateTime.Now
                },
              
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }
        public static async Task SeedUsersAsync(UserManager<PanelUser> userManager)
        {
            if (await userManager.Users.AnyAsync())
            {
                return;
            }

            // Add Admin User.
            var admin = new PanelUser()
            {
                UserName = "Ahmed",
                Email = "Ahmed@admin.com",
                FullName = "Ahmed Ahmed",
                PhoneNumber = "00987458752",
                CreatedBy = "Migration",
                CreatedDate = DateTime.Now,
                ModifiedBy = "Migration",
                ModifiedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed=true

            };
            var result = await userManager.CreateAsync(admin, "P@$$w0rd");
            await userManager.AddToRolesAsync(admin, new[]
            {
                nameof(RoleType.SuperAdmin),
            });

            // Add Department Manager.
            var deptManager = new PanelUser()
            {
                UserName = "rakan",
                Email = "rakan@rakan.com",
                FullName = "Department Manager",
                PhoneNumber = "00987458752",
                CreatedBy = "Migration",
                CreatedDate = DateTime.Now,
                ModifiedBy = "Migration",
                ModifiedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed = true
            };
            await userManager.CreateAsync(deptManager, "P@$$w0rd");
            await userManager.AddToRoleAsync(deptManager, nameof(RoleType.DepartmentManager));

            // Add Employee.
            var employee = new PanelUser()
            {
                UserName = "employee",
                Email = "employee@employee.com",
                FullName = "Normal Employee",
                PhoneNumber = "0096611223344",
                CreatedBy = "Migration",
                CreatedDate = DateTime.Now,
                ModifiedBy = "Migration",
                ModifiedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed = true
            };
            await userManager.CreateAsync(employee, "P@$$w0rd");
            await userManager.AddToRoleAsync(employee, nameof(RoleType.Employee));

            var testCustomer = new PanelUser()
            {
                UserName = "testCustomer",
                Email = "testCustomer@testCustomer.com",
                FullName = "Test Customer",
                PhoneNumber = "0096611223344",
                CreatedBy = "Migration",
                CreatedDate = DateTime.Now,
                ModifiedBy = "Migration",
                ModifiedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed = true
            };
            await userManager.CreateAsync(testCustomer, "P@$$w0rd");
            await userManager.AddToRoleAsync(testCustomer, nameof(RoleType.Employee));
        }
    }
}
