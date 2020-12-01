using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapr;
using Dapr.Client;
using GameOn.Models;
using Microsoft.AspNetCore.Mvc;

namespace GameOn.Tournaments.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TournamentsController : ControllerBase
    {
        const string StoreName = "GameOn";  //TODO: Config?

        // GET: api/<TournamentsController>
        [HttpGet]
        public ActionResult<IEnumerable<Tournament>> Get([FromState(StoreName)] Tournament[] tournaments)
        {
            if (tournaments is null) return NotFound();
            return tournaments;
        }

        // GET api/<TournamentsController>/5
        [HttpGet("{id}")]
        public ActionResult<Tournament> Get([FromState(StoreName)] Tournament tournament)
        {
            if (tournament is null) return NotFound();
            return tournament;
        }

        // POST api/<TournamentsController>
        [HttpPost]
        public async Task<ActionResult<Tournament>> Post(Tournament tournament, [FromServices] DaprClient dapr)
        {
            var entry = new StateEntry<Tournament>(dapr, StoreName, tournament.Id, tournament, tournament.ETag);
            await entry.SaveAsync();
            return Ok();
        }

        // PUT api/<TournamentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TournamentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
