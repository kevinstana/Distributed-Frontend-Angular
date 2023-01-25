import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser, CreateOrUpdateUser } from '../_helpers/app-user';
import { Contract, UserContract } from '../_helpers/contract';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get<AppUser[]>(API_URL);
  }

  postUser(newUser: CreateOrUpdateUser) {
    return this.http.post<CreateOrUpdateUser>(API_URL, newUser);
  }

  getOneUser(userId: number) {
    return this.http.get<CreateOrUpdateUser>(`${API_URL}/${userId}`);
  }

  putUser(userId: number, updatedUser: CreateOrUpdateUser) {
    return this.http.put<CreateOrUpdateUser>(`${API_URL}/${userId}`, updatedUser);
  }

  deleteUser(userId: number) {
    return this.http.delete<AppUser>(`${API_URL}/${userId}`);
  }

  getUserContract(userId: number) {
    return this.http.get<UserContract>(`${API_URL}/${userId}/contract`);
  }

  postUserContract(afm: string[], text: string, lawyerId: number): Observable<any> {
    return this.http.post(`${API_URL}/${lawyerId}/contract`, {afm, text}, httpOptions);
  }

  answerUserContract(userId: number) {
    return this.http.put<Contract>(`${API_URL}/${userId}/contract`, null);
  }
}

