using ProductApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductApi.Contracts
{
    public interface IProductRepository
    {
        Product Add(Product product);
        Product Update(int id, Product product);
        Product Get(int id);
        List<Product> GetByName(string name);
        List<Product> Get();
        void Remove(int id);
    }
}
