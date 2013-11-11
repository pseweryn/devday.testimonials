using DevDay.Testimonials.Models;

namespace DevDay.Testimonials.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TestimonialsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TestimonialsContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.Opinions.AddOrUpdate(
                o => o.Text,
                    new Opinion {Text = "It was awesome!"},
                    new Opinion {Text = "Not bad"},
                    new Opinion {Text = "OK, I guess"},
                    new Opinion {Text = "Weak"}, 
                    new Opinion {Text = "Srsly? Dude, srsly?"}
                );

        }
    }
}
