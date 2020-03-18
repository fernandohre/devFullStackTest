using FluentValidation;
using sistema_recados.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Services.Validations
{
    public class MessageValidation : Validation<Message>
    {
        public const int HALFYEAF = 6;
        public override void SignRulesForDeletation()
        {
            SignRulesFieldsRequired();
        }

        public override void SignRulesForRegistration()
        {
            SignRulesFieldsRequired();
        }

        public override void SignRulesForUpdate()
        {
            SignRulesFieldsRequired();
        }

        protected override void SignRulesFieldsRequired()
        {
            RuleFor(x => x)
                .Must(data => !string.IsNullOrWhiteSpace(data.Sender) &&
                              !string.IsNullOrWhiteSpace(data.Receiver) &&
                              !string.IsNullOrWhiteSpace(data.Text))
                .WithMessage("O remetente, destinatário e o texto do recado são obrigatórios.");
        }
    }
}
