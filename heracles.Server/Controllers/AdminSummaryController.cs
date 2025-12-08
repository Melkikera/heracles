using heracles.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Controllers
{
    [ApiController]
    [Route("api/admin/summary")]
    public class AdminSummaryController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AdminSummaryController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _db.Products.CountAsync();
            var contacts = await _db.Contacts.CountAsync();
            return Ok(new { products, contacts });
        }
    }
}
