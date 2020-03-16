using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_recados.Infrastructure
{
    public class DbConnection
    {
        /// <summary>
        /// Representa uma sessão no banco.
        /// </summary>
        public IClientSessionHandle Session { get; set; }
        private DbConfiguration _configuration = new DbConfiguration();

        public DbConnection()
        {
            var client = new MongoClient(_configuration.StringConnection);
            Session = client.StartSession();
        }

        /// <summary>
        /// Cria uma conexão com o banco.
        /// </summary>
        /// <returns></returns>
        public IMongoDatabase ConexaoMongoDB()
        {
            return Session.Client.GetDatabase(_configuration.DatabaseName);
        }

        private class DbConfiguration
        {
            public string StringConnection { get; set; }
            public string DatabaseName { get; set; }

            public DbConfiguration()
            {
                StringConnection = "mongodb+srv://dev:dev@cluster0-5mhok.mongodb.net/test?retryWrites=true&w=majority";
                DatabaseName = "desafiodb";
            }
        }

    }
}
