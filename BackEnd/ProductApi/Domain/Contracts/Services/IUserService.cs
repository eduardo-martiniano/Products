using System.Threading.Tasks;
using ProductApi.Domain.Entities;

namespace ProductApi.Domain.Contracts.Services
{
    public interface IUserService
    {
        Task<User> GetByCredentials(string userName, string password);
        Task CreateUser(User user);
        string GenerateToken(User user);
    }
}