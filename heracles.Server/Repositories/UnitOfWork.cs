using heracles.Server.Data;
using heracles.Server.Entities;
using heracles.Server.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public IRoadmapRepository RoadmapItems { get; }
    public IBacklogRepository BacklogItems { get; }
    public IRepository<Product> Products { get; }
    public IFeedbackRepository Feedbacks { get; }
    public IRepository<User> Users { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        RoadmapItems = new RoadmapRepository(_context);
        BacklogItems = new BacklogRepository(_context);
        Products = new Repository<Product>(_context);
        Feedbacks = new FeedbackRepository(_context);
        Users = new Repository<User>(_context);
    }

    public Task<int> CommitAsync() => _context.SaveChangesAsync();

}