import { Component, Input } from '@angular/core';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // input from parent app component
  @Input() loggedIn: boolean = false;

  constructor(private storageService: StorageService) {}

  logout(): void {
    this.storageService.clean();
    localStorage.setItem('logout-event', 'logout');
  }
}
