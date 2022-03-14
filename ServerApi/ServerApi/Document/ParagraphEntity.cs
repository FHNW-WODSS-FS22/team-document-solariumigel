using MongoDB.Bson.Serialization.Attributes;

namespace ServerApi.Document
{
    public class ParagraphEntity
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Owner { get; set; }

        public int Order { get; set; }

        public string Text { get; set; }
    }
}
