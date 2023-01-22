import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../_helpers/app-user';
import { Contract } from '../_helpers/contract';
// import { Roles } from '../_helpers/roles';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.css']
})
export class ViewMyProfileComponent {
  isLoggedIn = false;
  message = '';
  
  isRole1 = false;
  isRole2 = false;
  isRole3 = false;
  isRole4 = false;

  contract: Contract = {
    id: 0,
    text: '',
    dateCreated: '',
    dateApproved: '',
    status: ''
  }

  appUser: AppUser = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    afm: 0,
    amka: 0,
    answer: '',
    roles: [{
      role: ''
    }],
    contract: this.contract,
    strRoles: ''
  };

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    else {
      let myId = this.storageService.getUser().id;
      this.userService.viewLoggedInProfile(myId).subscribe({
        next: (data) => {
          this.appUser = data;

          this.appUser.roles.forEach(
            (role) => {
            switch (role.role.substring(5)) {
              case ('ADMIN'): {
                this.isRole1 = true;
                break;
              }
              case ('LAWYER'): {
                this.isRole2 = true;
                break;
              }
              case ('NOTARY'): {
                this.isRole3 = true;
                break;
              }
              case ('CLIENT'): {
                this.isRole4 = true;
                break;
              }
            }
          })
        },
        error: (err) => {
          this.message = err.error.message;
          window.alert([this.message]);
          if (err.error) {
            // this.content = JSON.parse(err.error).message;
          } else {
            // this.message = 'Error with status: ' + err.status;
          }
        }
      })
    }
  }
}
