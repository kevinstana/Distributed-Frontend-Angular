import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { ContractService } from 'src/app/_services/contract.service';
import { createContractForm } from 'src/app/validators/create-contract-validators';
import { CreateContract } from 'src/app/_helpers/contract';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit, OnDestroy {
  constructor(
    private contractService: ContractService,
    private storageService: StorageService,
    private router: Router
  ) {}

  lawyer: boolean = this.storageService.isLawyer();
  form: FormGroup= createContractForm;
  errorMessage: string = '';
  message: string = '';


  ngOnInit(): void {
    if (!this.lawyer) {
        this.router.navigate(['']);
      }
  }

  submitForm(): void {
    let memberAfms = new Set<string | null | undefined>();

    memberAfms.add(this.form.get('afm1')?.value);
    memberAfms.add(this.form.get('afm2')?.value);
    memberAfms.add(this.form.get('afm3')?.value);
    memberAfms.add(this.form.get('afm4')?.value);

    const contract: CreateContract = {
      lawyerId: this.storageService.getUser().id,
      afms: memberAfms,
      text: this.form.get('text')?.value
    }

    this.contractService.postContract(contract).subscribe({
      next: (data) => {
        this.form.reset();
        this.message = data.message;
        let id = this.storageService.getUser().id;
        console.log(id)
        this.router.navigate(['my-contract', id]);
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

  dangerOk() {
    this.message = '';
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}

