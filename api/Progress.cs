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
		[FunctionName("GetProgress")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "progress")] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collectionHistory = database.GetCollection<LogRow>("log");
			var documentsHistory = await collectionHistory.Aggregate<LogRow>().ToListAsync();

			var collectionTasks = database.GetCollection<TealFire.HomeBattle.Models.Task>("descriptions");
			var documentsTasks = await collectionTasks.Aggregate<TealFire.HomeBattle.Models.Task>().ToListAsync();

			var maciejPoints = 0;
			var zofiaPoints = 0;
			foreach (var item in documentsHistory)
			{
				var foundTask = documentsTasks.Find((e) => e.key == item.description);
				if (foundTask != null)
				{
					if (item.who == "Maciej")
					{
						maciejPoints += foundTask.weight * item.count;
					}
					else
					{
						zofiaPoints += foundTask.weight * item.count;
					}
				}
			}

			return new OkObjectResult(
				JsonConvert.SerializeObject(
					new
					{
						maciejPoints,
						zofiaPoints
					}
				)
			);
		}
	}
}
