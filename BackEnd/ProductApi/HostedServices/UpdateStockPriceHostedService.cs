using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using ProductApi.Hubs;
using ProductApi.RabbitMQ.Payloads;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ProductApi.HostedServices
{
    public class UpdateStockPriceHostedService 
    {
        private Timer _timer;
        public IServiceProvider Services { get; }

        public UpdateStockPriceHostedService(IServiceProvider services)
        {
            Services = services;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public void UpdatePrices(PaymentProcessedPayload buy)
        {
            using (var scope = Services.CreateScope())
            {
                var hubContext = scope.ServiceProvider.GetRequiredService<IHubContext<BrokerHub>>();
                hubContext.Clients.Group(buy.BuyId).SendAsync("UpdatePrice", buy);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        private double GetRandomNumber(double minimum, double maximum)
        {
            var random = new Random();
            return random.NextDouble() * (maximum - minimum) + minimum;
        }
        
    }
}
