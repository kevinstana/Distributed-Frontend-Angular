import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_helpers/app-user';
import { StorageService } from '../../_services/storage.service';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  clickedDelete: boolean = false;
  tmpUsername: string = '';
  admin: boolean = false;
  tmpIndex: number = -1;
  tmpId: number = -1;
  userList: User[] = [];

  adminError: boolean = false;
  message:string = '';

  ngOnInit(): void {
    this.admin = this.storageService.isAdmin();

    if (this.admin) {
      this.userService.getUserList().subscribe({
        next: (data) => {
          this.userList = data;

          this.userList.forEach(function (user) {
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
    } else {
      this.router.navigate(['']);
    }
  }

  updateUser(id: number) {
    this.router.navigate(['/update-user', id]);
  }

  deleteUser(answer?: boolean | null): void {
    this.message = '';

    if (answer) {
      if (this.userList.at(this.tmpIndex)?.strRoles.includes('ADMIN')) {
        // this.message = "Can't delete admin"
        this.adminError = true;
        this.tmpUsername = '';
        this.tmpId = -1;
        this.tmpIndex = -1;
        return;
      };
      
      this.userService.deleteUser(this.tmpId).subscribe({
        next: (data) => {
          this.userList.splice(this.tmpIndex, 1);  
          this.tmpUsername = '';
          this.tmpId = -1;
          this.tmpIndex = -1;
        },
        error: (err) => {
          if (this.message.length == 0) {
            this.message = err.error.message;
            setTimeout(() => {
              this.message = '';
          }, 3000);
          }
          if (err.error) {
          } else {
            this.message = 'Error with status: ' + err.status;
          }
        },
      });

    }
  }

  dangerOk() {
    // this.message = '';
    this.adminError = false;
  }

  onClickDelete(username: string, id: number, index: number) {
    this.clickedDelete = true;
    this.message = `Delete user: ${username}?`

    this.tmpUsername = username;
    this.tmpIndex = index;
    this.tmpId = id;
  }

  ngOnDestroy(): void {
    this.clickedDelete = false;
    this.message = '';

    this.tmpUsername = '';
    this.tmpIndex = -1;
    this.tmpId = -1;
  }
}
