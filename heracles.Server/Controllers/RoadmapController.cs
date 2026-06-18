namespace heracles.Server.Controllers
{
    using heracles.Server.Entities;
    using heracles.Server.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/roadmap")]
    public class RoadmapController : ControllerBase
    {
        private readonly IRoadmapService _roadmapService;

        public RoadmapController(IRoadmapService roadmapService)
        {
            _roadmapService = roadmapService;
        }

        // GET: api/roadmap
        [HttpGet]
        public async Task<IEnumerable<RoadmapItem>> GetAll()
        {
            return await _roadmapService.GetAllAsync();
        }

        // GET: api/roadmap/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var item = await _roadmapService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/roadmap
        [HttpPost]
        public async Task<IActionResult> Create(RoadmapItem item)
        {
            // Remplace par ton logique d'authentification (ex: ClaimsPrincipal)
            var userId = GetUserIdFromRequest(); // exemple : 1

            var created = await _roadmapService.CreateAsync(item, userId);
            return CreatedAtAction("GetById", new { id = created.Id }, created);
        }

        // PUT: api/roadmap/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, RoadmapItem item)
        {
            var updated = await _roadmapService.UpdateAsync(id, item);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // DELETE: api/roadmap/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _roadmapService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // GET: api/roadmap/backlog/{backlogItemId}
        [HttpGet("backlog/{backlogItemId}")]
        public async Task<IEnumerable<RoadmapItem>> GetByBacklogItem(long backlogItemId)
        {
            return await _roadmapService.GetByBacklogItemAsync(backlogItemId);
        }

        // GET: api/roadmap/quarter/{quarter}
        [HttpGet("quarter/{quarter}")]
        public async Task<IEnumerable<RoadmapItem>> GetByQuarter(string quarter)
        {
            return await _roadmapService.GetByQuarterAsync(quarter);
        }

        // GET: api/roadmap/dates?start=2026-01-01&end=2026-12-31
        [HttpGet("dates")]
        public async Task<IEnumerable<RoadmapItem>> GetByDateRange(
            [FromQuery] DateTime start,
            [FromQuery] DateTime end)
        {
            return await _roadmapService.GetByDateRangeAsync(start, end);
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