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
	public static class HttpTrigger1
	{
		[FunctionName("HttpTrigger1")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
				ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<LogRow>("log");
			var documents = await collection.Find(s => s.notes != "" || s.notes == "").ToListAsync();


			string output = "";
			foreach (var item in documents)
			{
				// BsonClassMap.RegisterClassMap<MyClass>();
				output += JsonConvert.SerializeObject(item) + "\n";
				// item[]
			}
			return new OkObjectResult(output);
		}
	}
}
