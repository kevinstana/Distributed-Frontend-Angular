import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CreateOrUpdateUser } from '../_helpers/app-user';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
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
    amka: null,
  };

  updatedUser: CreateOrUpdateUser = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: [],
    afm: '',
    amka: '',
  };

  usernameMessage = '';
  passwordMessage = '';
  verifyPassword = '';
  emailMessage = '';
  afmMessage = '';
  amkaMessage = '';
  message = '';

  isLoggedIn = false;
  isAdmin = false;
  updatedUserId?: number;

  constructor(
    private storageService: StorageService,
    private appComponent: AppComponent,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.isAdmin = this.storageService.isAdmin();
      if (!this.isAdmin) {
        this.router.navigate(['/home']);
      } else {
        this.updatedUserId = this.storageService.getUpdatedUserId();

        if (this.updatedUserId == -1) {
          this.router.navigate(['/users']);
        } else {
          this.userService.getOneUser(this.updatedUserId).subscribe({
            next: (data) => {
              this.form.username = data.username;
              this.form.password = data.password;
              this.form.email = data.email;
              this.form.firstName = data.firstName;
              this.form.lastName = data.lastName;
              this.form.afm = data.afm;
              this.form.amka = data.amka;
  
              data.role.forEach((role) => {
                switch (role) {
                  case 'ADMIN':
                    this.form.role1 = true;
                    break;
                  case 'LAWYER':
                    this.form.role2 = true;
                    break;
                  case 'NOTARY':
                    this.form.role3 = true;
                    break;
                  case 'CLIENT':
                    this.form.role4 = true;
                    break;
                }
              });
            },
            error: (err) => {
              console.log(err);
              if (err.error) {
                // this.message = JSON.parse(err.error).message;
              } else {
                this.message = 'Error with status: ' + err.status;
              }
            },
          });
        }

        
      }
    }
  }

  ngOnDestroy(): void {
    this.storageService.removeUpdatedUserId();
  }

  onSubmit(): void {
    const {
      username,
      password,
      email,
      role1,
      role2,
      role3,
      role4,
      firstName,
      lastName,
      afm,
      amka,
    } = this.form;

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

    this.userService
      .putUser(this.storageService.getUpdatedUserId(), this.updatedUser)
      .subscribe({
        next: (data) => {
          if (this.storageService.getUser().id === this.updatedUserId) {
            this.appComponent.logout();
            this.router.navigate(['/login']);
          } else {
            this.storageService.removeUpdatedUserId();
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          this.message = err.error.message;
          if (this.message.includes('Username')) {
            this.usernameMessage = this.message;
          } else if (this.message.includes('Email')) {
            this.emailMessage = this.message;
          } else if (this.message.includes('Afm'))  {
            this.afmMessage = this.message;
          } else if ((this.message.includes('Amka'))) {
            this.amkaMessage = this.message;
          }
          
          // window.alert([this.message]);
          if (err.error) {
            // this.message = JSON.parse(err.error).message;
          } else {
            this.message = 'Error with status: ' + err.status;
          }
        },
      });
  }

  setUsernameMessage(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
      this.usernameMessage = '';
      return true;
  }

  setEmailMessage(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
      this.emailMessage = '';
      return true;
  }

  setAfmMessage(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
      this.afmMessage = '';
      return true;
  }

  setAmkaMessage(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
      this.amkaMessage = '';
      return true;
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  noSpace(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 32) {
      return false;
    }
    return true;
  }

  checkPassword(event: { which: any; keyCode: any; }): void {
    if (this.form.password == this.verifyPassword) {
      this.passwordMessage = '';
    } else if (this.form.password == '') {
        this.verifyPassword = this.form.password;
      }
    else {
      this.passwordMessage = "Passwords don't match";
    }
  }
}
