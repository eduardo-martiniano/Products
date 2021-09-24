using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson.Serialization.Attributes;

namespace PaymentApi.Entities
{
    public class Buy
    {
        [BsonElement("_id")]
        public Guid Id { get; set; }
        public bool Paid { get; set; }
        public IList<Product> Products { get; set; }
        public Object Address { get; set; }
    }
}