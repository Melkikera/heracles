namespace heracles.Server.Repositories
{
    using heracles.Server.Data;
    using heracles.Server.Entities;
    using heracles.Server.Repositories;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class BacklogRepository : Repository<BacklogItem>, IBacklogRepository
    {
        public BacklogRepository(AppDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<IEnumerable<BacklogItem>> GetByTypeAsync(string type)
        {
            return await DbSet
                .Where(e => e.Type == type && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<BacklogItem>> GetByStatusAsync(string status)
        {
            return await DbSet
                .Where(e => e.Status == status && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<BacklogItem>> GetByPriorityRangeAsync(int min, int max)
        {
            return await DbSet
                .Where(e => e.Priority >= min && e.Priority <= max && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<BacklogItem>> GetCreatedByAsync(long userId)
        {
            return await DbSet
                .Where(e => e.CreatedById == userId && e.DeletedAt == null)
                .ToListAsync();
        }
    }
}