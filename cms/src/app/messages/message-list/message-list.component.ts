import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
