import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  isUserLoggedIn: boolean = false;
  isRegistrationFailed: boolean = false;
  showError:boolean = false;

  constructor(public authService: AuthService, private Router: Router ) {}

  register(): void {
    if (this.authService.register(this.username, this.password)) {
      this.Router.navigate(['/welcome']);

      this.isUserLoggedIn = true;

      this.username = '';
      this.password = '';
    } else {

      this.isRegistrationFailed = true;
    }
  }

}
