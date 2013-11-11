using System.ComponentModel.DataAnnotations.Schema;

namespace DevDay.Testimonials.Models
{
    [Table("Feedback")]
    public class Feedback
    {
        public int Id { get; set; }
        public int OpinionId { get; set; }
        public virtual Opinion Opinion { get; set; }
        public string Message { get; set; }
    }
}