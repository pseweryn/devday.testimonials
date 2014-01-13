using System.Linq;
using DevDay.Testimonials.Models;
using Nancy;
using Nancy.ModelBinding;

namespace DevDay.Testimonials
{
    public class IndexModule : NancyModule
    {
        TestimonialsContext _db = new TestimonialsContext();

        public IndexModule()
        {
            Get["/"] = parameters =>
            {
                var opinions = _db.Opinions.ToList();
                return View["index", opinions];
            };
            
            Post["/feedback"] = _ =>
            {
                var feedback = this.Bind<Feedback>(f => f.Id, f => f.Opinion);
                _db.FeedbackItems.Add(feedback);
                _db.SaveChanges();
                return HttpStatusCode.OK;
            };
        }
    }
}