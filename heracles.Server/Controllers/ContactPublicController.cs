using heracles.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactPublicController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ContactPublicController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMine()
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.IsMine == true);
            if (contact == null) return NotFound();
            return Ok(contact);
        }
    }
}
