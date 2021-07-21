using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProductApi.Config;
using ProductApi.Entities;

namespace ProductApi.Data
{
    public class Context
    {
        private readonly IMongoDatabase _mongoDatabase;
        public Context(IOptions<ConfigDB> opcoes)
        {
            var mongoCliente = new MongoClient(opcoes.Value.ConnectionString);

            if (mongoCliente != null)
            {
                _mongoDatabase = mongoCliente.GetDatabase(opcoes.Value.Database);
            }
        }

        public IMongoCollection<Product> Products => _mongoDatabase.GetCollection<Product>("Products");
    }
}
