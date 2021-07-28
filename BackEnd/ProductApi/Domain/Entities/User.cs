using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductApi.Domain.Entities
{
    public class User
    {
        [BsonElement("_id")]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}