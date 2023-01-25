import { Component } from '@angular/core';
import { AppUser } from '../_helpers/app-user';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  isLoggedIn = false;
  isAdmin = false;

  appUserList: AppUser[] = [];

  message = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.isAdmin = this.storageService.getUser().roles.includes('ADMIN');
      if (!this.isAdmin) {
        this.router.navigateByUrl('/home');
      } else {
        this.userService.getUserList().subscribe({
          next: (data) => {
            this.appUserList = data;

            this.appUserList.forEach(function (user) {
              let strRolesArray: string[] = [];
              user.roles.forEach(function (role) {
                strRolesArray.push(role.role.substring(5));
              });

              user.strRoles = strRolesArray.join(', ');
            });
          },
          error: (err) => {
            console.log(err);
            if (err.error) {
            } else {
              this.message = 'Error with status: ' + err.status;
            }
          },
        });
      }
    }
  }

  updateUser(userId: number) {
    this.storageService.saveUpdatedUserId(userId);
    this.router.navigate(['/update-user']);
  }

  deleteUser(user: AppUser) {
    if(confirm("Delete user " + user.username + "?")) {
      this.userService.deleteUser(user.id).subscribe({
        next: (data) => {
        },
        error: (err) => {
          if (this.message.length == 0) {
            this.message = err.error.message;
            setTimeout(() => {
              this.message = '';
          }, 3000);
          }
          // window.alert([this.message]);
          if (err.error) {
          } else {
            this.message = 'Error with status: ' + err.status;
          }
        },
      });

      const index = this.appUserList.indexOf(user, 0);
      if (index > -1 && !user.strRoles.includes('ADMIN')) {
        this.appUserList.splice(index, 1);
      }
    }
    
  }

}
