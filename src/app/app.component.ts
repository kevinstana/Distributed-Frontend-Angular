import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = false;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('logout-event');
        if(token == 'logout') {
          window.location.reload();
        }
      }
    }, false);
  }

  logout(): void {
    this.storageService.clean();
    localStorage.setItem('logout-event', 'logout');
  }
}