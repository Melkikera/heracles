// Data/Repositories/UnitOfWork.cs
using heracles.Server.Entities;
using System.Threading.Tasks;

namespace heracles.Server.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(long id);
    }
}