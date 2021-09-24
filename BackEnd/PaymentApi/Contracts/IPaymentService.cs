using System;
using System.Threading.Tasks;
using PaymentApi.Entities;
using PaymentApi.RabbitMQ.Payloads;

namespace PaymentApi.Contracts
{
    public interface IPaymentService
    {
        PaymentProcessedPayload ProcessPayment(double amount, string buyId, CardPayload card);
        Task<Buy> GetBuy(Guid buyId);
        Task<PaymentProcessedPayload> ProcessPaymentAgain(Buy buy, CardPayload card);
    }
}