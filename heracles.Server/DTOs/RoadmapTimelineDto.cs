namespace heracles.Server.DTOs
{
    public class RoadmapTimelineDto
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Quarter { get; set; }
        public string? Status { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }

        public long? BacklogItemId { get; set; }
        public string? BacklogItemTitle { get; set; }
        public string? BacklogItemType { get; set; }
    }
}
