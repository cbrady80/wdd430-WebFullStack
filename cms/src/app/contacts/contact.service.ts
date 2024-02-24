import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number;
  
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for(let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if(currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }
  
  addContact(newContact: Contact) {
    if(newContact === undefined || newContact === null) {
      return;
    }

    this.maxContactId++
    // Convert newContact.Id to a string so that it can be set on the document obj.
    let maxIdString = this.maxContactId.toString();
    newContact.id = maxIdString;

    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateDocument(originalContact: Contact, newContact: Contact) {
    if(originalContact === undefined || originalContact === null) {
      return;
    }
    if(newContact === undefined || newContact === null) {
      return;
    }

    const position = this.contacts.indexOf(originalContact);
    if (position < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

}