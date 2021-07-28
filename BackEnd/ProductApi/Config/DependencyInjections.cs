using Microsoft.Extensions.DependencyInjection;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Contracts.Services;
using ProductApi.Domain.Services;
using ProductApi.Infra.Data;
using ProductApi.Infra.HostedServices;
using ProductApi.Infra.RabbitMQ;
using ProductApi.Infra.RabbitMQ.Repositories;

namespace ProductApi.Config
{
    public static class DependencyInjections
    {
        public static void AddDependencyInjections(this IServiceCollection services)
        {
            // Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBuyService, BuyService>();
            services.AddSingleton<EventBus>();
            services.AddScoped<Context>();
            services.AddHostedService<ProcessMessageConsumer>();
            services.AddSingleton<UpdateStockPriceHostedService>();
            
            // Repositories
            services.AddScoped<IBuyRepository, BuyRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            
        }
    }
}