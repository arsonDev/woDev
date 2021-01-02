using Microsoft.EntityFrameworkCore;
using WoDevServer.Database.Model;

namespace WoDevServer.Database
{
    public class WodevContext : DbContext
    {
        public WodevContext(DbContextOptions<WodevContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(indexExpression => indexExpression.Id).IsUnique(true);
                entity.HasIndex(indexExpression => indexExpression.Login).IsUnique(true);
                entity.HasIndex(indexExpression => indexExpression.Email).IsUnique(true).HasAnnotation("IsUnique", true);
            });
        }
    }
}