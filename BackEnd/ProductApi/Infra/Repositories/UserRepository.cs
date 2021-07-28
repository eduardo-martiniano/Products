using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using ProductApi.Domain.Contracts.Repositories;
using ProductApi.Domain.Entities;
using ProductApi.Infra.Data;

namespace ProductApi.Infra.RabbitMQ.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Context _context;

        public UserRepository(Context context)
        {
            _context = context;
        }

        public async Task<User> Add(User user)
        {
            await _context.Users.InsertOneAsync(user);
            return user;
        }

        public Task<IList<User>> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<User>> GetByUsername(string userName)
        {
            return await _context.Users.Find(u => u.Username == userName).ToListAsync();
        }
    }
}