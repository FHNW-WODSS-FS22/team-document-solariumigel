using MongoDB.Bson.Serialization.Attributes;

namespace ServerApi.Document
{
    public class ParagraphEntity
    {
        [BsonId]
        public string Id { get; set; }

        public string Owner { get; set; }

        public int Position { get; set; }

        public string Text { get; set; }
    }
}
