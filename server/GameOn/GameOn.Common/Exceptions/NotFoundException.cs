namespace GameOn.Exceptions
{
    public class NotFoundException : GameOnException
    {
        public NotFoundException(string message) : base(message) { }
    }
}
