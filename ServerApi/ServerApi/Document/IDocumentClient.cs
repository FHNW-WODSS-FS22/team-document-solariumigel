namespace ServerApi.Document
{
    public interface IDocumentClient
    {
        void Insert(DocumentEntity document);
        IList<DocumentEntity> FindAll();
    }
}
