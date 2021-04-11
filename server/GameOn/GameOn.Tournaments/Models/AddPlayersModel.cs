namespace GameOn.Models
{
    /// <summary>
    /// Accepts an `AddPlayersModel` with three optional properties: `playerId` (a string), `playerIds` (an array of strings) or `addMe` (a boolean). At least one of these properties must be set. Any combination is accepted.
    /// </summary>
    public class AddPlayersModel
    {
        public string[] PlayerIds { get; set; }
        
        public string PlayerId { get; set; }
        
        public bool AddMe { get; set; }
    }
}
