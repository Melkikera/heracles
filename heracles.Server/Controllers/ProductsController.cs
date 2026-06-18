// Controllers/ProductController.cs
namespace heracles.Server.Controllers
{
    using heracles.Server.DTOs;
    using heracles.Server.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> GetAll()
        {
            return await _productService.GetAllAsync();
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        // GET: api/products/paginated?page=1&pageSize=10
        [HttpGet("paginated")]
        public async Task<PaginatedProductsDTO> GetPaginated(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            return await _productService.GetPaginatedAsync(page, pageSize);
        }

        // GET: api/products/search?term=xxx&page=1&pageSize=10
        [HttpGet("search")]
        public async Task<PaginatedProductsDTO> Search(
            [FromQuery] string term,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            return await _productService.SearchAsync(term, page, pageSize);
        }

        // GET: api/products/category/{category}
        [HttpGet("category/{category}")]
        public async Task<IEnumerable<ProductDTO>> GetByCategory(string category)
        {
            return await _productService.GetByCategoryAsync(category);
        }

        // GET: api/products/active
        [HttpGet("active")]
        public async Task<IEnumerable<ProductDTO>> GetActive()
        {
            return await _productService.GetActiveAsync();
        }

        // POST: api/products
        [HttpPost]
        public async Task<IActionResult> Create(ProductCreateDTO dto)
        {
            // Remplace par ton authentification réelle
            var userId = GetUserIdFromRequest();

            var created = await _productService.CreateAsync(dto, userId);
            return CreatedAtAction("GetById", new { id = created.Id }, created);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductUpdateDTO dto)
        {
            var updated = await _productService.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _productService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        private int GetUserIdFromRequest()
        {
            // Example with Authentication
            return 1; // placeholder
        }
    }
}