using Microsoft.AspNetCore.SignalR;

namespace ServerApi.Document
{
    public class User
    {
        public User(string name, string connectionId)
        {
            Name = name;
            ConncetionId = connectionId;
        }
        public string ParagraphId {get; set;} = "";
        public string Name{get;}
        public string ConncetionId{get;}
    }
    public class DocumentHub : Hub
    {
        private static readonly IDictionary<string, List<User>> _users= new Dictionary<string, List<User>>();

        private readonly IDocumentClient _documentClient;

        public DocumentHub(IDocumentClient documentClient)
        {
            _documentClient = documentClient;
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {   
            var document = _users.Single(d => d.Value.Any(u => u.ConncetionId == Context.ConnectionId));
            var user = document.Value.Single(u => u.ConncetionId == Context.ConnectionId);
            document.Value.Remove(user);
            if(!string.IsNullOrWhiteSpace(user.ParagraphId))
            {
                await Clients.Group(document.Key).SendAsync("ApplyReleaseLock", user.ParagraphId);
            }

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, document.Key);
            await Clients.Group(document.Key).SendAsync("UnSetUserId", user.Name);
        }

        public async Task UpdateMessage(string documentId, string paragraphId, string message)
        {
            _documentClient.UpdateText(documentId, paragraphId, message);
            await Clients.Group(documentId).SendAsync("ListenForMessage", paragraphId, message);
        }

        // public async Task UpdatePosition(string documentId, string paragraphId, int position)
        // {
        //     _documentClient.UpdatePosition(documentId, paragraphId, position);
        //     await Clients.Group(documentId).SendAsync("ListenForPosition", paragraphId, position);
        // }

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
            await AddToDocumentWithUser(documentId, guid);
            await Clients.Client(Context.ConnectionId).SendAsync("SetCurrentUser", guid);
        }

        public async Task AddToDocumentWithUser(string documentId, string userName)
        {
            var user = new User(userName, Context.ConnectionId);
            if(_users.ContainsKey(documentId))
            {
                _users[documentId].Add(user);
            }
            else
            {
                _users.Add(documentId, new List<User>{user});
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, documentId);

            foreach(var userItem in _users[documentId].Where(h => h.Name != userName))
            {
                if(!string.IsNullOrWhiteSpace(userItem.ParagraphId))
                {
                    await Clients.Client(Context.ConnectionId).SendAsync("ApplyLock", userItem.ParagraphId, userItem.Name);
                }
                await Clients.Client(Context.ConnectionId).SendAsync("SetUserId", userItem.Name);
            }

            await Clients.Group(documentId).SendAsync("SetUserId", userName);

            // var document = _documentClient.Find(documentId);
            // await Clients.Group(documentId).SendAsync(); //Client(Context.ConnectionId).SendAsync("SetUserId", guid, document);
        }

        public async Task RemoveFromDocument(string documentId, string userName)
        {
            var user = _users[documentId].Single(h => h.Name == userName);
            _users[documentId].Remove(user);

            if(!string.IsNullOrWhiteSpace(user.ParagraphId))
            {
                await Clients.Group(documentId).SendAsync("ApplyReleaseLock", user.ParagraphId);
            }

            if(!_users[documentId].Any())
            {
                _users.Remove(documentId);
            }
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, documentId);

            var document = _documentClient.Find(documentId);

            await Clients.Group(documentId).SendAsync("UnSetUserId", userName);
        }        

        public async Task CreateParagraph(string documentId, string userName)
        { 
            var document = _documentClient.Find(documentId);
            var guid = Guid.NewGuid().ToString();
            var paragraph = new ParagraphEntity
            {
                Id = guid,
                Owner=userName,
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

        public async Task LockParagraph(string documentId, string paragraphId, string userName)
        {
            var user = _users[documentId].Single(h => h.Name == userName);
            if(!string.IsNullOrWhiteSpace(user.ParagraphId))
            {
                await Clients.Group(documentId).SendAsync("ApplyReleaseLock", user.ParagraphId);
            }
            user.ParagraphId = paragraphId;
            await Clients.Group(documentId).SendAsync("ApplyLock", paragraphId, userName);
        }

        public async Task ReleaseLockParagraph(string documentId, string paragraphId, string user)
        {
            _users[documentId].Single(h => h.Name == user).ParagraphId = "";
            await Clients.Group(documentId).SendAsync("ApplyReleaseLock", paragraphId);
        }
    }
}