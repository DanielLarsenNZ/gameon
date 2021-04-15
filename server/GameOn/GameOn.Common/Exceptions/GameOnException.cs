using System;

namespace GameOn.Exceptions
{
    public abstract class GameOnException : Exception
    {
        public GameOnException(string message) : base(message) { }
    }
}
