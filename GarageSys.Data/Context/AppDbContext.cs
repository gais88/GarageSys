using GarageSys.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace GarageSys.Data.Context
{
    public class AppDbContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole,
                                IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        public DbSet<AppUserRole> AppUserRoles { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleSpec> VehicleSpecs { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        // Identity
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<PanelUser>(entity => { entity.ToTable("PanelUsers"); });
            builder.Entity<Customer>(entity => { entity.ToTable("Customers"); });
            // ManyToMany in EF5 between AppUser and AppRole with [AppUserRole]
            //builder.Entity<AppUser>()
            //       .HasMany(x => x.AppRoles)
            //       .WithMany(x => x.AppUsers)
            //       .UsingEntity<AppUserRole>(
            //           x => x.HasOne<AppRole>().WithMany().HasForeignKey(x => x.RoleId),
            //           x => x.HasOne<AppUser>().WithMany().HasForeignKey(x => x.UserId))
            //       .Property(x => x.CreatedDate)
            //       .HasDefaultValueSql("GETDATE()");
        }

    }
}
