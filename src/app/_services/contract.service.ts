import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contract, UserContract } from "../_helpers/contract";

const API_URL = 'http://192.168.56.111:9090/contracts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})export class ContractService {

    constructor(private http: HttpClient) {}

      getContractList(): Observable<Contract[]> {
        return this.http.get<Contract[]>(API_URL);
      }

      approveContractNotary(contractId: number) {
        return this.http.put<Contract>(`${API_URL}/${contractId}`, null);
      }

      viewContractNotary(contractId: number) {
        return this.http.get<UserContract>(`${API_URL}/${contractId}`);
      }

      deleteContract(contractId: number) {
        return this.http.delete<Contract>(`${API_URL}/${contractId}`);
      }

      forceDeleteContract(contractId: number) {
        return this.http.delete<Contract>(`${API_URL}/${contractId}/force-delete`);
      }
}