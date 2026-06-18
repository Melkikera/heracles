namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using heracles.Server.Data;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class FeedbackRepository : Repository<Feedback>, IFeedbackRepository
    {
        public FeedbackRepository(AppDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<IEnumerable<Feedback>> GetByBacklogItemAsync(long backlogItemId)
        {
            return await DbSet
                .Where(e => e.BacklogItemId == backlogItemId && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetBySourceAsync(string source)
        {
            return await DbSet
                .Where(e => e.Source == source && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetByStatusAsync(string status)
        {
            return await DbSet
                .Where(e => e.Status == status && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetCreatedByAsync(long userId)
        {
            return await DbSet
                .Where(e => e.CreatedById == userId && e.DeletedAt == null)
                .ToListAsync();
        }
    }
}