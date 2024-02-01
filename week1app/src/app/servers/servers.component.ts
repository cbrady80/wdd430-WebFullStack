import { Component } from '@angular/core';

@Component({
  selector: 'app-servers', // selector by ELEMENT
  // selector: '[app-servers]', // selector by ATTRIBUTE (<div app-servers>)
  // selector: '.app-servers',  // selector by CLASS (<div class="app-servers">)
  // NOTE: you cannot select by ID in angular
  // Also note: typically we use the elements selectors for components.
  // template: '<app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test server';
  serverCreated = false;
  serversList = ['Test Server', 'Test Server 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serversList.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    // console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
