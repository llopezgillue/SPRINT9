import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component {
  formLogin: FormGroup;

  constructor(public userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(() => {
        if (this.userService.isLoggedIn) {
          this.router.navigate(['/welcome']);
        }
      })
      .catch(error => {
        
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(() => {
        if (this.userService.isLoggedIn) {
          this.router.navigate(['/welcome']);
        }
      })
      .catch(error => {

      });
  }
}
