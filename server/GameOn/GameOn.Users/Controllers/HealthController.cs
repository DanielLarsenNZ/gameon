using Microsoft.AspNetCore.Mvc;

namespace GameOn.Users.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get() => Ok();
    }
}
