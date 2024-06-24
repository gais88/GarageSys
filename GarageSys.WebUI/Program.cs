using GarageSys.Core.Models;
using GarageSys.Data.Context;
using GarageSys.Data.Seed;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Text.Json.Serialization;

namespace GarageSys.WebUI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                                            ?? throw new InvalidOperationException("No connection string was found");

            builder.Services.AddDbContext<AppDbContext>(options =>
                                                        options.UseSqlServer(connectionString));
            
            //builder.Services.AddIdentity<PanelUser, AppRole>(options => options.SignIn.RequireConfirmedAccount = true)
            //                .AddEntityFrameworkStores<AppDbContext>()
            //                .AddDefaultUI()
            //                .AddDefaultTokenProviders();
            builder.Services.AddDefaultIdentity<PanelUser>()
                             .AddRoles<AppRole>()
                            .AddEntityFrameworkStores<AppDbContext>()
                            .AddDefaultUI()
                            .AddDefaultTokenProviders();

            builder.Services.AddIdentityCore<Customer>(options => options.SignIn.RequireConfirmedAccount = true)
                            .AddEntityFrameworkStores<AppDbContext>()
                            .AddDefaultUI()
                            .AddDefaultTokenProviders();

            builder.Services.AddTransient<IEmailSender, EmailSender>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            // Add services to the container.
            builder.Services.AddControllersWithViews().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            

            var app = builder.Build();
           

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            //app.MapControllerRoute(
            //    name: "default",
            //    pattern: "{controller=Home}/{action=Index}/{id?}");
            //app.MapControllerRoute(
            //                        name: "areas",
            //                        pattern: "{area?}/{controller=Home}/{action=Index}/{id?}",
            //                        MapRazorPages()


            //app.MapControllerRoute(
            //                        name: "default",
            //                        pattern: "{controller=Home}/{action=Index}/{id?}");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Home}/{action=index}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=index}/{id?}");
                endpoints.MapRazorPages();
            });

            // Data Seed
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<AppDbContext>();
            try
            {
                if (context != null)
                {
                   // await context.Database.EnsureDeletedAsync();
                    await context.Database.MigrateAsync();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<PanelUser>>();
                    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                    // seed 
                    await Seed.SeedRolesAsync(roleManager);
                    await Seed.SeedUsersAsync(userManager);

                    await Seed.SeedServicesAsync(context);


                }
            }
            catch (Exception ex)
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error Occured During Migration");
            }
            app.Run();
        }
    }
}
