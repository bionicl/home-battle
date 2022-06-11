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


	public static class GetTasks
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

	public static class CreateTask
	{
		class TaskPartial
		{
			public string name;
			public int weight;
		}

		static string convert(string str)
		{
			int n = str.Length;
			string str1 = "";

			for (int i = 0; i < n; i++)
			{
				// Converting space
				// to underscore
				if (str[i] == ' ')
					str1 = str1 + '_';
				else

					// If not space, convert
					// into lower character
					str1 = str1 +
							Char.ToLower(str[i]);
			}
			return str1;
		}

		[FunctionName("CreateTask")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks")] HttpRequest req,
				ILogger log)
		{
			var context = JsonConvert.DeserializeObject<TaskPartial>(await req.ReadAsStringAsync());

			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<TealFire.HomeBattle.Models.Task>("descriptions");

			var document = new TealFire.HomeBattle.Models.Task
			{
				name = context.name,
				weight = context.weight,
				key = convert(context.name)
			};

			collection.InsertOne(document);
			var documents = await collection.Aggregate<TealFire.HomeBattle.Models.Task>().ToListAsync();
			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}

	public static class RemoveTask
	{

		[FunctionName("RemoveTask")]
		public static async Task<IActionResult> Run(
				[HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "tasks/{id}")] HttpRequest req,
				string id, ILogger log)
		{
			var client = new MongoClient(Environment.GetEnvironmentVariable("mongoDBURL", EnvironmentVariableTarget.Process));
			var database = client.GetDatabase("db");
			var collection = database.GetCollection<TealFire.HomeBattle.Models.Task>("descriptions");
			collection.DeleteOne("{ _id: \"" + id + "\" }");
			var documents = await collection.Aggregate<TealFire.HomeBattle.Models.Task>().ToListAsync();
			string output = JsonConvert.SerializeObject(documents);
			return new OkObjectResult(output);
		}
	}
}
