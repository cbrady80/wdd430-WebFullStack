import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contact: Contact;
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent.subscribe(
    //   (contacts: Contact[]) => {
    //     this.contacts = contacts;
    //   }
    // );
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
    );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
