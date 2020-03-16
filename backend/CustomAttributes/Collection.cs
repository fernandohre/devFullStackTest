using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.CustomAttributes
{
    public class Collection : Attribute
    {
        public string Name { get; set; }
        public Collection(string name) 
        {
            Name = name;
        }
    }
}
