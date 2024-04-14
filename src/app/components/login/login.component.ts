import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { loginForm } from '../../validators/login-validators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router) {}

  form: FormGroup = loginForm;
  loggedIn: boolean = false;
  errorMessage: string = '';  

  ngOnInit(): void {
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login);

    if (this.loggedIn) {
      this.router.navigate(['']);
    }
  }

  submitForm(): void {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.storageService.changeLogin(true);
        this.router.navigate(['']);
      },
      error: (err) => {
        if (err.error.message == undefined) {
          // this.errorMessage = 'Something went wrong';
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err.error.message;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.storageService.currentLogin.subscribe(login => this.loggedIn = login).unsubscribe();
    this.form.reset();
  }

}
