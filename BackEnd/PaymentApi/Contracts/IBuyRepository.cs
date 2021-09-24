using System;
using System.Threading.Tasks;
using PaymentApi.Entities;

namespace PaymentApi.Contracts
{
    public interface IBuyRepository
    {
         Task<Buy> GetBuyById(Guid id);
         Task UpdateBuy(Buy buy);
    }
}