using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sistema_recados.Domain;
using sistema_recados.Services.Implementations;
using sistema_recados.Services.Interfaces;

namespace sistema_recados.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessagesController : DefaultApiController<Message, IMessageService>
    {
        protected override IMessageService Service()
        {
            return new MessageService();
        }
        [HttpPost]
        public JsonResult Register([FromBody] Message data) 
        {
            return ExecuteAction(() =>
            {
                return Service().Register(data);
            });
        }
        [HttpGet]
        public JsonResult Get() 
        {
            return ExecuteAction(() => 
            {
                return new JsonResult(new 
                { 
                    data = Service().GetList()
                });
            });
        }
    }
}