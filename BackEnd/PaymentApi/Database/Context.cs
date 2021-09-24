using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PaymentApi.Entities;

namespace PaymentApi.Database
{
    public class Context 
    {
        private readonly IMongoDatabase _mongoDatabase;

        public Context(IOptions<ConfigDB> options)
        {
            var mongoCliente = new MongoClient(options.Value.ConnectionString);

            if (mongoCliente != null)
            {
                _mongoDatabase = mongoCliente.GetDatabase(options.Value.Database);
            }
        }

        public IMongoCollection<Product> Products => _mongoDatabase.GetCollection<Product>("Products");
        public IMongoCollection<Buy> Buys => _mongoDatabase.GetCollection<Buy>("Buys");
    }
}