using Newtonsoft.Json;
using System;

namespace TealFire.HomeBattle.Models
{
	public class Description
	{
		[JsonProperty("name")]
		public string name;

		[JsonProperty("weight")]
		public double weight;
	}
}

