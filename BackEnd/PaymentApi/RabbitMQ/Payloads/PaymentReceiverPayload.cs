namespace PaymentApi.RabbitMQ.Payloads
{
    public class PaymentReceiverPayload
    {
        public double Amount { get; set; }
        public CardPayload Card { get; set; }
    }

    public class CardPayload 
    {
        public string Number { get; set; }
        public string Cvv { get; set; }
        public string name { get; set; }
        public string dateValidate { get; set; }
    }
}