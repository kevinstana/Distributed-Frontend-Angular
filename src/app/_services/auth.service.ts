import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const AUTH_API = '/api/';
// const AUTH_API = 'http://localhost:9090/api/';
// const AUTH_API = environment.backendUrl;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
  
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string | null | undefined, 
        password: string | null | undefined): Observable<any> {      
    return this.http.post(AUTH_API + 'login', {username, password}, {observe: 'response'});
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  // }
}
