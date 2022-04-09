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

## Events

Url: /documentSocketrr

| Recived |  Send  | Parameters  | Description | 
|:-----|:--------:|:--------:| :------:|
| SendChange   | ApplyChange | documentId </br> startposition </br> endposition </br> message </br> user  | Sending a change to all the other clients on this document |
| SendChangePosition   |  ApplyChangePosition  |  documentId </br> newPosition </br> user  | Sends a change of position to all the other clients|
| AddToDocument   |  |  documentId   | Opening a document|