import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private storageService: StorageService,
    private router: Router) {}
    
  loggedIn: boolean = false;
  lawyer: boolean = false;
  notary: boolean = false;
  client: boolean = false;
  admin: boolean = false;
  userId: number = -1;

  ngOnInit(): void {
    // i dont think this is required... anyway
    // loggedIn though is needed, it is passed to identification child component (check home.component.html)
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login);

    this.admin = this.storageService.isAdmin();
    this.lawyer = this.storageService.isLawyer();
    this.notary = this.storageService.isNotary();
    this.client = this.storageService.isClient();
    this.userId = this.storageService.getUser().id;
  }

  ngOnDestroy(): void {
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login).unsubscribe();
  }
  
}
