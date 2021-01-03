using System;

namespace ProductApi.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Double Price { get; set; }
        public string Image { get; set; }
    }
}
