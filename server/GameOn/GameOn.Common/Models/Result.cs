using GameOn.Exceptions;
using System;

namespace GameOn.Models
{
    public class Result : GameOnModel
    {
        public string Player1Id { get; set; }

        public string Player2Id { get; set; }

        public string WinnerId { get; set; }

        public string Comment { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public override void EnforceInvariants()
        {
            base.EnforceInvariants();

            EnforcePropertyNotSetInvariant(Player1Id, nameof(Player1Id));
            EnforcePropertyNotSetInvariant(Player2Id, nameof(Player2Id));
            EnforcePropertyNotSetInvariant(WinnerId, nameof(WinnerId));

            if (WinnerId != Player1Id || WinnerId != Player2Id)
                throw new InvariantException("WinnerId must be either Player1Id or Player2Id");

            if (Player1Id == Player2Id) throw new InvariantException("Player1Id and Player2Id cannot be the same Player");
        }
    }
}
