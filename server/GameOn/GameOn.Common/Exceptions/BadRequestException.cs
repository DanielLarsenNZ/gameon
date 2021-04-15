namespace GameOn.Exceptions
{
    public class BadRequestException : GameOnException
    {
        public BadRequestException(string message) : base(message)
        { }
    }
}
