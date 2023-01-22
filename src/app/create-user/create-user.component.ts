import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateOrUpdateUser } from '../_helpers/app-user';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  form: any = {
    username: null,
    password: null,
    email: null,
    role1: null,
    role2: null,
    role3: null,
    role4: null,
    firstName: null,
    lastName: null,
    afm: null,
    amka: null
  };
  
  newUser: CreateOrUpdateUser = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: [],
    afm: 0,
    amka: 0
  };

  isLoggedIn = false;
  isAdmin = false;

  message = '';
  errorMessage = '';

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.isAdmin = this.storageService.isAdmin();
      if (!this.isAdmin) {
        this.router.navigateByUrl('/home');
      }
    }
  }

  onSubmit(): void {
    const { 
      username, password, email, 
      role1, role2, role3, role4, 
      firstName, lastName, afm, amka } = this.form;

      if (role1) {
        this.newUser.role.push('admin');
      }
      if (role2) {
        this.newUser.role.push('lawyer');
      }
      if (role3) {
        this.newUser.role.push('notary');
      }
      if (role4) {
        this.newUser.role.push('client');
      }

      this.newUser.username = username;
      this.newUser.password = password;
      this.newUser.email = email;
      this.newUser.firstName = firstName;
      this.newUser.lastName = lastName;
      this.newUser.afm = afm;
      this.newUser.amka = amka;

      this.userService.createUser(this.newUser).subscribe({
        next: (data) => {
        this.router.navigate(['/users']);
        },
        error: (err) => {
          this.message = err.error.message;
          window.alert([this.message]);
          if (err.error) {
            // this.content = JSON.parse(err.error).message;
          } else {
            this.message = 'Error with status: ' + err.status;
          }
        }
      })      
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
