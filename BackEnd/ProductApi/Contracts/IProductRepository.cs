using ProductApi.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductApi.Contracts
{
    public interface IProductRepository
    {
        Task<Product> Add(Product product);
        Task<Product> Update(Guid id, Product product);
        Task<Product> Get(Guid id);
        Task<List<Product>> GetByName(string name);
        Task<List<Product>> Get();
        Task Remove(Guid id);
    }
}
