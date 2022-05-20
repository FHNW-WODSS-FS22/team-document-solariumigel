using Microsoft.AspNetCore.Mvc;

namespace ServerApi.Document
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentClient _documentClient;

        public DocumentController(IDocumentClient documentClient)
        {
            _documentClient = documentClient;
        }

        [HttpGet]
        public IList<DocumentEntity> GetDocuments()
        {
            return _documentClient.FindAll();
        }

        [HttpGet("{id}")]
        public DocumentEntity GetDocument(string id)
        {
            return _documentClient.Find(id);
        }

        [HttpPost]
        public string PostDocuments([FromBody] DocumentData data)
        {
            var guid = Guid.NewGuid().ToString();
            var document = new DocumentEntity 
            {
                Id = guid,
                Owner = data.Owner,
                Name = data.Name,
            };

            document.Paragraph.Add(new ParagraphEntity { Id = Guid.NewGuid().ToString(), Owner = data.Owner, Position = 1, Text = "" }) ;

            _documentClient.Insert(document);
            return guid;
        }

        [HttpDelete("{id}")]
        public void DeleteDocument(string id){
            _documentClient.Delete(id);
        }
    }
}
