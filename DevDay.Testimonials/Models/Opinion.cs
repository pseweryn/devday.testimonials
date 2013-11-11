using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevDay.Testimonials.Models
{
    [Table("Opinions")]
    public class Opinion
    {
        public int Id { get; set; }
        public virtual ICollection<Feedback> FeedbackItems { get; set; }
        public string Text { get; set; }
    }
}