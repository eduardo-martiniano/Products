
using System;
using ProductApi.Domain.Models;

namespace ProductApi.Infra.RabbitMQ.Payloads
{
    public class PaymentPublishedPayload
    {
        public Guid BuyId { get; set; }
        public double Amount { get; set; }
        public Card Card { get; set; }
    }
}