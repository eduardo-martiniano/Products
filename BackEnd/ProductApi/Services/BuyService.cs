using System.Threading.Tasks;
using ProductApi.Contracts;
using ProductApi.Entities;
using ProductApi.ViewModels;

namespace ProductApi.Services
{
    public class BuyService : IBuyService
    {
        private readonly IBuyRepository _buyRepository;

        public BuyService(IBuyRepository buyRepository)
        {
            _buyRepository = buyRepository;
        }
        public async Task<Buy> Process(BuyViewModel model)
        {
            model.Buy.Paid = true;
            var buy = model.Buy;
            await _buyRepository.Save(buy);

            return buy;
        }
    }
}