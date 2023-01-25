import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isLawyer = false;
  isNotary = false;
  isClient = false;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.isAdmin = this.storageService.isAdmin();
      this.isLawyer = this.storageService.isLawyer();
      this.isNotary = this.storageService.isNotary();
      this.isClient = this.storageService.isClient();
    }
  }
  
}
