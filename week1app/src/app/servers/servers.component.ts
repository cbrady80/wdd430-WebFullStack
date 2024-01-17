import { Component } from '@angular/core';

@Component({
  selector: 'app-servers', // selector by ELEMENT
  // selector: '[app-servers]', // selector by ATTRIBUTE (<div app-servers>)
  // selector: '.app-servers',  // selector by CLASS (<div class="app-servers">)
  // NOTE: you cannot select by ID in angular
  // Also note: typically we use the elements selectors for components.
  template: '<app-server></app-server><app-server></app-server>',
  styleUrl: './servers.component.css'
})
export class ServersComponent {

}
