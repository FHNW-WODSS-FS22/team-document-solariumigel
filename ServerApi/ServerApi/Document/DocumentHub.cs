using Microsoft.AspNetCore.SignalR;

namespace ServerApi.Document
{
    public class DocumentHub : Hub
    {
        public async Task SendChange(string documentId, int startPosition, int endPosition, string message, string user)
        {
            await Clients.Group(documentId).SendAsync("ApplyChange", startPosition, endPosition, message, user);
        }

        public async Task SendChangePosition(string documentId, int newPosition, string user)
        {
            await Clients.Group(documentId).SendAsync("ApplyChangePosition", newPosition, user);
        }

        public async Task AddToDocument(string documentId)
        {
            var guid = Guid.NewGuid().ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, documentId);

            await Clients.Client(Context.ConnectionId).SendAsync("SetUserId", guid);
        }
    }
}