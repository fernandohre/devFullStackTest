using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace sistema_recados.Repositories.Interfaces
{
    public interface IDefaultRepository<T>
    {
        /// <summary>
        /// Retorna a coleção do conceito genérico.
        /// </summary>
        /// <returns>Retorna a coleção do conceito.</returns>
        IMongoCollection<T> Collection();

        /// <summary>
        /// Cadastra um objeto de tipo genérico.
        /// </summary>
        /// <param name="data">Objeto a ser cadastrado.</param>
        void Register(T data);

        /// <summary>
        /// Atualiza um objeto genérico no banco.
        /// </summary>
        /// <param name="condition">Condição para atualização.</param>
        /// <param name="data">Objeto a ser atualizado.</param>
        void Update(Expression<Func<T, bool>> condition, T data);

        /// <summary>
        /// Exclua todos os objetos que atendem determinada condição.
        /// </summary>
        /// <param name="condition">Filtro que indica qual será excluído.</param>
        void Delete(Expression<Func<T, bool>> condition);
        /// <summary>
        /// Consulta todos os objetos que obedecem uma condição.
        /// </summary>
        /// <param name="condicao">Filtro que indica qual será excluído.</param>
        /// <returns>Retorna uma coleção de objetos genéricos.</returns>
        List<T> GetList(Expression<Func<T, bool>> condition);

        List<T> GetList(Expression<Func<T, bool>>[] filter);

        List<T> GetList(FilterDefinition<T> filter);
    }
}
