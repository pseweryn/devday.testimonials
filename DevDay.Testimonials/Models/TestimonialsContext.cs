using System.Data.Entity;
using DevDay.Testimonials.Migrations;

namespace DevDay.Testimonials.Models
{
    public class TestimonialsContext : DbContext
    {
        public TestimonialsContext() : base("DefaultConnection")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<TestimonialsContext, Configuration>());
        }

        public DbSet<Feedback> FeedbackItems { get; set; }
        public DbSet<Opinion> Opinions { get; set; }
    }
}