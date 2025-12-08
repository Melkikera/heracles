using heracles.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Contact> Contacts { get; set; }
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
            modelBuilder.Entity<Contact>(b => {
                b.Property(c => c.SchedulesJson).HasColumnType("text");
            });

            // Seed initial "my contact" record
            modelBuilder.Entity<Contact>().HasData(new Contact
            {
                Id = 1,
                Email = "me@example.com",
                Telephone = "+1 234 567 890",
                Mobile = "+1 987 654 321",
                PostalAddress = "123 Main St, City, Country",
                Facebook = "https://facebook.com/myprofile",
                LinkedIn = "https://linkedin.com/in/myprofile",
                Instagram = "https://instagram.com/myprofile",
                SchedulesJson = "{\"Monday\":\"9:00-17:00\",\"Tuesday\":\"9:00-17:00\",\"Wednesday\":\"9:00-17:00\",\"Thursday\":\"9:00-17:00\",\"Friday\":\"9:00-17:00\"}",
                SubmittedAt = DateTime.Now,
                IsMine = true
            });
        }
    }
}
