import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserContract } from '../_helpers/contract';
import { ContractService } from '../_services/contract.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-view-contract-notary',
  templateUrl: './view-contract-notary.component.html',
  styleUrls: ['./view-contract-notary.component.css']
})
export class ViewContractNotaryComponent {
  isLoggedIn = false;
  isNotary = false;
  message = '';
  contractId?: number;

  contract: UserContract = {
    text: '',
    dateCreated: '',
    dateApproved: '',
    status: '',
    members: []
  };

  member1 = '';
  member2 = '';
  member3 = '';
  member4 = '';

  constructor(
    private storageService: StorageService,
    private contractService: ContractService,
    private router: Router) {}

    ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn();
  
      if (!this.isLoggedIn) {
        this.router.navigateByUrl('/login');
      } else {
          this.isNotary = this.storageService.isNotary();
          if (!this.isNotary) {
            this.router.navigateByUrl('/home');
          } else {
              this.contractId = this.storageService.getContractId();
              this.contractService.viewContractNotary(this.contractId!).subscribe({
              next: (data) => {
                this.contract = data;
                this.member1 = this.contract.members[0];
                this.member2 = this.contract.members[1];
                this.member3 = this.contract.members[2];
                this.member4 = this.contract.members[3];
            },
            error: (err) => {
              this.message = err.error.message;
              window.alert([this.message]);
              this.router.navigate(['/home']);
              if (err.error) {
                // this.content = JSON.parse(err.error).message;
              } else {
                this.message = 'Error with status: ' + err.status;
              }
            },
          });
        }
      }
      
    }

    approveContract(contractId: number) {
      this.contractService.approveContract(contractId).subscribe((data) => {})
      window.location.reload();
    }
}
