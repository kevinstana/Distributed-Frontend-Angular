import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contract, ViewContract } from "../_helpers/contract";
import { CreateContract } from "../_helpers/contract";

const CONTRACTS_URL = '/api/contracts';
const USER_CONTRACTS_URL = '/api/users';
// const CONTRACTS_URL = 'http://localhost:9090/api/contracts';
// const USER_CONTRACTS_URL = 'http://localhost:9090/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})export class ContractService {
    constructor(private http: HttpClient) {}


      getContracts(): Observable<Contract[]> {
        return this.http.get<Contract[]>(CONTRACTS_URL);
      }


      postContract(contract: CreateContract): Observable<any> {
        // Conversion from set to array required
        // let afm because that's how the variable is recognised in the backend
        let afm: (string | null | undefined)[] = Array.from(contract.afms.values());
      
        // let text because that's how the variable is recognised in the backend
        let text: string | null | undefined = contract.text;
        let lawyerId: number = contract.lawyerId;
        let url: string = `${USER_CONTRACTS_URL}/${lawyerId}/contract`;
        return this.http.post(url, {afm, text}, httpOptions);
      }


      approveContractNotary(contractId: number) {
        let url: string = `${CONTRACTS_URL}/${contractId}`;
        return this.http.put<Contract>(url, null);
      }


      viewContractClient(userId: number) {
        let url: string = `${USER_CONTRACTS_URL}/${userId}/contract`;
        return this.http.get<ViewContract>(url);
      }


      viewContractNotary(contractId: number) {
        let url: string = `${CONTRACTS_URL}/${contractId}`;
        return this.http.get<ViewContract>(url);
      }

      
      answerUserContract(userId: number) {
        let url: string = `${USER_CONTRACTS_URL}/${userId}/contract`;
        return this.http.put<Contract>(url, null);
      }


      deleteContract(contractId: number) {
        let url: string = `${CONTRACTS_URL}/${contractId}`;
        return this.http.delete<Contract>(url);
      }

      
      forceDeleteContract(contractId: number) {
        let url: string = `${CONTRACTS_URL}/${contractId}/force-delete`;
        return this.http.delete<Contract>(url);
      }
}