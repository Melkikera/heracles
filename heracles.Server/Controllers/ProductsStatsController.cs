using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using heracles.Server.Repositories;

namespace heracles.Server.Controllers
{
    [ApiController]
    [Route("api/products/stats")]
    public class ProductsStatsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        // simple stopwords FR/EN — adapter selon besoin
        private static readonly HashSet<string> StopWords = new(StringComparer.OrdinalIgnoreCase)
        {
            "app","sam","xia","red"
        };

        public ProductsStatsController(IProductRepository repo) => _repo = repo;

        [HttpGet("keywords")]
        public async Task<IActionResult> GetKeywordStats([FromQuery] int minWordLength = 3, [FromQuery] int top = 20)
        {
            var products = await _repo.GetAllProductsAsync();
            var rx = new Regex(@"\W+", RegexOptions.Compiled);
            var counts = products
                .SelectMany(p => rx.Split(p.Name ?? string.Empty)
                    .Select(w => w.Trim().ToLowerInvariant()))
                .Where(w => w.Length >= minWordLength && !StopWords.Contains(w))
                .GroupBy(w => w)
                .Select(g => new { Keyword = g.Key, Count = g.Count() })
                .OrderByDescending(k => k.Count)
                .Take(top)
                .ToList();
            return Ok(counts);
        }

        [HttpGet("prices")]
        public async Task<IActionResult> GetPriceBuckets([FromQuery] decimal threshold = 500m)
        {
            var products = await _repo.GetAllProductsAsync();
            var total = products.Count;
            var below = products.Count(p => p.Price < threshold);
            var aboveOrEq = total - below;
            var belowAvg = below > 0 ? products.Where(p => p.Price < threshold).Average(p => p.Price) : 0m;
            var aboveAvg = aboveOrEq > 0 ? products.Where(p => p.Price >= threshold).Average(p => p.Price) : 0m;

            return Ok(new
            {
                Threshold = threshold,
                Total = total,
                BelowCount = below,
                AboveOrEqualCount = aboveOrEq,
                BelowAverage = Math.Round(belowAvg, 2),
                AboveAverage = Math.Round(aboveAvg, 2)
            });
        }
    }
}