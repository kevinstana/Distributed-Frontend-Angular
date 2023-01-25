import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../_helpers/contract';
import { ContractService } from '../_services/contract.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent {
  isLoggedIn = false;
  contractList?: Contract[] = [];

  isAdmin = false;
  isNotary = false;

  message = '';

  constructor(
    private contractService: ContractService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
        this.isAdmin = this.storageService.isAdmin();
        this.isNotary = this.storageService.isNotary();
        
        if (!this.isAdmin && !this.isNotary) {
          this.router.navigateByUrl('/home');
        } else {
            this.contractService.getContractList().subscribe({
            next: (data) => {
            this.contractList = data;
          },
          error: (err) => {
            console.log(err);
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

  deleteContract(contract: Contract) {
    if(confirm("Delete contract with id " + contract.id + "?")) {
      this.contractService.deleteContract(contract.id).subscribe((data) => {
      });
  
      const index = this.contractList!.indexOf(contract, 0);
      if (index > -1) {
        this.contractList!.splice(index, 1);
      }
    }
  }

  forceDeleteContract(contract: Contract) {
    if(confirm("Delete contract with id " + contract.id + "?")) {
      this.contractService.forceDeleteContract(contract.id).subscribe((data) => {
    
      });
      const index = this.contractList!.indexOf(contract, 0);
      if (index > -1) {
        this.contractList!.splice(index, 1);
      }
    }
  }

  viewContractNotary(contractId: number) {
    this.storageService.saveContractId(contractId);
    this.router.navigate(['/view-contract']);
  }
}
