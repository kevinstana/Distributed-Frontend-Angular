import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login);

    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('logout-event');
        if(token == 'logout') {
          window.location.reload();
        }
      }
    }, false);
  }

  ngOnDestroy(): void {
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login).unsubscribe();
  }

  logout(): void {
    this.storageService.clean();
    localStorage.setItem('logout-event', 'logout');
  }
}