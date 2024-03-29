var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', async (req, res, next) => {
    console.log('GET messages');
    Message.find()
      .populate('sender')
      .then((messages) => {
        res.status(200).json({
          message: 'Retrieved messages from database.',
          messages: messages
        });
    })
      .catch((err) => {
        res.status(500).json({
          message: 'Cannot get messages.',
          error: err
        });
    });
});


router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
    console.log('POST messages');
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });
  
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Message added successfully',
          newMessage: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
});


router.put('/:id', (req, res, next) => {
    console.log('PUT messages');
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found.'}
        });
      });
});


router.delete("/:id", (req, res, next) => {
    console.log('DELETE messages');
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
});


module.exports = router; 