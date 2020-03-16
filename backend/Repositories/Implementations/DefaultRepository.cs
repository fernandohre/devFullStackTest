using MongoDB.Driver;
using sistema_recados.CustomAttributes;
using sistema_recados.Infrastructure;
using sistema_recados.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace sistema_recados.Repositories.Implementations
{
    public class DefaultRepository<T> : IDefaultRepository<T>
    {
        private DbConnection _conexao;

        /// <summary>
        /// Acessa a coleção do objeto passado no tipo genérico.
        /// </summary>
        /// <returns>Retorna uma conexão com o banco com a coleção do tipo passado.</returns>
        public IMongoCollection<T> Collection()
        {
            T objeto = Activator.CreateInstance<T>();

            var collection = objeto.GetType().GetCustomAttributes(true)[0] as Collection;

            var conexao = Connection();

            return conexao.ConexaoMongoDB().GetCollection<T>(collection.Name);
        }

        /// <summary>
        /// Atualiza um objeto no banco.
        /// </summary>
        /// <param name="condition">Condição para verificar qual objeto será atualizado.</param>
        /// <param name="data">Objeto atualizado para ser persistido.</param>
        public void Update(Expression<Func<T, bool>> condition, T data)
        {
            ExecuteTransaction(() =>
            {
                Collection().ReplaceOne(condition, data);
            });
        }

        public void Register(T data)
        {
            ExecuteTransaction(() =>
            {
                Collection().InsertOne(data);
            });
        }

        public T SearchOne(Expression<Func<T, bool>> condition)
        {
            return Collection().Find(condition).FirstOrDefault();
        }

        public List<T> Search(Expression<Func<T, bool>> condition)
        {
            return Collection().Find(condition).ToList();
        }

        public List<T> GetList(Expression<Func<T, bool>> condition)
        {

            return Collection().Find(condition).ToList();
        }

        public void Delete(Expression<Func<T, bool>> condition)
        {
            ExecuteTransaction(() =>
            {
                Collection().DeleteOne(condition);
            });
        }

        private void ExecuteTransaction(Action execute)
        {
            Connection().Session.StartTransaction();

            try
            {
                execute.Invoke();
                Connection().Session.CommitTransaction();
            }
            catch (Exception e)
            {
                Connection().Session.AbortTransaction();
                throw new Exception("Ocorreu um erro ao manipular o banco de dados: " + e.Message);
            }
        }

        private DbConnection Connection()
        {
            return _conexao ?? (_conexao = new DbConnection());
        }
    }
}
