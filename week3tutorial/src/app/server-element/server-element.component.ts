import { 
  Component, 
  OnInit, 
  Input, 
  ViewEncapsulation, 
  OnChanges, 
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.Emulated  //other options are None and ShadowDom, emulated is default therefore you dont really need to add it here.
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
    @Input('srvElement') element: {type: string, name: string, content: string};
    @Input() name: string;
    @ViewChild('heading') header: ElementRef;
    @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

    constructor() {
      console.log('constructor called');
    }

    ngOnChanges(changes: SimpleChanges) {
      console.log('ngOnChanges called');
      console.log(changes);
    }

    ngOnInit() {
      console.log('ngOnInit called');
    }

    ngDoCheck() {
      console.log('ngDoCheck called')
    }

    ngAfterContentInit() {
      console.log('ngAFterContentInit called')
      console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
      //I get an error on this one.  ERROR TypeError: Cannot read properties of undefined (reading 'nativeElement')
      //at _ServerElementComponent.ngAfterContentInit (server-element.component.ts:58:66)
    }

    ngAfterContentChecked() {
      console.log('ngAFterContentChecked called')
    }

    ngAfterViewInit() {
      console.log('ngAFterViewInit called')
      console.log('Text content: ' + this.header.nativeElement.textContent);
    }

    ngAfterViewChecked() {
      console.log('ngAFterViewChecked called')
    }

    ngOnDestroy() {
      console.log('ngOnDestroy called')
    }

}
