// Data/Repositories/IUnitOfWork.cs
namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using System.Threading.Tasks;

    public interface IUnitOfWork
    {
        IBacklogRepository BacklogItems { get; }
        IRoadmapRepository RoadmapItems { get; }
        IFeedbackRepository Feedbacks { get; }
        IRepository<User> Users { get; }
        Task<int> CommitAsync();

    }
}