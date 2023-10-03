import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isUserLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  showError:boolean = false;

  constructor(public authService: AuthService) {}


  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.isUserLoggedIn = true;
    } else {
      this.isLoginFailed = true;
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 2000);
    }
  }
}
