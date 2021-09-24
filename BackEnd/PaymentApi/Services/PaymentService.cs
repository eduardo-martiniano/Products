using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using PaymentApi.Contracts;
using PaymentApi.Entities;
using PaymentApi.RabbitMQ.Payloads;

namespace PaymentApi.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBuyRepository _buyRepository;

        public PaymentService(IBuyRepository buyRepository)
        {
            _buyRepository = buyRepository;
        }

        public async Task<Buy> GetBuy(Guid buyId)
        {
            return await _buyRepository.GetBuyById(buyId);
        }

        public PaymentProcessedPayload ProcessPayment(double amount, string buyId, CardPayload card)
        {
            Thread.Sleep(5000); // faz de conta que esse é o tempo de processar a transação em um gateway de pagamento
            var result = new PaymentProcessedPayload
            {
                BuyId = buyId,
                Amount = amount,
                Payd = PaymentAccepted()
            };

            return result;
        }

        public async Task<PaymentProcessedPayload> ProcessPaymentAgain(Buy buy, CardPayload card)
        {
            var _buy = await _buyRepository.GetBuyById(buy.Id);
            Thread.Sleep(5000);
            _buy.Paid = PaymentAccepted();
            await _buyRepository.UpdateBuy(_buy);

            return new PaymentProcessedPayload
            {
                BuyId = _buy.Id.ToString(),
                Amount = _buy.Products.Select(p => p.Price).Sum(),
                Payd = _buy.Paid
            };
        }

        private bool PaymentAccepted()
        {
            return new Random().Next() % 2 == 0;
        }
    }
}