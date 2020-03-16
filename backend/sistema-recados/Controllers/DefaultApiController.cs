using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using sistema_recados.Services.Interfaces;

namespace sistema_recados.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public abstract class DefaultApiController<TData, TService> : ControllerBase
        where TData: new()
        where TService: IDefaultService<TData>
    {
        protected abstract TService Service();

        protected JsonResult ExecuteAction(Func<JsonResult> action) 
        {
            try
            {
                return action();
            }
            catch (Exception e) 
            {
                return new JsonResult(new 
                { 
                    action = action.Method,
                    message = "Falha ao requisitar este endpoint.",
                    exception = e.Message
                });
            }
            
        }
    }
}