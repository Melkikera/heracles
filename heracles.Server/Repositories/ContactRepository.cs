using heracles.Server.Data;
using heracles.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext _db;
        public ContactRepository(AppDbContext db)
        {
            _db = db;
        }
        public async Task<List<Contact>> GetAllAsync()
        {
            return await _db.Contacts.ToListAsync();
        }
        public async Task<Contact?> GetByIdAsync(int id)
        {
            return await _db.Contacts.FindAsync(id);
        }
        public async Task<Contact?> GetMineAsync()
        {
            return await _db.Contacts.FirstOrDefaultAsync(c => c.IsMine);
        }
        public async Task AddAsync(Contact contact)
        {
            _db.Contacts.Add(contact);
            await _db.SaveChangesAsync();
        }
        public async Task UpdateAsync(Contact contact)
        {
            _db.Contacts.Update(contact);
            await _db.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var c = await GetByIdAsync(id);
            if (c == null) return;
            _db.Contacts.Remove(c);
            await _db.SaveChangesAsync();
        }
    }
}
