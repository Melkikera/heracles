namespace heracles.Server.Repositories
{
    using heracles.Server.Data;
    using heracles.Server.Entities;
    using heracles.Server.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        // =====================================================
        // PRODUCT METHODS
        // =====================================================

        public async Task<IEnumerable<Product>> GetAllAsync(bool includeDeleted = false)
        {
            var query = _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .AsQueryable();

            if (!includeDeleted)
            {
                query = query.Where(p => p.DeletedAt == null);
            }

            return await query.ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .FirstOrDefaultAsync(p => p.Id == id && p.DeletedAt == null);
        }

        public async Task<Product> CreateAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> UpdateAsync(Product product)
        {
            var existing = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .FirstOrDefaultAsync(p => p.Id == product.Id);

            if (existing == null)
                return null;

            // Update product fields
            existing.Name = product.Name;
            existing.Price = product.Price;
            existing.Description = product.Description;
            existing.Category = product.Category;
            existing.StockQuantity = product.StockQuantity;
            existing.Sku = product.Sku;
            existing.DiscountPercentage = product.DiscountPercentage;
            existing.IsActive = product.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            product.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(string category)
        {
            return await _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .Where(p => p.Category == category && p.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetActiveAsync()
        {
            return await _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .Where(p => p.IsActive && p.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<Product?> GetBySkuAsync(string sku)
        {
            return await _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .FirstOrDefaultAsync(p => p.Sku == sku && p.DeletedAt == null);
        }

        public async Task<PaginatedList<Product>> GetPaginatedAsync(int pageNumber = 1, int pageSize = 10)
        {
            var query = _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .Where(p => p.DeletedAt == null)
                .OrderBy(p => p.Name);

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedList<Product>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<PaginatedList<Product>> SearchAsync(string searchTerm, int pageNumber = 1, int pageSize = 10)
        {
            var query = _context.Products
                .Include(p => p.CreatedBy)
                .Include(p => p.Images)
                .Include(p => p.Tags)
                .Where(p => p.DeletedAt == null &&
                           (p.Name.Contains(searchTerm) ||
                            p.Description.Contains(searchTerm) ||
                            p.Category.Contains(searchTerm)))
                .OrderBy(p => p.Name);

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedList<Product>(items, totalCount, pageNumber, pageSize);
        }

        // =====================================================
        // PRODUCT IMAGE METHODS
        // =====================================================

        public async Task<IEnumerable<ProductImage>> GetImagesAsync(int productId)
        {
            return await _context.ProductImages
                .Include(i => i.CreatedBy)
                .Where(i => i.ProductId == productId && i.DeletedAt == null)
                .OrderBy(i => i.Order)
                .ToListAsync();
        }

        public async Task<ProductImage?> GetImageAsync(int productId, int imageId)
        {
            return await _context.ProductImages
                .Include(i => i.CreatedBy)
                .FirstOrDefaultAsync(i =>
                    i.ProductId == productId &&
                    i.Id == imageId &&
                    i.DeletedAt == null);
        }

        public async Task<ProductImage> AddImageAsync(int productId, ProductImage image)
        {
            // Vérifier que le produit existe
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.DeletedAt == null);

            if (product == null)
                throw new InvalidOperationException($"Product with ID {productId} not found");

            // Assigner le produit
            image.ProductId = productId;
            image.CreatedById = image.CreatedById;
            image.CreatedAt = DateTime.UtcNow;

            await _context.ProductImages.AddAsync(image);
            await _context.SaveChangesAsync();

            // Retourner avec relations
            return await _context.ProductImages
                .Include(i => i.CreatedBy)
                .FirstOrDefaultAsync(i => i.Id == image.Id);
        }

        public async Task<bool> RemoveImageAsync(int productId, int imageId)
        {
            var image = await _context.ProductImages
                .FirstOrDefaultAsync(i =>
                    i.ProductId == productId &&
                    i.Id == imageId);

            if (image == null)
                return false;

            // Soft delete
            image.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // =====================================================
        // PRODUCT TAG METHODS
        // =====================================================

        public async Task<IEnumerable<ProductTag>> GetTagsAsync(int productId)
        {
            return await _context.ProductTags
                .Include(t => t.Tag)
                .Where(t => t.ProductId == productId && t.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<bool> AddTagAsync(int productId, string tagName)
        {
            // Vérifier que le produit existe
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.DeletedAt == null);

            if (product == null)
                throw new InvalidOperationException($"Product with ID {productId} not found");

            // Vérifier si le tag existe déjà pour ce produit
            var existingTag = await _context.ProductTags
                .FirstOrDefaultAsync(t =>
                    t.ProductId == productId &&
                    t.TagName == tagName &&
                    t.DeletedAt == null);

            if (existingTag != null)
                return false; // Tag déjà présent

            // Créer le tag
            var productTag = new ProductTag
            {
                ProductId = productId,
                TagName = tagName,
                CreatedAt = DateTime.UtcNow
            };

            await _context.ProductTags.AddAsync(productTag);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddTagWithIdAsync(int productId, int tagId)
        {
            // Vérifier que le produit existe
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.DeletedAt == null);

            if (product == null)
                throw new InvalidOperationException($"Product with ID {productId} not found");

            // Vérifier que le tag existe (si Tag global utilisé)
            var tag = await _context.Tags
                .FirstOrDefaultAsync(t => t.Id == tagId && t.DeletedAt == null);

            if (tag == null)
                throw new InvalidOperationException($"Tag with ID {tagId} not found");

            // Vérifier si le tag existe déjà pour ce produit
            var existingTag = await _context.ProductTags
                .FirstOrDefaultAsync(t =>
                    t.ProductId == productId &&
                    t.TagId == tagId &&
                    t.DeletedAt == null);

            if (existingTag != null)
                return false; // Tag déjà présent

            // Créer le tag
            var productTag = new ProductTag
            {
                ProductId = productId,
                TagId = tagId,
                TagName = tag.Name,
                CreatedAt = DateTime.UtcNow
            };

            await _context.ProductTags.AddAsync(productTag);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveTagAsync(int productId, string tagName)
        {
            var tag = await _context.ProductTags
                .FirstOrDefaultAsync(t =>
                    t.ProductId == productId &&
                    t.TagName == tagName);

            if (tag == null)
                return false;

            // Soft delete
            tag.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveTagByIdAsync(int productId, int tagId)
        {
            var tag = await _context.ProductTags
                .FirstOrDefaultAsync(t =>
                    t.ProductId == productId &&
                    t.TagId == tagId);

            if (tag == null)
                return false;

            // Soft delete
            tag.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // =====================================================
        // BATCH METHODS (OPTIONNEL)
        // =====================================================

        public async Task<bool> AddImagesAsync(int productId, IEnumerable<ProductImage> images)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.DeletedAt == null);

            if (product == null)
                throw new InvalidOperationException($"Product with ID {productId} not found");

            foreach (var image in images)
            {
                image.ProductId = productId;
                image.CreatedAt = DateTime.UtcNow;
                await _context.ProductImages.AddAsync(image);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AddTagsAsync(int productId, IEnumerable<string> tagNames)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId && p.DeletedAt == null);

            if (product == null)
                throw new InvalidOperationException($"Product with ID {productId} not found");

            foreach (var tagName in tagNames)
            {
                var existingTag = await _context.ProductTags
                    .FirstOrDefaultAsync(t =>
                        t.ProductId == productId &&
                        t.TagName == tagName &&
                        t.DeletedAt == null);

                if (existingTag == null)
                {
                    var productTag = new ProductTag
                    {
                        ProductId = productId,
                        TagName = tagName,
                        CreatedAt = DateTime.UtcNow
                    };
                    await _context.ProductTags.AddAsync(productTag);
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveAllImagesAsync(int productId)
        {
            var images = await _context.ProductImages
                .Where(i => i.ProductId == productId)
                .ToListAsync();

            if (images.Count == 0)
                return false;

            foreach (var image in images)
            {
                image.DeletedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveAllTagsAsync(int productId)
        {
            var tags = await _context.ProductTags
                .Where(t => t.ProductId == productId)
                .ToListAsync();

            if (tags.Count == 0)
                return false;

            foreach (var tag in tags)
            {
                tag.DeletedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public Task<bool> AddTagAsync(int productId, int tagId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveTagAsync(int productId, int tagId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddTagAsync(string tag, int tagId)
        {
            throw new NotImplementedException();
        }
    }
}