using System;
using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace ProductApi.Infra.RabbitMQ
{
    public class EventBus
    {
        private readonly ConnectionFactory _factory;

        public EventBus()
        {
            _factory = new ConnectionFactory
            {
                HostName = "localhost"
            };
        }
        
        public void PublishEvent(Object message, string queueName)
        {
            using (var connection = _factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(
                        queue: queueName,
                        durable: false,
                        exclusive: false,
                        autoDelete: false,
                        arguments: null
                    );

                    var stringfieldMessage = JsonConvert.SerializeObject(message);
                    var bytesMessage = Encoding.UTF8.GetBytes(stringfieldMessage);

                    channel.BasicPublish(
                        exchange: "",
                        routingKey: queueName,
                        basicProperties: null,
                        body: bytesMessage
                    );
                }
            }

        }
    }
}