using System.Collections.Generic;
using System.Threading.Tasks;
using ProductApi.Domain.Entities;

namespace ProductApi.Domain.Contracts.Repositories
{
    public interface IUserRepository
    {
        Task<User> Add(User user);
        Task<IList<User>> GetAll();
        Task<List<User>> GetByUsername(string userName);
    }
}