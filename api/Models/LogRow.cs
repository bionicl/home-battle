using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TealFire.HomeBattle.Models
{
	[BsonIgnoreExtraElements]
	public class LogRow
	{
		[BsonId]
		public ObjectId Id;
		public string date;
		public string who;
		public string description;
		public int count;
		public string notes;

		// [BsonExtraElements]
		// public object[] Bucket;
	}
}

