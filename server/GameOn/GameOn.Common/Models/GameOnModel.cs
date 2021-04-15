using GameOn.Exceptions;

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
    }
}
