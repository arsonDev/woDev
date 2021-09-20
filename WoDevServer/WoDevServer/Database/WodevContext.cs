using Microsoft.EntityFrameworkCore;
using System;
using WoDevServer.Database.Model;

namespace WoDevServer.Database
{
    public class WodevContext : DbContext
    {
        public WodevContext(DbContextOptions<WodevContext> options) : base(options)
        {
            this.Database.EnsureCreated();
            try
            {
                this.Database.Migrate();
            }catch(Exception e)
            {

            }
        }

        public DbSet<User> User { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Technology> Technology { get; set; }
        public DbSet<ProfileTech> ProfileTech { get; set; }
        public DbSet<UserProfileType> UserProfileType { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderFile> OrderFiles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(entity => entity.UserId);
                entity.HasIndex(indexExpression => indexExpression.UserId).IsUnique(true);
                entity.HasIndex(indexExpression => indexExpression.Login).IsUnique(true);
                entity.HasIndex(indexExpression => indexExpression.Email).IsUnique(true);

            });

            modelBuilder.Entity<UserProfile>().ToTable("Profile");
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(entity => entity.UserProfileId);

            });
          
            modelBuilder.Entity<Technology>().ToTable("Technology");
            modelBuilder.Entity<Technology>(entity =>
            {
                entity.HasKey(entity => entity.TechnologyId);
                entity.HasIndex(entity => entity.TechnologyId).IsUnique();
            });

            modelBuilder.Entity<ProfileTech>().ToTable("ProfileTech");
            modelBuilder.Entity<ProfileTech>(entity =>
            {
                entity.HasKey(entity => entity.Id);
                entity.HasIndex(indexExpression => indexExpression.Id).IsUnique(true);                
            });

            modelBuilder.Entity<UserProfileType>().ToTable("UserProfileType");
            modelBuilder.Entity<UserProfileType>(entity =>
            {
                entity.HasKey(entity => entity.Id);
                entity.HasIndex(indexExpression => indexExpression.Id).IsUnique(true);
            });


        }
    }
}