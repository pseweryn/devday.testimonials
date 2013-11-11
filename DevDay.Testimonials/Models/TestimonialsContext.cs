using System.Data.Entity;

namespace DevDay.Testimonials.Models
{
    public class TestimonialsContext : DbContext
    {
        public TestimonialsContext() : base("DefaultConnection")
        {
        }

        public DbSet<Feedback> FeedbackItems { get; set; }
        public DbSet<Opinion> Opinions { get; set; }
    }
}