using System;
using ProductApi.Entities;

namespace ProductApi.RabbitMQ.Payloads
{
    public class PaymentPublishedPayload
    {
        public Guid BuyId { get; set; }
        public double Amount { get; set; }
        public Card Card { get; set; }
    }
}