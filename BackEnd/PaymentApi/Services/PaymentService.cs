using System.Threading;
using PaymentApi.Contracts;
using PaymentApi.RabbitMQ.Payloads;

namespace PaymentApi.Services
{
    public class PaymentService : IPaymentService
    {
        public PaymentProcessedPayload ProcessPayment(double amount, string buyId, CardPayload card)
        {
            Thread.Sleep(10000); // faz de conta que esse é o tempo de processar a transação em um gateway de pagamento
            var result = new PaymentProcessedPayload
            {
                BuyId = buyId,
                Amount = amount,
                Payd = false
            };

            return result;
        }
    }
}