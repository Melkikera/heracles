// Data/Repositories/UnitOfWork.cs
namespace heracles.Server.Repositories
{
    using heracles.Server.Data;
    using heracles.Server.Entities;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;

    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> GetByIdAsync(long id)
        {
            return await _dbContext.Users.FindAsync(id);
        }
    }
}