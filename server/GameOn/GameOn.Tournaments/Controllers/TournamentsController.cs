using Dapr;
using Dapr.Client;
using GameOn.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        const string StoreName = "statestore";  //TODO: Config?

        // GET all tournaments
        [HttpGet]
        [HttpGet("{tenantId}")]
        public ActionResult<IEnumerable<Tournament>> Get(
            [FromState(StoreName, "tenantId")] StateEntry<Tournament[]> entry,
            string tenantId)
        {
            if (entry.Value is null) return NotFound($"Tenant Id {tenantId} is not found");
            return entry.Value;
        }

        // Get tournament
        [HttpGet("{tenantId}/{tournamentId}")]
        public ActionResult<Tournament> Get(
            [FromState(StoreName, "tenantId")] StateEntry<Tournament[]> entry,
            string tenantId,
            string tournamentId)
        {
            if (entry.Value is null) return NotFound($"Tenant Id {tenantId} is not found");
            var tournament = entry.Value.FirstOrDefault(t => t.Id == tournamentId);
            if (tournament is null) return NotFound($"Tournament Id {tournamentId} is not found");
            return tournament;
        }

        // POST 
        [HttpPost("{tenantId}")]
        public async Task<ActionResult<Tournament>> Post(
            [FromServices] DaprClient dapr,
            Tournament tournament,
            string tenantId)
        {
            var entry = await dapr.GetStateEntryAsync<Tournament[]>(StoreName, tenantId);

            if (entry.Value is null)
            {
                entry.Value = new[] { tournament };
            }

            var tournaments = entry.Value.ToList();
            if (tournaments.Any(t => t.Id == tournament.Id)) return new ConflictResult();

            tournaments.Add(tournament);
            entry.Value = tournaments.ToArray();

            await entry.SaveAsync();
            return new CreatedResult($"{Request.GetEncodedUrl()}/{tournament.Id}", tournament);
        }
    }
}
