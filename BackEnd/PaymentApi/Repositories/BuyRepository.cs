using System;
using System.Threading.Tasks;
using MongoDB.Driver;
using PaymentApi.Contracts;
using PaymentApi.Database;
using PaymentApi.Entities;

namespace PaymentApi.Repositories
{
    public class BuyRepository : IBuyRepository
    {
        private readonly Context _context;

        public BuyRepository(Context context)
        {
            _context = context;
        }

        public async Task<Buy> GetBuyById(Guid id)
        {
            return await _context.Buys.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateBuy(Buy buy)
        {
            await _context.Buys.ReplaceOneAsync(b => b.Id == buy.Id, buy);
        }
    }
}