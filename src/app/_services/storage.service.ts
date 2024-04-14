import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizedUser } from '../_helpers/auth-user';

const USER_KEY = 'authorized-user';
const USER_JWT = 'jwt'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveJwt(jwt: string): void {
    var splitToken = jwt.split(' ');
    localStorage.setItem(USER_JWT, splitToken[1]);
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

  public getJwt(): string | null{
    return localStorage.getItem(USER_JWT);
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

}
