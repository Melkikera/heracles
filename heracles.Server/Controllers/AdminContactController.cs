using heracles.Server.Data;
using heracles.Server.Entities;
using heracles.Server.Models;
using heracles.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace heracles.Server.Controllers
{
    [ApiController]
    [Route("api/admin/contacts")]
    [Authorize(Policy = "AdminPolicy")]
    public class AdminContactController : ControllerBase
    {
        private readonly IContactRepository _repository;
        private readonly ILogger<AdminContactController> _logger;

        public AdminContactController(IContactRepository repository, ILogger<AdminContactController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contacts = await _repository.GetAllAsync();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var contact = await _repository.GetByIdAsync(id);
            if (contact == null) return NotFound();
            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

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
                SubmittedAt = DateTime.UtcNow,
                IsMine = false
            };

            await _repository.AddAsync(contact);

            return CreatedAtAction(nameof(Get), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ContactDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var contact = await _repository.GetByIdAsync(id);
            if (contact == null) return NotFound();

            contact.Email = dto.Email;
            contact.Telephone = dto.Telephone;
            contact.Mobile = dto.Mobile;
            contact.PostalAddress = dto.PostalAddress;
            contact.Facebook = dto.Facebook;
            contact.LinkedIn = dto.LinkedIn;
            contact.Instagram = dto.Instagram;
            contact.SchedulesJson = dto.SchedulesJson;

            await _repository.UpdateAsync(contact);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var contact = await _repository.GetByIdAsync(id);
            if (contact == null) return NotFound();

            await _repository.DeleteAsync(id);

            return NoContent();
        }
    }
}
