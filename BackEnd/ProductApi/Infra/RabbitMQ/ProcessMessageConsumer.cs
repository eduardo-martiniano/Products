using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProductApi.Infra.HostedServices;
using ProductApi.Infra.RabbitMQ.Payloads;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ProductApi.Infra.RabbitMQ
{
    public class ProcessMessageConsumer : BackgroundService
    {
        private readonly RabbitMqConfiguration _configuration;
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly EventBus _eventBus;
        private readonly UpdateStockPriceHostedService _updateStockPriceHostedService;

        public ProcessMessageConsumer(IOptions<RabbitMqConfiguration> option, EventBus eventBus, UpdateStockPriceHostedService updateStockPriceHostedService)
        {
            _updateStockPriceHostedService = updateStockPriceHostedService;
            _eventBus = eventBus;
            _configuration = option.Value;
            var factory = new ConnectionFactory
            {
                HostName = _configuration.Host
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(
                queue: _configuration.Queue,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += (sender, eventArgs) => 
            {
                var contentArray = eventArgs.Body.ToArray();
                var contentString = Encoding.UTF8.GetString(contentArray);
                var message = JsonConvert.DeserializeObject<PaymentProcessedPayload>(contentString);
                _updateStockPriceHostedService.UpdatePrices(message);

                _channel.BasicAck(eventArgs.DeliveryTag, false);
            };

            _channel.BasicConsume(_configuration.Queue, false, consumer);

            return Task.CompletedTask;
        }
    }
}       