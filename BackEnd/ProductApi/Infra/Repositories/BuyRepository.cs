using System.Threading.Tasks;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Entities;
using ProductApi.Infra.Data;

namespace ProductApi.Infra.RabbitMQ.Repositories
{
    public class BuyRepository : IBuyRepository
    {
        private readonly Context _context;

        public BuyRepository(Context context)
        {
            _context = context;
        }
        public async Task<Buy> Save(Buy buy)
        {
            await _context.Buys.InsertOneAsync(buy);
            return buy;
        }
    }
}