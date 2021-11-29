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
            return new JsonResult(new 
            { 
                UserClaimsName = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value, 
                ProcessId = System.Diagnostics.Process.GetCurrentProcess().Id 
            });
        }
    }
}
