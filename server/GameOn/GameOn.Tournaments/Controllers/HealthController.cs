using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get() => Ok();
    }
}
