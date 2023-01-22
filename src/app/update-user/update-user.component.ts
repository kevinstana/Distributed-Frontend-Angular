import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateOrUpdateUser } from '../_helpers/app-user';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
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

  updatedUser: CreateOrUpdateUser = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: [],
    afm: 0,
    amka: 0
  };

  message = '';
  errorMessage = '';
  isLoggedIn = false;
  isAdmin = false;

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

    let updatedUserId = this.storageService.getUpdatedUserId();

    this.userService.getUpdateUser(updatedUserId).subscribe({
      next: (data) => {
        this.form = data;

        data.role.forEach((role) => {
          switch (role.substring(5)) {
            case ('ADMIN'):
              this.form.role1 = true;
              break;
            case ('LAWYER'):
              this.form.role2 = true;
              break;
            case ('NOTARY'):
              this.form.role3 = true;
              break;
            case ('CLIENT'):
              this.form.role4 = true;
              break;
            }
        })
      },
      error: (err) => {
        console.log(err);
        if (err.error) {
          this.message = JSON.parse(err.error).message;
        } else {
          this.message = 'Error with status: ' + err.status;
        }
      }
    })
  }

  onSubmit(): void {

    const { 
      username, password, email, 
      role1, role2, role3, role4, 
      firstName, lastName, afm, amka } = this.form;
      
      if (role1) {
        this.updatedUser.role.push('admin');
      }
      
      if (role2) {
        this.updatedUser.role.push('lawyer');
      }
      if (role3) {
        this.updatedUser.role.push('notary');
      }
      if (role4) {
        this.updatedUser.role.push('client');
      }

      this.updatedUser.username = username;
      this.updatedUser.password = password;
      this.updatedUser.email = email;
      this.updatedUser.firstName = firstName;
      this.updatedUser.lastName = lastName;
      this.updatedUser.afm = afm;
      this.updatedUser.amka = amka;

      this.userService.putUpdateUser(this.storageService.getUpdatedUserId(), this.updatedUser).subscribe({
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
