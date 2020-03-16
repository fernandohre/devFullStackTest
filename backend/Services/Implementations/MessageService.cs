using Microsoft.AspNetCore.Mvc;
using sistema_recados.Domain;
using sistema_recados.Repositories.Implementations;
using sistema_recados.Repositories.Interfaces;
using sistema_recados.Services.Interfaces;
using sistema_recados.Services.Validations;
using System;
using System.Collections.Generic;
namespace sistema_recados.Services.Implementations
{
    public class MessageService : IMessageService
    {
        private IDefaultRepository<Message> _repository = new DefaultRepository<Message>();
        private Validation<Message> _validador = new MessageValidation();

        private int GetLastId() 
        {
            return GetList().Count;
        }
        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public List<Message> GetList()
        {
            return _repository.GetList(x => true);
        }

        public JsonResult Register(Message data)
        {
            if (!_validador.IsValid(data)) 
            {
                return new JsonResult(new
                {
                    data = data,
                    message = _validador.GetInconsistencies()
                });
            }

            data.id = GetLastId() + 1;
            data.Date = DateTime.UtcNow.ToLocalTime();
            _repository.Register(data);


            return new JsonResult(new 
            { 
                data = data,
                message = "OK"
            });
        }

        public Message Search(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(Message data)
        {
            throw new NotImplementedException();
        }
    }
}
