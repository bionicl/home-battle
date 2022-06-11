using Newtonsoft.Json;
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TealFire.HomeBattle.Models
{
	public class Task
	{
		[BsonId]
		public ObjectId Id;
		public string key;
		public string name;
		public double weight;
	}
}

