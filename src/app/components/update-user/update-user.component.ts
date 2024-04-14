import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { updateUserForm } from '../../validators/update-user-validators';
import { StorageService } from '../../_services/storage.service';
import { AppComponent } from '../../app.component';
import { UserService } from '../../_services/user.service';
import { UpdateUser } from '../../_helpers/app-user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private appComponent: AppComponent,
    private userService: UserService,
    private router: Router
  ) {}

  admin: boolean = false;
  form: FormGroup = updateUserForm;
  updatedUserId?: number;
  pathId: string | null = '';
  id: number = -1;

  updateErrorMessage: string = '';
  message: string = '';

  ngOnInit(): void {
    this.admin = this.storageService.isAdmin();

    if (this.admin) {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.pathId = params.get('id');
      });

      if (this.isValidPathId()) {
        this.userService.getUserForChange(this.id).subscribe({
          next: (data) => {
            this.form.get('username')?.setValue(data.username);
            this.form.get('password')?.setValue(data.password);
            this.form.get('email')?.setValue(data.email);
            this.form.get('role1')?.setValue(data.role.includes('ADMIN'));
            this.form.get('role2')?.setValue(data.role.includes('LAWYER'));
            this.form.get('role3')?.setValue(data.role.includes('NOTARY'));
            this.form.get('role4')?.setValue(data.role.includes('CLIENT'));
            this.form.get('firstName')?.setValue(data.firstName);
            this.form.get('lastName')?.setValue(data.lastName);
            this.form.get('afm')?.setValue(data.afm);
            this.form.get('amka')?.setValue(data.amka);
          },
          error: (err) => {
            console.log(err);
            this.router.navigate(['/not-found']);
            if (err.error) {
              // this.message = JSON.parse(err.error).message;
            } else {
              this.message = 'Error with status: ' + err.status;
            }
          },
        });
      }
    } else {
      // console.log(this.id);
      // console.log(!Number.parseInt(this.id));
      this.router.navigate(['/not-found']);
    }
  }

  isValidPathId(): boolean {
    if (this.pathId && Number.isInteger(this.id = Number.parseInt(this.pathId))) {
      if (this.id > 0) {
        return true;
      }
    }

    return false;
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

    const user: UpdateUser = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      email: this.form.get('email')?.value,
      role: roles,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      afm: this.form.get('afm')?.value,
      amka: this.form.get('amka')?.value
    };

    this.userService
      .putUser(this.id, user).subscribe({next: (data) => {
          if (this.storageService.getUser().id === this.id) {
            this.appComponent.logout();
            this.storageService.changeLogin(false);
            this.form.reset();
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          this.updateErrorMessage = err.error.message;          
          // window.alert([this.message]);
          if (err.error) {
            // this.message = JSON.parse(err.error).message;
          } else {
            this.updateErrorMessage = 'Error with status: ' + err.status;
          }
        },
      });
  }

  dangerOk() {
    this.updateErrorMessage = '';
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}
