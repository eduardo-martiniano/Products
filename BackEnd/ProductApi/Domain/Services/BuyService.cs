using System.Threading.Tasks;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Contracts.Services;
using ProductApi.Domain.Entities;
using ProductApi.Domain.Models.ViewModels;
using ProductApi.Infra.RabbitMQ;
using ProductApi.Infra.RabbitMQ.Payloads;

namespace ProductApi.Domain.Services
{
    public class BuyService : IBuyService
    {
        
        private readonly IBuyRepository _buyRepository;
        private readonly EventBus _eventBus;

        public BuyService(IBuyRepository buyRepository, EventBus eventBus)
        {
            _buyRepository = buyRepository;
            _eventBus = eventBus;
        }

        public async Task<Buy> Process(BuyViewModel model)
        {
            await _buyRepository.Save(model.Buy);

            var payload = MapPayload(model);
            _eventBus.PublishEvent(payload, "buys");

            return model.Buy;
        }

        private PaymentPublishedPayload MapPayload(BuyViewModel model)
        {
            var payload = new  PaymentPublishedPayload 
            {
                BuyId = model.Buy.Id,
                Amount = model.Buy.Amount,
                Card = model.Card
            };

            return payload;
        }

    }
}