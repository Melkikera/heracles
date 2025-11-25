using heracles.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // This check prevents configuring the DbContext if options are already provided
            if (!optionsBuilder.IsConfigured)
            {
                // Configure the in-memory database here, if needed
                optionsBuilder.UseInMemoryDatabase("InMemoryDb");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Optionally configure entity mappings here
        }
    }
}
