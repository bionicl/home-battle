using System;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TealFire.HomeBattle.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Collections.Generic;

namespace TealFire.HomeBattle
{
	public static class GetHistory
	{
		[FunctionName("GetHistory")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "history")] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<LogRow>("log");
			var documents = await collection.Aggregate<LogRow>().SortByDescending(e => e.date).ToListAsync();


			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}

	public static class CreateHistoryRow
	{
		class HistoryRowPartial
		{
			public string date;
			public string who;
			public string description;
			public int count;
			public string notes;

			// [BsonExtraElements]
			// public object[] Bucket;
		}

		[FunctionName("CreateHistoryRow")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "history")] HttpRequest req,
				ILogger log)
		{
			var context = JsonConvert.DeserializeObject<HistoryRowPartial>(await req.ReadAsStringAsync());

			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<TealFire.HomeBattle.Models.LogRow>("log");

			var document = new TealFire.HomeBattle.Models.LogRow
			{
				date = context.date,
				who = context.who,
				description = context.description,
				count = context.count,
				notes = context.notes
			};

			collection.InsertOne(document);
			var documents = await collection.Aggregate<TealFire.HomeBattle.Models.LogRow>().SortByDescending(e => e.date).ToListAsync();
			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}

	public static class RemoveHistoryRow
	{

		[FunctionName("RemoveHistoryRow")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "history/{id}")] HttpRequest req,
				string id, ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<TealFire.HomeBattle.Models.LogRow>("log");
			collection.DeleteOne("{ _id: \"" + id + "\" }");
			var documents = await collection.Aggregate<TealFire.HomeBattle.Models.LogRow>().SortByDescending(e => e.date).ToListAsync();
			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}
}
