using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using sistema_recados.Domain;
using sistema_recados.Repositories.Implementations;
using sistema_recados.Repositories.Interfaces;
using sistema_recados.Services.Interfaces;
using sistema_recados.Services.Validations;
using sistema_recados.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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
            _repository.Delete(x => x.id.Equals(id));
        }

        public List<Message> GetList()
        {
            return _repository.GetList(x => true);
        }

        private MessageService SetDefaultInformations(Message data) 
        {
            data.id = GetLastId() + 1;
            if (data.Date == null || data.Date.Equals(DateTime.MinValue)) data.Date = DateTime.UtcNow.ToLocalTime();
            return this;
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

            var messages = SetDefaultInformations(data)
                           .GetMessagesRelated(data);

            RegisterOrAddAsRelatedMessage(messages, data);

            return new JsonResult(new 
            { 
                data = data,
                message = "OK"
            });
        }

        private List<Message> GetMessagesRelated(Message data) 
        {
            var filterBuilder = Builders<Message>.Filter;
            var finalFilter = filterBuilder.Eq(x => x.Sender, data.Sender) |
                              filterBuilder.Eq(x => x.Receiver, data.Sender);

            var messages = _repository.GetList(finalFilter);
            return messages.Where(x => (UtilDate.GetMothFromDate(x.Date) - UtilDate.GetMothFromDate(data.Date)) <= MessageValidation.HALFYEAF)
                           .Where(x => x.Subject
                                        .ToUpper()
                                        .Replace("REFERENTE: ", string.Empty)
                                        .Equals(data.Subject
                                                    .ToUpper()
                                                    .Replace("REFERENTE: ", string.Empty)) ||
                                       x.Subject
                                        .ToUpper()
                                        .Replace("RESPONDENDO: ", string.Empty)
                                        .Equals(data.Subject
                                                    .ToUpper()
                                                    .Replace("RESPONDENDO: ", string.Empty)) ||
                                       x.Subject
                                        .ToUpper()
                                        .Replace("COMPLEMENTANDO: ", string.Empty)
                                        .Equals(data.Subject
                                                    .ToUpper()
                                                    .Replace("COMPLEMENTANDO: ", string.Empty)))
                           .ToList();
        }

        private void RegisterOrAddAsRelatedMessage(List<Message> databaseMessages, Message currentMessage) 
        {
            if (databaseMessages.Any())
            {
                databaseMessages.ForEach((message) =>
                {
                    message.RelatedMessages.Add(new MessageRelated()
                    {
                        id = currentMessage.id,
                        Date = currentMessage.Date,
                        Receiver = currentMessage.Receiver,
                        Sender = currentMessage.Sender,
                        Subject = currentMessage.Subject,
                        Text = currentMessage.Text
                    });
                    _repository.Update(x => x.id.Equals(message.id), message);
                });
                return;
            }
            _repository.Register(currentMessage);
        }

        public JsonResult Update(Message data)
        {
            _repository.Update(x => x.id.Equals(data.id), data);
            return new JsonResult(new 
            { 
                data = data,
                message = "UPDATED"
            });
        }
    }
}
