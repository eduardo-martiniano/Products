using Microsoft.EntityFrameworkCore;
using ProductApi.Entities;

namespace ProductApi.Data
{
    public class Context : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public Context (DbContextOptions<Context> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
