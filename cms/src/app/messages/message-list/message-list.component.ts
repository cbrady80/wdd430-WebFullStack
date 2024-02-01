import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      '1',
      'Test Message 1',
      'This is a test.',
      'Cheryl'
    ),
    new Message(
      '2',
      'Test Message 2',
      'This is also a test.',
      'Kris'
    ),
    new Message(
      '3',
      'Test Message 3',
      'This is another test.',
      'Brooke'
    )
  ]
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
