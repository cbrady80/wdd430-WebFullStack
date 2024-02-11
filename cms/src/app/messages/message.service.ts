import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }
  
  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for(let message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }

  // Added this in to try to get my messages to properly work
  getNextId(): string {
    return (this.messages.length > 1) ? '' + (Number(this.messages[this.messages.length - 1].id) + 1) : '0';
  }

}
