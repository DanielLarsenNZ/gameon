using GameOn.Exceptions;
using System;

namespace GameOn.Models
{
    public abstract class GameOnModel
    {
        public virtual string Id { get; set; }

        public virtual void EnforceInvariants()
        {
            EnforcePropertyNotSetInvariant(Id, nameof(Id));
        }

        protected void EnforcePropertyNotSetInvariant(string property, string nameofProperty)
        {
            if (string.IsNullOrEmpty(property)) throw new PropertyNotSetInvariantException(nameofProperty);
        }

        protected void EnforcePropertyNotSetInvariant(DateTimeOffset? property, string nameofProperty)
        {
            if (!property.HasValue) throw new PropertyNotSetInvariantException(nameofProperty);
        }
    }
}
