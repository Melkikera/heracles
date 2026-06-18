namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using heracles.Server.Data;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class RoadmapRepository : Repository<RoadmapItem>, IRoadmapRepository
    {
        public RoadmapRepository(AppDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<IEnumerable<RoadmapItem>> GetByBacklogItemAsync(long backlogItemId)
        {
            return await DbSet
                .Where(e => e.BacklogItemId == backlogItemId && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<RoadmapItem>> GetByQuarterAsync(string quarter)
        {
            return await DbSet
                .Where(e => e.Quarter == quarter && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<RoadmapItem>> GetByDateRangeAsync(System.DateTime start, System.DateTime end)
        {
            return await DbSet
                .Where(e => e.StartDate >= start && e.EndDate <= end && e.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<RoadmapItem>> GetCreatedByAsync(long userId)
        {
            return await DbSet
                .Where(e => e.CreatedById == userId && e.DeletedAt == null)
                .ToListAsync();
        }
    }
}