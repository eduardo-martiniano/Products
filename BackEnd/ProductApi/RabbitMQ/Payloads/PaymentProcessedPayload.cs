namespace ProductApi.RabbitMQ.Payloads
{
    public class PaymentProcessedPayload
    {
        public string BuyId { get; set; }
        public double Amount { get; set; }
        public bool Payd { get; set; }
    }
}