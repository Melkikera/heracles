// Data/Repositories/UnitOfWork.cs
namespace heracles.Server.Repositories
{
    using heracles.Server.Data;
    using System.Threading.Tasks;

    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext DbContext;
        private IBacklogRepository? _backlogItems;
        private IRoadmapRepository? _roadmapItems;
        private IFeedbackRepository? _feedbacks;
        private IUserRepository? _users;

        public UnitOfWork(AppDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public IBacklogRepository BacklogItems =>
            _backlogItems ??= new BacklogRepository(DbContext);

        public IRoadmapRepository RoadmapItems => 
            _roadmapItems ??= new RoadmapRepository(DbContext);

        public IFeedbackRepository Feedbacks =>
            _feedbacks ??= new FeedbackRepository(DbContext);
        public IUserRepository Users =>
            _users ??= new UserRepository(DbContext);

        public async Task<int> CommitAsync()
        {
            return await DbContext.SaveChangesAsync();
        }

        
    }
}