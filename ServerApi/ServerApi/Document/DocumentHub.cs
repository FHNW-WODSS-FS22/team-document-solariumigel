using Microsoft.AspNetCore.SignalR;

namespace ServerApi.Document
{
    public class DocumentHub : Hub
    {

        private readonly IDocumentClient _documentClient;

        public DocumentHub(IDocumentClient documentClient)
        {
            _documentClient = documentClient;
        }

        public async Task SendChange(string documentId, string paragraphId, int startPosition, int endPosition, string message, string user)
        {
            _documentClient.UpdateText(documentId, paragraphId, message);
            await Clients.Group(documentId).SendAsync("ApplyChange", paragraphId, startPosition, endPosition, message, user);
        }

        public async Task SendChangePosition(string documentId, string paragraphId, int newPosition, string user)
        {
            await Clients.Group(documentId).SendAsync("ApplyChangePosition", paragraphId, newPosition, user);
        }

        public async Task SendTestEvent()
        {
            await Clients.All.SendAsync("ApplyTestEvent");
        }

        public async Task AddToDocument(string documentId)
        {
            var guid = Guid.NewGuid().ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, documentId);

            var document = _documentClient.Find(documentId);

            await Clients.Client(Context.ConnectionId).SendAsync("SetUserId", guid, document);
        }

        public async Task AddParagraph(string documentId, string user)
        { 
            var guid = Guid.NewGuid().ToString();
            var paragraph = new ParagraphEntity
            {
                Id = guid,
                Owner=user
            };
            _documentClient.AddNewParagraph(documentId, paragraph);

            await Clients.Group(documentId).SendAsync("AddNewParagraph", paragraph);
        }

        public async Task DeleteParagraph(string documentId, string paragraphId)
        { 
            _documentClient.DeleteParagraph(documentId, paragraphId);

            await Clients.Group(documentId).SendAsync("ListenDeleteParagraph", paragraphId);
        }
    }
}