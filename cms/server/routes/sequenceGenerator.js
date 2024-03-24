// A big thank you to Aaron Picker for helping with this code.

var Sequence = require('../models/sequence');

// var maxDocumentId;
// var maxMessageId;
// var maxContactId;
// var sequenceId = null;

const sequenceGenerator = {   //First, I restructured sequenceGenerator to be a variable containing the various methods.
    async init() {    //Make this init() function asynchronous
        try {
              const sequence = await Sequence.findOne({}).exec();   //"exec()" here has to do with Mongoose and async functions. Not sure if it's entirely necessary, but it works with it in there. 
              if (!sequence) {
                    throw new Error('Sequence not found');
              }
              this.sequenceId = sequence._id;
              this.maxDocumentId = sequence.maxDocumentId;
              this.maxMessageId = sequence.maxMessageId;
              this.maxContactId = sequence.maxContactId;
        } catch (err) {
              console.error('Error initializing SequenceGenerator:', err);
              throw err;
        }
    },

    async nextId(collectionType) {
        // Ensure the generator is initialized. If not, call the init() function above. 
        if (!this.sequenceId) {
              await this.init();
        }
        
        let updateObject = {};
        let nextId;

        switch (collectionType.toLowerCase()) {
            case "documents":
                this.maxDocumentId++;
                updateObject = { maxDocumentId: this.maxDocumentId };
                nextId = this.maxDocumentId;
                break;
            case "messages":
                this.maxMessageId++;
                updateObject = { maxMessageId: this.maxMessageId };
                nextId = this.maxMessageId;
                break;
            case "contacts":
                this.maxContactId++;
                updateObject = { maxContactId: this.maxContactId };
                nextId = this.maxContactId;
                break;
            default:
                throw new Error('Invalid collection type');
        }

        try {
            await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec();
            return nextId;
        } catch (err) {
            console.error('Error updating sequence for', collectionType, err);
            throw err;
        }
    },

};

module.exports = sequenceGenerator;
