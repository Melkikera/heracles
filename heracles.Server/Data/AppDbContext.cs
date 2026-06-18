using heracles.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<BacklogItem> BacklogItems { get; set; } = null!;
        public DbSet<RoadmapItem> RoadmapItems { get; set; } = null!;
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
        // NEW
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<Tag>? Tags { get; set; } // si Tag utilisé

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
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contacts");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Email).HasColumnName("email").IsRequired().HasMaxLength(255);
                entity.Property(e => e.Telephone).HasColumnName("telephone").HasMaxLength(50);
                entity.Property(e => e.Mobile).HasColumnName("mobile").HasMaxLength(50);
                entity.Property(e => e.PostalAddress).HasColumnName("postal_address").HasMaxLength(500);
                entity.Property(e => e.Facebook).HasColumnName("facebook").HasMaxLength(255);
                entity.Property(e => e.LinkedIn).HasColumnName("linkedin").HasMaxLength(255);
                entity.Property(e => e.Instagram).HasColumnName("instagram").HasMaxLength(255);
                entity.Property(e => e.SchedulesJson).HasColumnName("schedules_json");
                entity.Property(e => e.SubmittedAt).HasColumnName("submitted_at").IsRequired();
                entity.Property(e => e.IsMine).HasColumnName("is_mine").IsRequired();
            });
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
                SubmittedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                IsMine = true
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");
                entity.Property(e => e.Uuid).HasColumnName("uuid").IsRequired();
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasColumnName("name").IsRequired();
                entity.Property(e => e.Price).HasColumnName("price").IsRequired();
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Category).HasColumnName("category");
                entity.Property(e => e.Sku).HasColumnName("sku");
                entity.Property(e => e.StockQuantity).HasColumnName("stock_quantity").IsRequired();
                entity.Property(e => e.IsActive).HasColumnName("is_active").IsRequired();
                entity.Property(e=>e.DiscountPercentage).HasColumnName("discount_percentage");
                entity.Property(e => e.CreatedById).HasColumnName("created_by_id").IsRequired();
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Price)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.Property(e => e.Description)
                    .HasMaxLength(500);

                entity.Property(e => e.Category)
                    .HasMaxLength(50);

                entity.Property(e => e.Sku)
                    .HasMaxLength(50);

                entity.Property(e => e.StockQuantity)
                    .IsRequired()
                    .HasDefaultValue(0);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValue(true);

                entity.Property(e => e.DiscountPercentage)
                    .HasColumnType("decimal(5,2)");

                entity.Property(e => e.CreatedById)
                    .IsRequired(); // long type

                entity.Property(e => e.CreatedAt)
                    .IsRequired()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.UpdatedAt)
                    .IsRequired(false);

                entity.Property(e => e.DeletedAt)
                    .IsRequired(false);

                entity.HasIndex(e => e.Name);
                entity.HasIndex(e => e.Category);
                entity.HasIndex(e => e.Sku)
                    .IsUnique();
                entity.HasIndex(e => e.IsActive);

                // ✅ CORRECTION : Ensure FK type matches principal key
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(u => u.Products)
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.Restrict);

                // Navigation (NEW)
                entity.HasMany(e => e.Images)
                    .WithOne(i => i.Product)
                    .HasForeignKey(i => i.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.Tags)
                    .WithOne(t => t.Product)
                    .HasForeignKey(t => t.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);


                entity.HasQueryFilter(p => p.DeletedAt == null);
            });

            // Ensure User entity is configured with int Id
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id); // Should be int
                entity.Property(e => e.Id)
                    .IsRequired();

                entity.HasQueryFilter(u => u.DeletedAt == null);
            });

            // ------------------------------------------------
            // User
            // ------------------------------------------------
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Uuid).HasColumnName("uuid").IsRequired();
                entity.Property(e => e.Email).HasColumnName("email").IsRequired().HasMaxLength(255);
                entity.Property(e => e.PasswordHash).HasColumnName("password_hash").IsRequired().HasMaxLength(255);
                entity.Property(e => e.Role).HasColumnName("role").IsRequired().HasMaxLength(50).HasDefaultValue("member");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").IsRequired();
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Uuid).IsUnique();

                // Soft delete filter
                entity.HasQueryFilter(e => e.DeletedAt == null);

            });

            // ------------------------------------------------
            // BacklogItem
            // ------------------------------------------------
            modelBuilder.Entity<BacklogItem>(entity =>
            {
                entity.ToTable("backlog_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Uuid).HasColumnName("uuid").IsRequired();
                entity.Property(e => e.Title).HasColumnName("title").IsRequired().HasMaxLength(255);
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Type).HasColumnName("type").IsRequired().HasMaxLength(50).HasDefaultValue("feature");
                entity.Property(e => e.Status).HasColumnName("status").IsRequired().HasMaxLength(50).HasDefaultValue("idea");
                entity.Property(e => e.Priority).HasColumnName("priority").IsRequired().HasDefaultValue(0);
                entity.Property(e => e.CreatedById).HasColumnName("created_by_id").IsRequired();
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").IsRequired();
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.Title);
                entity.HasIndex(e => e.Type);
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.Priority);
                entity.HasIndex(e => e.CreatedById);

                // Soft delete filter
                entity.HasQueryFilter(e => e.DeletedAt == null);

                // Relation avec User
                entity.HasOne(e => e.CreatedBy)
                      .WithMany(u => u.BacklogItems)
                      .HasForeignKey(e => e.CreatedById)
                      .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
            });

            // ------------------------------------------------
            // RoadmapItem
            // ------------------------------------------------
            modelBuilder.Entity<RoadmapItem>(entity =>
            {
                entity.ToTable("roadmap_items");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Uuid).HasColumnName("uuid").IsRequired();
                entity.Property(e => e.BacklogItemId).HasColumnName("backlog_item_id").IsRequired();
                entity.Property(e => e.Title).HasColumnName("title").IsRequired().HasMaxLength(255);
                entity.Property(e => e.StartDate).HasColumnName("start_date").IsRequired();
                entity.Property(e => e.EndDate).HasColumnName("end_date").IsRequired();
                entity.Property(e => e.Quarter).HasColumnName("quarter");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.CreatedById).HasColumnName("created_by_id").IsRequired();
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").IsRequired();
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.BacklogItemId);
                entity.HasIndex(e => e.StartDate);
                entity.HasIndex(e => e.EndDate);
                entity.HasIndex(e => e.Quarter);
                entity.HasIndex(e => e.CreatedById);

                // Soft delete filter
                entity.HasQueryFilter(e => e.DeletedAt == null);

                // Relation avec BacklogItem
                entity.HasOne(e => e.BacklogItem)
                      .WithMany(b => b.RoadmapItems)
                      .HasForeignKey(e => e.BacklogItemId)
                      .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);

                // Relation avec User
                entity.HasOne(e => e.CreatedBy)
                      .WithMany(u => u.RoadmapItems)
                      .HasForeignKey(e => e.CreatedById)
                      .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
            });

            // ------------------------------------------------
            // Feedback
            // ------------------------------------------------
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedbacks");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.Uuid).HasColumnName("uuid").IsRequired();
                entity.Property(e => e.BacklogItemId).HasColumnName("backlog_item_id"); // nullable
                entity.Property(e => e.Title).HasColumnName("title").IsRequired().HasMaxLength(255);
                entity.Property(e => e.Description).HasColumnName("description").IsRequired();
                entity.Property(e => e.Source).HasColumnName("source").IsRequired().HasMaxLength(50).HasDefaultValue("direct");
                entity.Property(e => e.Status).HasColumnName("status").IsRequired().HasMaxLength(50).HasDefaultValue("new");
                entity.Property(e => e.CreatedById).HasColumnName("created_by_id").IsRequired();
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").IsRequired();
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.Title);
                entity.HasIndex(e => e.Source);
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.BacklogItemId);
                entity.HasIndex(e => e.CreatedById);

                // Soft delete filter
                entity.HasQueryFilter(e => e.DeletedAt == null);

                // Relation avec BacklogItem (nullable)
                entity.HasOne(e => e.BacklogItem)
                      .WithMany(b => b.Feedbacks)
                      .HasForeignKey(e => e.BacklogItemId)
                      .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.SetNull);

                // Relation avec User
                entity.HasOne(e => e.CreatedBy)
                      .WithMany(u => u.Feedbacks)
                      .HasForeignKey(e => e.CreatedById)
                      .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
            });

            // ProductImage configuration (NEW)
            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.ToTable("product_images");
                entity.HasQueryFilter(i => i.DeletedAt == null);
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ProductId).HasColumnName("product_id").IsRequired();
                entity.Property(e => e.Url).HasColumnName("url").IsRequired().HasMaxLength(500);
                entity.Property(e => e.AltText).HasColumnName("alt_text").HasMaxLength(200);
                entity.Property(e => e.IsPrimary).HasColumnName("is_primary").IsRequired().HasDefaultValue(false);
                entity.Property(e => e.Order).HasColumnName("order").IsRequired().HasDefaultValue(0);
                entity.Property(e => e.CreatedById).HasColumnName("created_by_id").IsRequired();
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.ProductId);
                entity.HasIndex(e => e.IsPrimary);

                entity.HasOne(e => e.CreatedBy)
                    .WithMany(u => u.ProductImages)
                    .HasForeignKey(e => e.CreatedById)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ProductTag configuration (NEW)
            modelBuilder.Entity<ProductTag>(entity =>
            {
                entity.ToTable("product_tags");
                entity.HasQueryFilter(i => i.DeletedAt == null);
                entity.HasKey(e => e.Id);

                entity.Property(e => e.TagName).HasColumnName("tag_name").IsRequired().HasMaxLength(50);
                entity.Property(e => e.ProductId).HasColumnName("product_id").IsRequired();
                entity.Property(e => e.TagId).HasColumnName("tag_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                entity.HasIndex(e => e.ProductId);
                entity.HasIndex(e => e.TagId);
                entity.HasIndex(e => e.TagName);

                entity.HasOne(e => e.Product)
                    .WithMany(p => p.Tags)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Tag)
                    .WithMany(t => t.ProductTags)
                    .HasForeignKey(e => e.TagId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Tag configuration (NEW - si utilisé)
            if (Tags != null)
            {
                modelBuilder.Entity<Tag>(entity =>
                {
                    entity.ToTable("tags");
                    entity.HasKey(e => e.Id);
                    entity.HasQueryFilter(t => t.DeletedAt == null);

                    entity.Property(e => e.Name).HasColumnName("name").IsRequired().HasMaxLength(50);
                    entity.Property(e => e.Description).HasColumnName("description").HasMaxLength(200);
                    entity.Property(e => e.Color).HasColumnName("color").HasMaxLength(20);
                    entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
                    entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                    entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");

                    entity.HasIndex(e => e.Name).IsUnique();
                });
            }
        }

        // Override SaveChanges pour updated_at automatique
        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(e => e.State == Microsoft.EntityFrameworkCore.EntityState.Modified))
            {
                if (entry.Entity.GetType().GetProperty("UpdatedAt") != null)
                {
                    entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(e => e.State == Microsoft.EntityFrameworkCore.EntityState.Modified))
            {
                if (entry.Entity.GetType().GetProperty("UpdatedAt") != null)
                {
                    entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
