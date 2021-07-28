using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using ProductApi.Infra.Hubs;
using ProductApi.Infra.RabbitMQ.Payloads;

namespace ProductApi.Infra.HostedServices
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
