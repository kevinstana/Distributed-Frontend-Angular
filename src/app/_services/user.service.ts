import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, CreateUser, UpdateUser, ViewUser } from '../_helpers/app-user';
import { Contract, ViewContract } from '../_helpers/contract';
import { Observable } from 'rxjs';

const API_URL = '/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  getUserList() {
    return this.http.get<User[]>(API_URL);
  }


  postUser(user: CreateUser) {
    return this.http.post<CreateUser>(API_URL, user);
  }


  getUserForChange(userId: number) {
    let url: string = `${API_URL}/${userId}`;
    return this.http.get<UpdateUser>(url);
  }


  viewProfile(userId: number) {
    let url: string = `${API_URL}/${userId}`;
    return this.http.get<ViewUser>(url);
  }


  putUser(userId: number, user: UpdateUser) {
    let url: string = `${API_URL}/${userId}`;
    return this.http.put<UpdateUser>(url, user);
  }

  
  deleteUser(userId: number) {
    let url: string = `${API_URL}/${userId}`;
    return this.http.delete<User>(url);
  }
}

