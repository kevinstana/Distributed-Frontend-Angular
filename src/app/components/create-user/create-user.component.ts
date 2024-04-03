import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from '../../_helpers/app-user';
import { StorageService } from '../../_services/storage.service';
import { UserService } from '../../_services/user.service';
import { createUserForm } from '../../validators/create-user-validators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}

  admin: boolean = false;
  form: FormGroup = createUserForm;
  
  createErrorMessage: string = '';


  ngOnInit(): void {
    this.admin = this.storageService.isAdmin();

    if (!this.admin) {
      this.router.navigate(['']);
    }
  }

  submitForm(): void {
    const roles: string[] = [];

    if (this.form.get('role1')?.value) {
      roles.push('admin');
      console.log('role1' + this.form.get('role1')?.value)
    }
    if (this.form.get('role2')?.value) {
      roles.push('lawyer');
    }
    if (this.form.get('role3')?.value) {
      roles.push('notary');
    }
    if (this.form.get('role4')?.value) {
      roles.push('client');
    }

    const user: CreateUser = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      email: this.form.get('email')?.value,
      role: roles,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      afm: this.form.get('afm')?.value,
      amka: this.form.get('amka')?.value
    };
    
    this.userService.postUser(user).subscribe({
      next: (data) => {
        this.form.reset();
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.createErrorMessage = err.error.message;
        if (err.error) {
          // this.message = JSON.parse(err.error).message;
        } else {
          this.createErrorMessage = 'Error with status: ' + err.status;
          console.log(this.createErrorMessage);
        }
      }
    })      
  }

  dangerOk() {
    this.createErrorMessage = '';
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}
