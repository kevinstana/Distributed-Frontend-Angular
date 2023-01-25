import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent {
  form: any = {
    afm1: null,
    afm2: null,
    afm3: null,
    afm4: null,
    text: null
  };

  message = '';
  errorMessage = '';
  isLoggedIn = false;
  isLawyer =  false;

  strAfm1 = '';
  strAfm2 = '';
  strAfm3 = '';
  strAfm4 = '';

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
      if (!this.isLawyer) {
        this.router.navigateByUrl('/home');
      }
    }
  }

  onSubmit(): void {
    const { afm1, afm2, afm3, afm4, text } = this.form;

    this.strAfm1 = ''+afm1;
    this.strAfm2 = ''+afm2;
    this.strAfm3 = ''+afm3;
    this.strAfm4 = ''+afm4;

    let afms: string[] = [this.strAfm1, this.strAfm2, this.strAfm3, this.strAfm4];

    let lawyerId = this.storageService.getUser().id;
    
    this.userService.postUserContract(afms, text, lawyerId).subscribe({
      next: (data) => {
        this.message = data.message;
        this.router.navigate(['/my-contract']);
      },
      error: (err) => {
        this.message = err.error.message;
      //   setTimeout(() => {
      //     this.message = '';
      // }, 10000);
        // window.alert([this.message]);
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

