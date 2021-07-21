using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ProductApi.Contracts;
using ProductApi.Data;
using ProductApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly Context _context;

        public ProductRepository(Context context)
        {
            _context = context;
        }
        public async Task<Product> Add(Product product)
        {
            await _context.Products.InsertOneAsync(product);
            return product;
        }

        public async Task<Product> Get(Guid id)
        {
            return await _context.Products.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Product>> Get()
        {
            return await _context.Products.Find(p => true).ToListAsync();
        }

        public async Task<List<Product>> GetByName(string name)
        {
            return await _context.Products.Find(p => p.Name.ToLower()
                                          .Contains(name.ToLower()))
                                          .ToListAsync();
        }

        public async Task Remove(Guid id)
        {
            await _context.Products.DeleteOneAsync(p => p.Id == id);
        }

        public async Task<Product> Update(Guid id, Product product)
        {
            product.Id = id;
            await _context.Products.ReplaceOneAsync(p => p.Id == id, product);
            return product;
        }

    }
}
