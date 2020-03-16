using sistema_recados.Services.Implementations;
using sistema_recados.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Factories
{
    public class ServiceFactory
    {
        public static IMessageService CreateMessageService() 
        {
            return new MessageService();
        }
    }
}
