using System;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ProductApi.Contracts;
using ProductApi.Entities;
using ProductApi.RabbitMQ;
using ProductApi.RabbitMQ.Payloads;
using ProductApi.ViewModels;
using RabbitMQ.Client;

namespace ProductApi.Services
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
                Amount = model.Buy.Amount,
                Card = model.Card
            };

            return payload;
        }

    }
}