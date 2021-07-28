using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProductApi.Config;
using ProductApi.Domain.Entities;

namespace ProductApi.Infra.Data
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
        public IMongoCollection<Buy> Buys => _mongoDatabase.GetCollection<Buy>("Buys");
        public IMongoCollection<User> Users => _mongoDatabase.GetCollection<User>("Users");
    }
}
