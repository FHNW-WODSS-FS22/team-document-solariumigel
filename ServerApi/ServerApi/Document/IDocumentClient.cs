namespace ServerApi.Document
{
    public interface IDocumentClient
    {
        void Insert(DocumentEntity document);
        IList<DocumentEntity> FindAll();
        DocumentEntity Find(string documentId);
        void UpdateText(string documentId, string paragraphId, string message);
        void CreateParagraph(string documentId, ParagraphEntity paragraph);
        void Delete(string id);
        void DeleteParagraph(string documentId, string paragraphId);
    }
}
