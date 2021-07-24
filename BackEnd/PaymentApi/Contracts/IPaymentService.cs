using PaymentApi.RabbitMQ.Payloads;

namespace PaymentApi.Contracts
{
    public interface IPaymentService
    {
        PaymentProcessedPayload ProcessPayment(double amount, string buyId, CardPayload card);
    }
}