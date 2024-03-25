import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient, private contactService: ContactService) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  ngOnInit() {
    this.getMessages();
  }
  
  // getMessages(): Message[] {
  //   return this.messages.slice();,
  // }

  getMessages(): any {
    this.http
      .get('http://localhost:3000/messages')
      .subscribe({
        next: (messageData: {message: string, messages: Message[] }) => {
          // this.messages = messageData.messages;
          // this.maxMessageId = this.getMaxId();
          {
            // the populate() method at the server pulled down full contact
            // information based on the foreign key of the sender.
            // We only need the friendly id of the sender.
            for (let msg of messageData.messages) {
              if (msg.sender) {
                msg.sender = msg.sender['id'];
              }
            }
            // purge messages with missing senders  
            this.messages = messageData.messages;
            // for (let msg of this.messages) {
            //   if (!msg.sender) {
            //     this.deleteMessage(msg);
            //   }

            //emit the next document list change event
            this.messageChangedEvent.next(this.messages.slice());
          }
        },
        error: (error) => {
          console.log('getMessages error ' + error);
        }
      });    
  }

  getMessage(id: string) {
    for(let message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    this.maxMessageId++
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  // Added this in to try to get my messages to properly work
  // getNextId(): string {
  //   return (this.messages.length > 1) ? '' + (Number(this.messages[this.messages.length - 1].id) + 1) : '0';
  // }

  getMaxId(): number {
    let maxId = 0;
    for(let message of this.messages) {
      let currentId = parseInt(message.id);
      if(currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }

  storeMessages() {
    const messageString = JSON.stringify(this.messages);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    this.http
      .put(
        'http://localhost:3000/messages', 
        messageString,
        {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      )
      .subscribe(response => {
        console.log(response);
        this.messageChangedEvent.next(this.messages.slice());
      })
  }

}
