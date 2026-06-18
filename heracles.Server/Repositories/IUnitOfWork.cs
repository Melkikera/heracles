// Data/Repositories/IUnitOfWork.cs
namespace heracles.Server.Repositories
{
    using System.Threading.Tasks;

    public interface IUnitOfWork
    {
        IBacklogRepository BacklogItems { get; }
        IRoadmapRepository RoadmapItems { get; }
        IFeedbackRepository Feedbacks { get; }
        IUserRepository Users { get; }
        Task<int> CommitAsync();
    }
}