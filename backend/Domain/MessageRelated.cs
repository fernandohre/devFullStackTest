using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Domain
{
    public class MessageRelated
    {
        public int id { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
