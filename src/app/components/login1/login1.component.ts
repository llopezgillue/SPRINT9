import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    console.log('Login1Component inicializado');
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log('Inicio de sesión exitoso:', response);

        this.userService.isLoggedIn = true;

        this.router.navigate(['/welcome']);
      })
      .catch(error => console.log('Error al iniciar sesión:', error));
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log('Inicio de sesión con Google exitoso:', response);
        
        this.userService.isLoggedIn = true;

        this.router.navigate(['/welcome']);
      })
      .catch(error => console.log('Error al iniciar sesión con Google:', error));
  }
}
