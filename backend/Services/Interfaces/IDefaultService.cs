﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Services.Interfaces
{
    public interface IDefaultService<TData>
    {
        /// <summary>
        /// Cadastra um objeto de tipo genérico.
        /// </summary>
        /// <param name="data">Objeto a ser cadastrado.</param>
        JsonResult Register(TData data);

        /// <summary>
        /// Atualiza um objeto genérico no banco.
        /// </summary>
        /// <param name="data">Objeto a ser atualizado.</param>
        JsonResult Update(TData data);

        /// <summary>
        /// Exclua todos os objetos que atendem determinada condição.
        /// </summary>
        /// <param name="id">O Id que será usado como filtro.</param>
        void Delete(string id);

        /// <summary>
        /// Consulta todos os objetos que obedecem uma condição.
        /// </summary>
        /// <returns>Retorna uma coleção de objetos genéricos.</returns>
        List<TData> GetList();
    }
}
