using Newtonsoft.Json;

namespace ServerApi.Document
{
    public class DocumentData
    {
        [JsonProperty("Owner")]
        public string Owner { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }
    }
}
