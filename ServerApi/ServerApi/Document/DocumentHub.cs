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

        public async Task UpdateMessage(string documentId, string paragraphId, string message)
        {
            _documentClient.UpdateText(documentId, paragraphId, message);
            await Clients.Group(documentId).SendAsync("ListenForMessage", paragraphId, message);
        }

        public async Task UpdatePosition(string documentId, string paragraphId, int position)
        {
            _documentClient.UpdatePosition(documentId, paragraphId, position);
            await Clients.Group(documentId).SendAsync("ListenForPosition", paragraphId, position);
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

        public async Task CreateParagraph(string documentId, string user, int position)
        { 
            var guid = Guid.NewGuid().ToString();
            var paragraph = new ParagraphEntity
            {
                Id = guid,
                Owner=user,
                Position=position
            };
            _documentClient.CreateParagraph(documentId, paragraph);

            await Clients.Group(documentId).SendAsync("ListenForCreateParagraph", paragraph);
        }

        public async Task DeleteParagraph(string documentId, string paragraphId)
        { 
            _documentClient.DeleteParagraph(documentId, paragraphId);

            await Clients.Group(documentId).SendAsync("ListenForDeleteParagraph", paragraphId);
        }
    }
}