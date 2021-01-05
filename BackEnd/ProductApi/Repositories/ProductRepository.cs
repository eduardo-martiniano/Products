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
        public Product Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public Product Get(int id)
        {
            return _context.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public List<Product> Get()
        {
            return _context.Products.ToList();
        }

        public void Remove(int id)
        {
            var product = Get(id);
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public Product Update(int id, Product product)
        {
            var _product = Get(id);
            _product.Name = product.Name;
            _product.Price = product.Price;
            _product.Image = product.Image;
            _context.SaveChanges();
            return _product;
        }
    }
}
