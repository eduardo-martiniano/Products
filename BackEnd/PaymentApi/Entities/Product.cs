using System;
using MongoDB.Bson.Serialization.Attributes;

namespace PaymentApi.Entities
{
    public class Product
    {
        [BsonElement("_id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }
}