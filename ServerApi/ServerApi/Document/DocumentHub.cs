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

        public async Task UpdatePositionUp(string documentId, string paragraphId)
        {
            var document = _documentClient.Find(documentId);
            var paragraph = document.Paragraph.Single(h => h.Id == paragraphId);
            var currentPosition = paragraph.Position;
            var newPosition = currentPosition - 1;

            if(0 >= newPosition)
            {
                return;
            }
            
            var upperParagraph = document.Paragraph.SingleOrDefault(h => h.Position == newPosition);
            _documentClient.UpdatePosition(documentId, paragraph.Id, newPosition);
            
            if(upperParagraph != null)
            {
                _documentClient.UpdatePosition(documentId, upperParagraph.Id, currentPosition);
                await Clients.Group(documentId).SendAsync("ListenForPosition", upperParagraph.Id, currentPosition);
            }
            await Clients.Group(documentId).SendAsync("ListenForPosition", paragraph.Id, newPosition);
            await Clients.Group(documentId).SendAsync("ResortParagraphs", documentId);
        }

        public async Task UpdatePositionDown(string documentId, string paragraphId)
        {
            var document = _documentClient.Find(documentId);
            var paragraph = document.Paragraph.Single(h => h.Id == paragraphId);
            var currentPosition = paragraph.Position;
            var newPosition = currentPosition + 1;

            if(document.Paragraph.Max(h => h.Position) < newPosition)
            {
                return;
            }

            var lowerParagraph = document.Paragraph.SingleOrDefault(h => h.Position == newPosition);
            _documentClient.UpdatePosition(documentId, paragraph.Id, newPosition);
            if(lowerParagraph != null)
            {
                _documentClient.UpdatePosition(documentId, lowerParagraph.Id, currentPosition);
                await Clients.Group(documentId).SendAsync("ListenForPosition", lowerParagraph.Id, currentPosition);
            }
            await Clients.Group(documentId).SendAsync("ListenForPosition", paragraph.Id, newPosition);
            await Clients.Group(documentId).SendAsync("ResortParagraphs", documentId);
        }

        public async Task AddToDocument(string documentId)
        {
            var guid = Guid.NewGuid().ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, documentId);

            var document = _documentClient.Find(documentId);

            await Clients.Client(Context.ConnectionId).SendAsync("SetUserId", guid, document);
            // await Clients.Group(documentId).SendAsync(); //Client(Context.ConnectionId).SendAsync("SetUserId", guid, document);
        }

        public async Task RemoveFromDocument(string documentId, string user)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, documentId);

            var document = _documentClient.Find(documentId);

            await Clients.Client(Context.ConnectionId).SendAsync("UnSetUserId", user, document);
        }        

        public async Task CreateParagraph(string documentId, string user)
        { 
            var document = _documentClient.Find(documentId);
            var guid = Guid.NewGuid().ToString();
            var paragraph = new ParagraphEntity
            {
                Id = guid,
                Owner=user,
                Position= document.Paragraph.Any() ? document.Paragraph.Max(h => h.Position) + 1 : 1,
                Text = ""
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