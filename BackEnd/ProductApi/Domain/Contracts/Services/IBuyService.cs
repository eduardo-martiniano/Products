using System.Threading.Tasks;
using ProductApi.Domain.Entities;
using ProductApi.Domain.Models.ViewModels;

namespace ProductApi.Domain.Contracts.Services
{
    public interface IBuyService
    {
        Task<Buy> Process(BuyViewModel model);
    }
}