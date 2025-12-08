using heracles.Server.Data;
using heracles.Server.Entities;
using heracles.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace heracles.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContactController> _logger;

        public ContactController(AppDbContext context, ILogger<ContactController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Submit([FromBody] ContactDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contact = new Contact
            {
                Email = dto.Email,
                Telephone = dto.Telephone,
                Mobile = dto.Mobile,
                PostalAddress = dto.PostalAddress,
                Facebook = dto.Facebook,
                LinkedIn = dto.LinkedIn,
                Instagram = dto.Instagram,
                SchedulesJson = dto.SchedulesJson,
                SubmittedAt = DateTime.UtcNow
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(null, new { id = contact.Id }, contact);
        }
    }
}
