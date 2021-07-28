using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductApi.Domain.Entities
{
    public class Product
    {
        [BsonElement("_id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Double Price { get; set; }
        public string Image { get; set; }
    }
}
