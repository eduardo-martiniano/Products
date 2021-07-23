using ProductApi.Entities;

namespace ProductApi.RabbitMQ.Payloads
{
    public class PaymentPublishedPayload
    {
        public double Amount { get; set; }
        public Card Card { get; set; }
    }
}