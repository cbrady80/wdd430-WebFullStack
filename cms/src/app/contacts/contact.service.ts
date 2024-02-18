import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  private contacts: Contact[] = [];
  
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for(let contact of this.contacts) {
      if(contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) { 
    if (!contact) {
      return;
    }

    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
  
}
