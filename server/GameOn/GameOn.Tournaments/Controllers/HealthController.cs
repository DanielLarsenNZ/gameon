using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            if (User.Claims.Any(c => c.Type == "name"))
            {
                return Ok(User.Claims.FirstOrDefault(c => c.Type == "name").Value);
            }

            return Ok();
        }
    }
}
