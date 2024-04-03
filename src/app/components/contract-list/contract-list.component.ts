import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../_helpers/contract';
import { ContractService } from '../../_services/contract.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent {
  contractList?: Contract[] = [];
  admin: boolean = false;
  notary: boolean = false;
  message: string = '';

  constructor(
    private contractService: ContractService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.admin = this.storageService.isAdmin();
    this.notary = this.storageService.isNotary();
    
    if (!this.admin && !this.notary) {
      this.router.navigateByUrl('');
    } else {
      this.contractService.getContracts().subscribe({
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

  viewContractNotary(contractId: number) {
    this.router.navigate(['/contract', contractId]);
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

}
