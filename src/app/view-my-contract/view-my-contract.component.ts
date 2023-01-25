import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserContract } from '../_helpers/contract';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-my-contract',
  templateUrl: './view-my-contract.component.html',
  styleUrls: ['./view-my-contract.component.css'],
})
export class ViewMyContractComponent {
  isLoggedIn = false;
  isLawyer = false;
  isClient = false;
  message = '';
  myId?: number;
  myAnswer = '';

  myContract: UserContract = {
    text: '',
    dateCreated: '',
    dateApproved: '',
    status: '',
    members: [],
  };

  member1: string[] = [];
  member2: string[] = [];
  member3: string[] = [];
  member4: string[] = [];

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
      this.isLawyer = this.storageService.isLawyer();
      this.isClient = this.storageService.isClient();
      if (!this.isLawyer && !this.isClient) {
        this.router.navigateByUrl('/home');
      } else {
        this.myId = this.storageService.getUser().id;
        this.userService.getUserContract(this.myId!).subscribe({
          next: (data) => {
            this.myContract = data;
            this.member1 = this.myContract.members[0].split(': ');
            this.member2 = this.myContract.members[1].split(': ');
            this.member3 = this.myContract.members[2].split(': ');
            this.member4 = this.myContract.members[3].split(': ');
            this.myAnswer = this.myContract.members[4];
          },
          error: (err) => {
            this.message = err.error.message;
            // window.alert([this.message]);
            // this.router.navigate(['/home']);
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

  OnSubmit(): void {
    this.userService.answerUserContract(this.myId!).subscribe({
      next: (data) => {
        // window.alert('You have answered successfully');
        window.location.reload();
      },
      error: (err) => {
        this.message = err.error.message;
        window.alert([this.message]);
        if (err.error) {
          // this.content = JSON.parse(err.error).message;
        } else {
          this.message = 'Error with status: ' + err.status;
        }
      },
    });
  }
}
