using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Utils
{
    public static class UtilDate
    {
        public static int GetMothFromDate(DateTime date) 
        { 
            return date.Year * 12 + date.Month;
        }
    }
}
