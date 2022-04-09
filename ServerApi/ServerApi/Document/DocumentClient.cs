using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ServerApi.Document
{
    public class MongoDbDocumentClient : IDocumentClient
    {
        private IMongoCollection<DocumentEntity> _documents;

        public MongoDbDocumentClient(IOptions<DocumentDatabaseSettings> databaseSetting)
        {
            var mongoClient = new MongoClient(
                databaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSetting.Value.DatabaseName);

            _documents = mongoDatabase.GetCollection<DocumentEntity>(
                databaseSetting.Value.CollectionName);
        }

        public IList<DocumentEntity> FindAll()
        {
            return _documents.Find(_ => true).ToList();
        }

        public void Insert(DocumentEntity document)
        {
            _documents.InsertOne(document);
        }

        public void Update(DocumentEntity document)
        {
            _documents.InsertOne(document);
        }
    }
}
