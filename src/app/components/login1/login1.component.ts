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
    debugger
    this.userService.login(this.formLogin.value)
      .then(response => {

        if (this.userService.isLoggedIn) {
          this.userService.setSuccessMessage('Inicio de sesión exitoso.');
          setTimeout(() => {
            this.userService.clearMessages();
          }, 5000);
          this.router.navigate(['/welcome']);
        }
      })
      .catch(error => {

        this.userService.setErrorMessage('Error al iniciar sesión. Asegúrate de que el correo electrónico y la contraseña sean correctos.');
        setTimeout(() => {
          this.userService.clearMessages();
        }, 3000);
        console.error('Error al iniciar sesión:', error);
      });
  }


  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        // Verifica si el inicio de sesión con Google fue exitoso
        if (this.userService.isLoggedIn) {
          this.userService.setSuccessMessage('Inicio de sesión con Google exitoso.');
          setTimeout(() => {
            this.userService.clearMessages();
          }, 3000);
          this.router.navigate(['/welcome']);
        }
      })
      .catch(error => {
        // Muestra un mensaje de error en caso de un error durante el inicio de sesión con Google
        this.userService.setErrorMessage('Error al iniciar sesión con Google.');
        setTimeout(() => {
          this.userService.clearMessages();
        }, 3000);
        console.error('Error al iniciar sesión con Google:', error);
      });
  }
}
