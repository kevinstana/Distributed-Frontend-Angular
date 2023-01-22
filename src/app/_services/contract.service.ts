import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contract, UserContract } from "../_helpers/contract";

const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})export class ContractService {

    constructor(private http: HttpClient) {}

      getContractList(): Observable<Contract[]> {
        return this.http.get<Contract[]>(API_URL + 'contracts');
      }

      createContract(afm: number[], text: string, lawyerId: number): Observable<any> {
        return this.http.post(API_URL + 'users/' + lawyerId + '/contract', {afm, text}, httpOptions);
      }

      approveContract(contractId: number) {
        return this.http.put<Contract>(API_URL + 'contracts/' + contractId, null);
      }

      answerContract(userId: number) {
        return this.http.put<Contract>(API_URL + 'users/' + userId + '/contract', null);
      }

      viewContractNotary(contractId: number) {
        return this.http.get<UserContract>(API_URL + 'contracts/' + contractId);
      }

      deleteContract(contractId: number) {
        return this.http.delete<Contract>(API_URL + 'contracts/' + contractId);
      }

      forceDeleteContract(contractId: number) {
        return this.http.delete<Contract>(API_URL + 'forceDeleteContract/' + contractId);
      }
}