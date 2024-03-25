import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  contacts: Contact[] = [];
  private maxContactId: number;
  
  constructor(private httpClient: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  ngOnInit() {
    this.getContacts();
  }
  
  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }

  getContacts(): any {
    this.httpClient.get('http://localhost:3000/contacts')
      .subscribe({
        next: (contactData: {message: string, contacts: Contact[]}) => {
          this.contacts = contactData.contacts;
          this.maxContactId = this.getMaxId();
          //sort the list of docs
          this.contacts.sort((a, b) =>{
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          //emit the next document list change event
          this.contactListChangedEvent.next(this.contacts.slice());
      }
        
      }
        // (error: any) => {
        //   console.log(error);
        // }
      )
  }

  getContact(id: string): Contact {
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
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
    // let maxIdString = this.maxContactId.toString();
    // newContact.id = maxIdString;

    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  storeContacts() {
    const contactString = JSON.stringify(this.contactListChangedEvent);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    this.httpClient
      .put(
        'http://localhost:3000/contacts', 
        contactString,
        {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      )
      .subscribe(response => {
        console.log(response);
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }

}