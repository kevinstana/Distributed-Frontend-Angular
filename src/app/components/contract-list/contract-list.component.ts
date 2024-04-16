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
  clickedDelete: boolean = false;
  clickeForcedDelete: boolean = false;
  tmpIndex: number = -1;
  tmpId: number = -1;

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
        },
      });
    }
  }

  viewContractNotary(contractId: number) {
    this.router.navigate(['/contract', contractId]);
  }

  deleteContractt(contract: Contract) {
    if(confirm("Delete contract with id " + contract.id + "?")) {
      this.contractService.deleteContract(contract.id).subscribe((data) => {
      });
  
      const index = this.contractList!.indexOf(contract, 0);
      if (index > -1) {
        this.contractList!.splice(index, 1);
      }
    }
  }

  deleteContract(answer?: boolean | null): void {
    this.message = '';

    if (answer) {
      this.contractService.deleteContract(this.tmpId).subscribe({
        next: (data) => {
          this.contractList?.splice(this.tmpIndex, 1);
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

  forceDeleteContract(answer?: boolean | null): void {
    this.message = '';

    if (answer) {
      this.contractService.forceDeleteContract(this.tmpId).subscribe({
        next: (data) => {
          this.contractList?.splice(this.tmpIndex, 1);
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

  onClickDelete(contractId: number, index: number) {
    this.clickedDelete = true;
    this.message = `Delete contract with id: ${contractId}?`

    this.tmpIndex = index;
    this.tmpId = contractId;
  }

  onClickForceDelete(contractId: number, index: number) {
    this.clickeForcedDelete = true;
    this.message = `Force Delete contract with id: ${contractId}?`

    this.tmpIndex = index;
    this.tmpId = contractId;
  }

  ngOnDestroy(): void {
    this.clickedDelete = false;
    this.message = '';

    this.tmpIndex = -1;
    this.tmpId = -1;
  }

}
