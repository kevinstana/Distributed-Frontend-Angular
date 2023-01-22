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

  deleteContract(contractId: number) {
    this.contractService.deleteContract(contractId).subscribe((data) => {});
    window.location.reload();
  }

  forceDelete(contractId: number) {
    this.contractService.forceDeleteContract(contractId).subscribe((data) => {});
    window.location.reload();
  }

  viewContractNotary(contractId: number) {
    this.storageService.saveContractId(contractId);
    this.router.navigate(['/viewContract']);
  }
}
