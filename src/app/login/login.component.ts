import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.app.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.error.message == undefined) {
          this.errorMessage = 'Server is down';
        } else {
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
