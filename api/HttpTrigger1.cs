using System;
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
	public static class GetTasks
	{
		[FunctionName("GetHistory")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "history")] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<LogRow>("log");
			var documents = await collection.Aggregate<LogRow>().ToListAsync();


			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}

	public static class GetDescriptions
	{

		[FunctionName("GetTasks")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks")] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<TealFire.HomeBattle.Models.Task>("descriptions");
			var documents = await collection.Aggregate<TealFire.HomeBattle.Models.Task>().ToListAsync();


			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}
}
