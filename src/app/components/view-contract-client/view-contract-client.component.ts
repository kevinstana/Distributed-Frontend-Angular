import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../../_services/contract.service';
import { StorageService } from '../../_services/storage.service';
import { ViewContract } from '../../_helpers/contract';
import { Component } from '@angular/core';


@Component({
  selector: 'app-view-contract-client',
  templateUrl: './view-contract-client.component.html',
  styleUrls: ['./view-contract-client.component.css'],
})
export class ViewContractClientComponent {
  constructor(
    private contractService: ContractService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  lawyer: boolean = false;
  client: boolean = false;
  pathId: string | null = '';
  userId: number = -1;
  message: string = '';
  noContractMessage: string = '';
  myContractAnswer: string = '';

  contract: ViewContract = {
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

  ngOnInit(): void {
    this.lawyer = this.storageService.isLawyer();
    this.client = this.storageService.isClient();

    if (this.lawyer || this.client) {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.pathId = params.get('id');
      });
      
      if (this.isValidPathId()) {
        this.contractService.viewContractClient(this.userId).subscribe({
          next: (data) => {
            this.contract = data;
            this.member1 = this.contract.members[0].split(': ');
            this.member2 = this.contract.members[1].split(': ');
            this.member3 = this.contract.members[2].split(': ');
            this.member4 = this.contract.members[3].split(': ');
            this.myContractAnswer = this.contract.members[4];
          },
          error: (err) => {
            // console.log(err)
            // this.message = err.error.message;
            // window.alert([this.message]);
            // this.router.navigate(['/not-found']);
            
            if (err.error) {
              this.noContractMessage = err.error.message;
              // this.content = JSON.parse(err.error).message;
            } else {
              // this.message = 'Error with status: ' + err.status;
            }
          },
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    }
  }

  isValidPathId(): boolean {
    if (this.pathId && Number.isInteger(this.userId = Number.parseInt(this.pathId))) {
      if (this.userId > 0) {
        return true;
      }
    }

    return false;
  }

  answerContract(): void {
    this.contractService.answerUserContract(this.userId).subscribe({
      next: (data) => {
        // window.alert('You have answered successfully');
        // window.location.reload();
        this.myContractAnswer = 'Yes'; 
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

  ngOnDestroy(): void {
    // this.storageService.removeContractId();
  }

}
