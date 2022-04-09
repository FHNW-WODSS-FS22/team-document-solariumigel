using MongoDB.Bson.Serialization.Attributes;

namespace ServerApi.Document
{
    public class DocumentEntity
    {
        public DocumentEntity()
        {
            Paragraph = new List<ParagraphEntity>();
        }

        [BsonId]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Owner { get; set; }

        public IList<ParagraphEntity> Paragraph { get; set; }
    }
}
