namespace heracles.Server.Controllers
{
    using heracles.Server.Services.Interfaces;
    using heracles.Server.Entities;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<IEnumerable<Feedback>> GetAll()
        {
            return await _feedbackService.GetAllAsync();
        }

        // GET: api/feedback/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var item = await _feedbackService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<IActionResult> Create(Feedback item)
        {
            // Remplace par ton logique d'authentification
            var userId = GetUserIdFromRequest(); // exemple : 1

            var created = await _feedbackService.CreateAsync(item, userId);
            return CreatedAtAction("GetById", new { id = created.Id }, created);
        }

        // PUT: api/feedback/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, Feedback item)
        {
            var updated = await _feedbackService.UpdateAsync(id, item);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // DELETE: api/feedback/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _feedbackService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // GET: api/feedback/backlog/{backlogItemId}
        [HttpGet("backlog/{backlogItemId}")]
        public async Task<IEnumerable<Feedback>> GetByBacklogItem(long backlogItemId)
        {
            return await _feedbackService.GetByBacklogItemAsync(backlogItemId);
        }

        // GET: api/feedback/source/{source}
        [HttpGet("source/{source}")]
        public async Task<IEnumerable<Feedback>> GetBySource(string source)
        {
            return await _feedbackService.GetBySourceAsync(source);
        }

        // GET: api/feedback/status/{status}
        [HttpGet("status/{status}")]
        public async Task<IEnumerable<Feedback>> GetByStatus(string status)
        {
            return await _feedbackService.GetByStatusAsync(status);
        }

        // Helper: récupère l'userId (remplace par ton authentification réelle)
        private int GetUserIdFromRequest()
        {
            // Exemple avec Authentication :
            // var userIdClaim = User.FindFirst("userId")?.Value;
            // return int.Parse(userIdClaim ?? "1");

            return 1; // valeur par exemple
        }
    }
}