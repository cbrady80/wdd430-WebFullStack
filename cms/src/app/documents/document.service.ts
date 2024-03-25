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

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  ngOnInit() {
    this.getDocuments();
  }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  // getDocuments(): any {
  //   this.http
  //     .get<Document[]>('http://localhost:3000/documents')
  //     .subscribe(
  //       (documents: Document[]) => {
  //         this.documents = documents;
  //         this.maxDocumentId = this.getMaxId();
  //         //sort the list of docs
  //         this.documents.sort((a: Document, b: Document) =>{
  //           const nameA = a.name.toUpperCase();
  //           const nameB = b.name.toUpperCase();
  //           if (nameA < nameB) {
  //             return -1;
  //           }
  //           if (nameA > nameB) {
  //             return 1;
  //           }
  //           return 0;
  //         });
  //         //emit the next document list change event
  //         this.documentListChangedEvent.next(this.documents.slice());
  //     }
  //       // (error: any) => {
  //       //   console.log(error);
  //       // }
  //     )
  // }

  getDocuments(): any {
    this.http.get('http://localhost:3000/documents')
    .subscribe({
      next: (documentData: {message: string, documents: Document[]}) => { 
          console.log(documentData.message);
          this.documents = documentData.documents;
          this.maxDocumentId = this.getMaxId();
          // sort the documents.
          this.documents.sort((a, b) => {
            //compare function
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }      
            // names must be equal
            return 0;
          });
         
          let documentListClone: Document[] = this.documents.slice();
          this.documentListChangedEvent.next(documentListClone);
          
      },
      error: (error) => {
        console.log('getDocuments error '+ error);
      }
    });
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

    // this.documents.splice(position, 1);
    // // this.documentListChangedEvent.next(this.documents.slice());
    // this.storeDocuments();

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(position, 1);
          // this.sortAndSend();
          this.storeDocuments();
        }
      );
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

  // addDocument(newDocument: Document) {
  //   if(newDocument === undefined || newDocument === null) {
  //     return;
  //   }

  //   this.maxDocumentId++
  //   // Convert newDocument.Id to a string so that it can be set on the document obj.
  //   // let maxIdString = this.maxDocumentId.toString();
  //   // newDocument.id = maxIdString;
    
  //   newDocument.id = String(this.maxDocumentId);
  //   this.documents.push(newDocument);
  //   // this.documentListChangedEvent.next(this.documents.slice());
  //   this.storeDocuments();
  // }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents/',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          // this.sortAndSend();
          this.storeDocuments();
        }
      );
  }

  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if(originalDocument === undefined || originalDocument === null) {
  //     return;
  //   }
  //   if(newDocument === undefined || newDocument === null) {
  //     return;
  //   }

  //   const position = this.documents.indexOf(originalDocument);
  //   if (position < 0) {
  //     return;
  //   }

  //   newDocument.id = originalDocument.id;
  //   this.documents[position] = newDocument;
  //   // this.documentListChangedEvent.next(this.documents.slice());
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          // this.sortAndSend();
          this.storeDocuments();
        }
      );
  }

  storeDocuments() {
    const docString = JSON.stringify(this.documents);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    this.http
      .put(
        'http://localhost:3000/documents', 
        docString,
        {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      )
      .subscribe(response => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }

}