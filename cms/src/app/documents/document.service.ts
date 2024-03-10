import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private httpClient: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  ngOnInit() {
    this.getDocuments();
  }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getDocuments(): any {
    this.httpClient
      .get<Document[]>('https://cms-project-4e26b-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          //sort the list of docs
          this.documents.sort((a: Document, b: Document) =>{
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
          this.documentListChangedEvent.next(this.documents.slice());
      }
        // (error: any) => {
        //   console.log(error);
        // }
      )
  }

  getDocument(id: string): Document {
    for(let document of this.documents) {
      if(document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    for(let document of this.documents) {
      let currentId = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(newDocument === undefined || newDocument === null) {
      return;
    }

    this.maxDocumentId++
    // Convert newDocument.Id to a string so that it can be set on the document obj.
    // let maxIdString = this.maxDocumentId.toString();
    // newDocument.id = maxIdString;
    
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === undefined || originalDocument === null) {
      return;
    }
    if(newDocument === undefined || newDocument === null) {
      return;
    }

    const position = this.documents.indexOf(originalDocument);
    if (position < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  storeDocuments() {
    const docString = JSON.stringify(this.documents);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    this.httpClient
      .put(
        'https://cms-project-4e26b-default-rtdb.firebaseio.com/documents.json', 
        docString,
        {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      )
      .subscribe(response => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }

}