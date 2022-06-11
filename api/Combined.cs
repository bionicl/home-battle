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
	public static class GetCombined
	{
		[FunctionName("GetCombined")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "combined")] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<LogRow>("log");
			var documents = await collection.Aggregate<LogRow>().ToListAsync();

			var collection2 = database.GetCollection<LogRow>("descriptions");
			var documents2 = await collection.Aggregate<LogRow>().ToListAsync();

			return new OkObjectResult(
				JsonConvert.SerializeObject(
					new
					{
						history = documents,
						tasks = documents2
					}
				)
			);
		}
	}
}
