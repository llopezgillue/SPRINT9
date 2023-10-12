import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component {
  isRegistered: boolean = true;
  formReg: FormGroup;
  isUserAlreadyRegistered: boolean = false;

  constructor(public userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(() => {
        // Registro exitoso
        this.userService.setSuccessMessage('Registro exitoso.');
        setTimeout(() => {
          this.userService.clearMessages();
        }, 5000);
        this.userService.setLoggedInState(false); // Establecer isLoggedIn en false
        this.router.navigate(['/welcome']);
      })
      .catch(error => {
        // Registro no exitoso
        this.userService.setErrorMessage('Error en el registro. Asegúrate de que el correo electrónico y la contraseña sean correctos.');
        setTimeout(() => {
          this.userService.clearMessages();
        }, 5000);
        console.error('Error en el registro:', error);
      });
  }

}
