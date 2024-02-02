import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  documents: Document[] = [
    new Document(
      '1', 
      'Test 1', 
      'Doc Description 1', 
      '### 1', 
      ''
    ),
    new Document(
      '2', 
      'Test 2', 
      'Doc Description 2', 
      '### 2', 
      '',
    ),
    new Document(
      '3', 
      'Test 3', 
      'Doc Description 3', 
      '### 3', 
      '',
    ),
    new Document(
      '4', 
      'Test 4', 
      'Doc Description 4', 
      '### 4', 
      '',
    ),
    new Document(
      '5', 
      'Test 5', 
      'Doc Description 5', 
      '### 5', 
      '',
    )
  ];

  
}
