﻿using Microsoft.Extensions.Options;
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

        public DocumentEntity Find(string documentId)
        {
            return _documents.Find(_ => _.Id == documentId).Single();
        }

        public void Insert(DocumentEntity document)
        {
            _documents.InsertOne(document);
        }

        public void Update(DocumentEntity document)
        {
            _documents.InsertOne(document);
        }

        public void UpdateText(string documentId, string paragraphId, string message)
        {
            var filter = Builders<DocumentEntity>.Filter;
            var test = filter.And(
                filter.Eq(x => x.Id, documentId),
                filter.ElemMatch(x => x.Paragraph, p => p.Id == paragraphId)
            );

            var setter = Builders<DocumentEntity>.Update.Set("Paragraph.$.Text", message);
            _documents.UpdateOne(test, setter);
        }

        public void AddNewParagraph(string documentId, ParagraphEntity paragraph)
        {
            var update = Builders<DocumentEntity>.Update.Push(a => a.Paragraph, paragraph);
            var result = _documents.UpdateOne(model => model.Id == documentId, update);
        }
    }
}
