using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProductApi.Config;
using ProductApi.Contracts;
using ProductApi.Data;
using ProductApi.HostedServices;
using ProductApi.Hubs;
using ProductApi.RabbitMQ;
using ProductApi.Repositories;
using ProductApi.Services;

namespace ProductApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddSingleton<UpdateStockPriceHostedService>();

             services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicyForDashboard", builder => 
                        builder
                            .WithOrigins("http://localhost:4200", "http://localhost:4200/products", "http://localhost:4200/checkout")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials());
                });

            services.AddSwaggerGen();

            services.Configure<ConfigDB>(op => 
            {
                op.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                op.Database = Configuration.GetSection("MongoConnection:Database").Value;
            });

            services.AddControllers()
                    .AddNewtonsoftJson(op =>
                    op.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            
            services.Configure<RabbitMqConfiguration>(Configuration.GetSection("RabbitMqConfig"));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBuyRepository, BuyRepository>();
            services.AddScoped<IBuyService, BuyService>();
            services.AddScoped<Context>();
            services.AddSingleton<EventBus>();
            services.AddHostedService<ProcessMessageConsumer>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseCors(x => x
            // .AllowAnyOrigin()
            // .AllowAnyMethod()
            // .AllowAnyHeader());

            app.UseCors("CorsPolicyForDashboard");

             app.UseSignalR(route => 
            {
                route.MapHub<BrokerHub>("/brokerhub");
            });

            // app.UseHttpsRedirection(); 

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSwagger();

            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger(c =>
            {
                c.SerializeAsV2 = true;
            });
        }
    }
}
