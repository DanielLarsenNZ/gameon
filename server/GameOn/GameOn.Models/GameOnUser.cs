using System;
using System.Collections.Generic;
using System.Text;

namespace GameOn.Models
{
    public class GameOnUser
    {
        public string ObjectId { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Upn { get; set; }
    }
}
