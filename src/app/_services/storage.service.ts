import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizedUser } from '../_helpers/auth-user';

const USER_KEY = 'authorized-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: AuthorizedUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public getAccessToken(): string {
    let user = this.getUser();
    if (user) {
      return user.accessToken;
    }

    return '';
  }

  public isLoggedIn(): boolean {
    let user = this.getUser();
    if (user) {
      return true;
    }
    return false;
  }

  private loginSource = new BehaviorSubject<boolean>(this.isLoggedIn());
  currentLogin = this.loginSource.asObservable();
  
  changeLogin(login: boolean) {
    this.loginSource.next(login);
  }


  public isAdmin(): boolean {
    let user: AuthorizedUser = this.getUser();
    if (user) {
      if (user.roles.includes('ADMIN')) {
        return true;
      }
    }
    
    return false;
  }

  public isNotary(): boolean {
    let user: AuthorizedUser = this.getUser();
    if (user) {
      if (user.roles.includes('NOTARY')) {
        return true;
      }
    }
    
    return false;
  }

  public isLawyer(): boolean {
    let user: AuthorizedUser = this.getUser();
    if (user) {
      if (user.roles.includes('LAWYER')) {
        return true;
      }
    }
    
    return false;
  }

  public isClient(): boolean {
    let user: AuthorizedUser = this.getUser();
    if (user) {
      if (user.roles.includes('CLIENT')) {
        return true;
      }
    }
    
    return false;
  }

  // some helpers for viewing user and contract info
  public saveUpdatedUserId(userId: number): void {
    localStorage.removeItem("updateUserId");
    localStorage.setItem("updateUserId", userId.toString());
  }

  public removeUpdatedUserId(): void {
    const id = localStorage.getItem("updateUserId");
    if (id) {
      localStorage.removeItem("updateUserId");
    }
  }

  public getUpdatedUserId(): number {
    const userId = localStorage.getItem("updateUserId");
    if (userId) {
      let id: number = +userId[0];
      return id;
    }

    return -1;
  }

  public saveContractId(contractId: number): void {
    localStorage.removeItem("contractId");
    localStorage.setItem("contractId", contractId.toString());
  }

  public getContractId(): number {
    const contractId = localStorage.getItem("contractId");
    if (contractId) {
      let id: number = +contractId[0];
      return id;
    }

    return -1;
  }

  public removeContractId(): void {
    const id = localStorage.getItem("contractId");
    if (id) {
      localStorage.removeItem("contractId");
    }
  }
}
