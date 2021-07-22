using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductApi.Entities
{
    public class Buy
    {
        [BsonElement("_id")]
        public Guid Id { get; set; }
        public bool Paid { get; set; }
        public List<Product> Products { get; set; }
        public Address Address { get; set; }
        public double Amount => Products.Select(p => p.Price).Sum();
    }
}