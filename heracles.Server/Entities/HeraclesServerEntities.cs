namespace heracles.Server.Entities
{
    using System;
    using System.Collections.Generic;

    // =====================================================
    // ENTITE: User
    // =====================================================
    public class User
    {
        public int Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "member"; // 'admin' ou 'member'
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        // Navigation
        public ICollection<BacklogItem> BacklogItems { get; set; } = new List<BacklogItem>();
        public ICollection<RoadmapItem> RoadmapItems { get; set; } = new List<RoadmapItem>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<ProductImage> ProductImages { get; set;} = new List<ProductImage>();
    }

    // =====================================================
    // ENTITE: BacklogItem
    // =====================================================
    public class BacklogItem
    {
        public long Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Type { get; set; } = "feature"; // 'feature', 'bug', 'initiative'
        public string Status { get; set; } = "idea";   // 'idea', 'in_progress', 'done'
        public int Priority { get; set; } = 0;         // 0 à 100
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        // Navigation
        public User CreatedBy { get; set; } = null!;
        public ICollection<RoadmapItem> RoadmapItems { get; set; } = new List<RoadmapItem>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    }

    // =====================================================
    // ENTITE: RoadmapItem
    // =====================================================
    public class RoadmapItem
    {
        public long Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        public long BacklogItemId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Quarter { get; set; } // ex: 'Q1 2026'
        public string? Description { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        // Navigation
        public BacklogItem BacklogItem { get; set; } = null!;
        public User CreatedBy { get; set; } = null!;
    }

    // =====================================================
    // ENTITE: Feedback
    // =====================================================
    public class Feedback
    {
        public long Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        public long? BacklogItemId { get; set; } // NULL si pas encore lié
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Source { get; set; } = "direct"; // 'direct', 'support', 'sale', 'other'
        public string Status { get; set; } = "new";    // 'new', 'linked', 'ignored'
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; }

        // Navigation
        public BacklogItem? BacklogItem { get; set; }
        public User CreatedBy { get; set; } = null!;
    }
}
