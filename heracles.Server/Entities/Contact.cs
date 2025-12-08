using System;

namespace heracles.Server.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string PostalAddress { get; set; }
        public string Facebook { get; set; }
        public string LinkedIn { get; set; }
        public string Instagram { get; set; }
        public string SchedulesJson { get; set; }
        public DateTime SubmittedAt { get; set; }
        public bool IsMine { get; set; } // indicates this contact is the owner's contact
    }
}
