import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string = '';

  constructor(public userService: UserService, private router: Router, private ngZone: NgZone) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const emailControl = this.formReg.get('email');
    if (emailControl && emailControl.value) {
      const emailValue = emailControl.value;
      if (!this.isEmail(emailValue)) {
        emailControl.setErrors({ invalidEmail: true });
        this.ngZone.run(() => {
          setTimeout(() => {
            this.isUserAlreadyRegistered = false;
            this.errorMessage = '';
          }, 5000); // Oculta el mensaje después de 5 segundos
        });
        return;
      }
    }

    if (this.formReg.valid) {
      this.userService.register(this.formReg.value)
        .then(() => {
          this.router.navigate(['/welcome']);
        })
        .catch((error: any) => {
          this.isUserAlreadyRegistered = true;
          this.errorMessage = 'Error: No se pudo completar el registro. Por favor, verifica tus datos e inténtalo de nuevo.';
          this.ngZone.run(() => {
            setTimeout(() => {
              this.isUserAlreadyRegistered = false;
              this.errorMessage = '';
            }, 5000); 
          });
        });
    }
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}
