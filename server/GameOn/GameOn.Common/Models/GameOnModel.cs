using GameOn.Common.Exceptions;

namespace GameOn.Models
{
    public abstract class GameOnModel
    {
        public string Id { get; set; }

        public virtual void EnforceInvariants()
        {
            EnforcePropertyNotSetInvariant(Id, nameof(Id));
        }

        protected void EnforcePropertyNotSetInvariant(string property, string nameofProperty)
        {
            if (string.IsNullOrEmpty(property)) throw new PropertyNotSetInvariantException(nameof(nameofProperty));
        }
    }
}
