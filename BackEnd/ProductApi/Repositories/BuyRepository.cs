using System.Threading.Tasks;
using ProductApi.Contracts;
using ProductApi.Data;
using ProductApi.Entities;

namespace ProductApi.Repositories
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