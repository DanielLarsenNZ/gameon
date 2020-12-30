namespace GameOn.Models
{
    public class Player : User
    {
        public Player()
        {
        }

        public Player(User user, string tournamentId)
        {
            base.GivenName = user.GivenName;
            base.Id = user.Id;
            base.ImageUrl = user.ImageUrl;
            base.Name = user.Name;
            base.ObjectId = user.ObjectId;
            base.Surname = user.Surname;
            base.TenantId = user.TenantId;
            TournamentId = tournamentId;
        }

        public string TournamentId { get; set; }
    }
}
