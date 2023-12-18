import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component {
  formLogin: FormGroup;

  constructor(public userService: UserService, private router: Router, private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then((response: any) => {
        if (this.userService.isLoggedIn) {
          this.handleSuccessfulLogin('Inicio de sesión exitoso.');
        }
      })
      .catch((error: any) => {
        this.handleLoginError('Error al iniciar sesión. Asegúrate de que el correo electrónico y la contraseña sean correctos.', error);
      });
  }

  private handleSuccessfulLogin(message: string) {
    this.userService.setSuccessMessage(message);
    this.handleMessageCleanup();
    this.router.navigate(['/welcome']);
  }

  private handleLoginError(errorMessage: string, error: any) {
    this.userService.setErrorMessage(errorMessage);
    this.handleMessageCleanup();
    console.error('Error al iniciar sesión:', error);
  }

  private handleMessageCleanup() {
    setTimeout(() => {
      this.userService.clearMessages();
    }, 3000);
  }


  onClick() {
    this.userService.loginWithGoogle()
      .then((response: any) => {
        if (this.userService.isLoggedIn) {
          this.userService.setSuccessMessage('Inicio de sesión con Google exitoso.');
          setTimeout(() => {
            this.userService.clearMessages();
          }, 3000);
          this.router.navigate(['/welcome']);
        }
      })
      .catch((error: any) => {
        this.userService.setErrorMessage('Error al iniciar sesión con Google.');
        setTimeout(() => {
          this.userService.clearMessages();
        }, 3000);
        console.error('Error al iniciar sesión con Google:', error);
      });
  }
}
