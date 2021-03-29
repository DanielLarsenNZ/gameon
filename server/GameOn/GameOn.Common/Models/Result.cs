using GameOn.Common.Exceptions;
using GameOn.Models;
using System;
using System.Collections.Generic;
using System.Text;

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
                throw new InvariantException("WinnerId must be either Player1 or Player2");
        }
    }
}
