using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Services.Validations
{
    public abstract class Validation<T> : AbstractValidator<T>
    {
        private List<string> _inconsistencies = new List<string>();

        public bool IsValid(T data)
        {
            var result = Validate(data);
            if (!result.IsValid)
            {
                foreach (var erro in result.Errors)
                    _inconsistencies.Add(erro.ErrorMessage);
                return false;
            }
            return true;
        }

        public List<string> GetInconsistencies()
        {
            return _inconsistencies;
        }

        protected abstract void SignRulesFieldsRequired();
        public abstract void SignRulesForRegistration();
        public abstract void SignRulesForUpdate();
        public abstract void SignRulesForDeletation();
    }
}
