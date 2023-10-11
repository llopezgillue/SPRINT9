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
  formReg: FormGroup;
  isUserAlreadyRegistered: boolean = false;
  private registrationMessageTimer: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then((response: any) => {
        if (response.isRegistered === true) {
          // El usuario ya está registrado.
          this.isUserAlreadyRegistered = true;
          // Ocultar el mensaje después de 5 segundos (5000 ms).
          this.registrationMessageTimer = setTimeout(() => {
            this.isUserAlreadyRegistered = false;
          }, 5000);
        } else {
          // El registro fue exitoso, redirige a la página de bienvenida.
          this.router.navigate(['/welcome']);
        }
      })
      .catch(error => console.log(error));
  }
}
