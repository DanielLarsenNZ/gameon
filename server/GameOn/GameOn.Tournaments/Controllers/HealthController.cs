using Microsoft.AspNetCore.Mvc;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get() => Ok();
    }
}
