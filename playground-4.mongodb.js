// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('cmsApp');

// Create a new document in the collection.
db.getCollection('sequences').insertOne(
    {
        "maxDocumentId": 100,
        "maxMessageId": 100,
        "maxContactId": 100
    }
);
