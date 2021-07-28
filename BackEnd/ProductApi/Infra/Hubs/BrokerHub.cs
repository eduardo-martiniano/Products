using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ProductApi.Infra.Hubs
{
    public class BrokerHub : Hub
    {
        public Task ConnectToStock(string buyId)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, buyId);

            return Task.CompletedTask;
        }
    }
}