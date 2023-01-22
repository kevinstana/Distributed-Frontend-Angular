import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser, CreateOrUpdateUser } from '../_helpers/app-user';
import { UserContract } from '../_helpers/contract';

const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get<AppUser[]>(API_URL + 'users', { responseType: 'json' });
  }

  createUser(newUser: CreateOrUpdateUser) {
    return this.http.post<CreateOrUpdateUser>(API_URL + 'registerUser', newUser);
  }

  getUpdateUser(userId: number) {
    return this.http.get<CreateOrUpdateUser>(API_URL + 'updateUser/' + userId);
  }

  putUpdateUser(userId: number, updatedUser: CreateOrUpdateUser) {
    return this.http.put<CreateOrUpdateUser>(API_URL + 'updateUser/' + userId, updatedUser);
  }

  viewLoggedInProfile(userId: number) {
    return this.http.get<AppUser>(API_URL + 'users/' + userId, { responseType: 'json' });
  }

  deleteUser(userId: number) {
    return this.http.delete<AppUser>(API_URL + 'users/' + userId, { responseType: 'json' });
  }

  getMyContract(userId: number) {
    return this.http.get<UserContract>(API_URL + 'users/' + userId + '/contract');
  }
}

