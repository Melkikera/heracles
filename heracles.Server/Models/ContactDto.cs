using System.ComponentModel.DataAnnotations;

namespace heracles.Server.Models
{
    public class ContactDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string? Telephone { get; set; }

        [Phone]
        public string? Mobile { get; set; }

        public string? PostalAddress { get; set; }

        [Url]
        public string? Facebook { get; set; }

        [Url]
        public string? LinkedIn { get; set; }

        [Url]
        public string? Instagram { get; set; }

        // JSON serialized schedules, keys Monday..Friday
        public string? SchedulesJson { get; set; }
    }
}
