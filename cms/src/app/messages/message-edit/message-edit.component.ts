import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = '0';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {  }
  
  onSendMessage() {
    const newSubject = this.subjectInputRef.nativeElement.value;
    const newMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(this.messageService.getNextId(), newSubject, newMsgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}


