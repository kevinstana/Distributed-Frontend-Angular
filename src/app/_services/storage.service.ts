import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  // User handling
  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  // jwt
  public getBearerToken(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.stringify(user[4]).toString;
    }
  }

  // roles and loggin check
  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public isAdmin(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      let userJson = JSON.parse(user);
      if (userJson.roles.includes('ADMIN')) {
        return true;
      }
    }
    
    return false;
  }

  public isNotary(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      let userJson = JSON.parse(user);
      if (userJson.roles.includes('NOTARY')) {
        return true;
      }
    }
    
    return false;
  }

  public isLawyer(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      let userJson = JSON.parse(user);
      if (userJson.roles.includes('LAWYER')) {
        return true;
      }
    }
    
    return false;
  }

  public isClient(): boolean {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      let userJson = JSON.parse(user);
      if (userJson.roles.includes('CLIENT')) {
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
}
