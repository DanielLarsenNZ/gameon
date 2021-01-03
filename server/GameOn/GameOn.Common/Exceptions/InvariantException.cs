using System;

namespace GameOn.Common.Exceptions
{
    public class InvariantException : Exception
    {
        public InvariantException(string message) : base(message) { }
    }
}
