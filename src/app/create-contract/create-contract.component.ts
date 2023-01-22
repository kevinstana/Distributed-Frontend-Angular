import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../_services/contract.service';
import { StorageService } from '../_services/storage.service';

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

  constructor(
    private storageService: StorageService,
    private contractService: ContractService,
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

    let afms: number[] = [afm1, afm2, afm3, afm4];

    let lawyerId = this.storageService.getUser().id;
    
    this.contractService.createContract(afms, text, lawyerId).subscribe({
      next: (data) => {
        this.message = data.message;
        this.router.navigate(['/myContract']);
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

