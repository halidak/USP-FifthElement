using Microsoft.EntityFrameworkCore;
using startUp_api.Data.Models;

namespace startUp_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User_Company>()
                .HasOne(u => u.User)
                .WithMany(us => us.User_Company)
                .HasForeignKey(use => use.UserId);

            modelBuilder.Entity<User_Company>()
               .HasOne(c => c.Company)
               .WithMany(co => co.User_Company)
               .HasForeignKey(cop => cop.CompanyId);

            modelBuilder.Entity<User_Notice>()
               .HasOne(u => u.User)
               .WithMany(us => us.User_Notice)
               .HasForeignKey(use => use.UserId);

            modelBuilder.Entity<User_Notice>()
               .HasOne(c => c.Notice)
               .WithMany(co => co.User_Notice)
               .HasForeignKey(cop => cop.NoticeId);

            modelBuilder.Entity<Messages>()
              .HasOne(u => u.User)
              .WithMany(us => us.Messages)
              .HasForeignKey(use => use.UserId);

            modelBuilder.Entity<Messages>()
               .HasOne(c => c.Company)
               .WithMany(co => co.Messages)
               .HasForeignKey(cop => cop.CompanyId);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<User_Company> Users_Companies { get; set; }

        public DbSet<Notice> Notices { get; set; }

        public DbSet<User_Notice> Users_Notices { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<Favorites> Favorites { get; set; }
    }
}
