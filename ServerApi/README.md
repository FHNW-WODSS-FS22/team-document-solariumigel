# Installation

Download .net SDK (6.*.*)

https://dotnet.microsoft.com/en-us/download/dotnet/6.0

# Start

```
cd ServerApi/
dotnet run
```

# API

## Rest

| Url | Verb | Return Value | Body |
|:-----|:--------:|:--------:|:--------:| 
| /api/document | GET | List of all documents | |
| /api/document | POST | Create a new Document | name, owner|
| /api/document:id | GET | Retrives the document | |
| /api/document/:id | Delete | Deletes the document | |

## Events

Url: /documentSocketrr

| Recived |  Send  | Parameters  | Description | 
|:-----|:--------:|:--------:| :------:|
| UpdateMessage   | ListenForMessage | documentId, paragraphId, message  | Sending a change to all the other clients on this document |
| UpdatePositionUp   |  ListenForPosition </br>  ResortParagraphs  | documentId, paragraphId   | Changes the position of the paragraph one number lower. If there is already an other paragraph, the position will be switched |
| UpdatePositionDown   | ListenForPosition </br>  ResortParagraphs  |  documentId, paragraphId   | Changes the position of the paragraph one number upper. If there is already an other paragraph, the position will be switched|
| AddToDocument | SetCurrentUser </br> ApplyLock </br> SetUserId | documentId | Add new user to the document + generates a random Username |
| AddToDocumentWithUser | ApplyLock </br> SetUserId | documentId, userName | Add new user to the document |
| RemoveFromDocument | ApplyReleaseLock </br> UnSetUserId | documentId, userName | Removes user from document |
| CreateParagraph | ListenForCreateParagraph | documentId, userName | Creates new paragraph |
| DeleteParagraph | ApplyReleaseLock </br> ListenForDeleteParagraph | documentId, paragraphId | Deletes paragraph |
| LockParagraph | ApplyReleaseLock </br> ApplyLock | documentId, paragraphId, userName | Locks a Paragraph, if the user already had a lock, it will be released |