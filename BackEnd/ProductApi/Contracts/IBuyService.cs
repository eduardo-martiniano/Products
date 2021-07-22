using System.Threading.Tasks;
using ProductApi.Entities;
using ProductApi.ViewModels;

namespace ProductApi.Contracts
{
    public interface IBuyService
    {
        Task<Buy> Process(BuyViewModel model);
    }
}