namespace GameOn.Common.Exceptions
{
    public class PropertyNotSetInvariantException : InvariantException
    {
        public PropertyNotSetInvariantException(string propertyName) : base($"{propertyName} must be set.")
        { }
    }
}
