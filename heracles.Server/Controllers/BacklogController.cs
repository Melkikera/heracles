using heracles.Server.Entities;
using heracles.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/backlog")]
public class BacklogController : ControllerBase
{
    private readonly IBacklogService _backlogService;

    public BacklogController(IBacklogService backlogService)
    {
        _backlogService = backlogService;
    }

    [HttpGet]
    public async Task<IEnumerable<BacklogItem>> GetAll()
    {
        return await _backlogService.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _backlogService.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create(BacklogItem item)
    {
        // Remplace par ton logique d'authentification
        var userId = 1; // exemple
        var created = await _backlogService.CreateAsync(item, userId);
        return CreatedAtAction("GetById", new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, BacklogItem item)
    {
        var updated = await _backlogService.UpdateAsync(id, item);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var deleted = await _backlogService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }

    [HttpGet("type/{type}")]
    public async Task<IEnumerable<BacklogItem>> GetByType(string type)
    {
        return await _backlogService.GetByTypeAsync(type);
    }

    [HttpGet("status/{status}")]
    public async Task<IEnumerable<BacklogItem>> GetByStatus(string status)
    {
        return await _backlogService.GetByStatusAsync(status);
    }
}