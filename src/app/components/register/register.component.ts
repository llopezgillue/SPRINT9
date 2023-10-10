import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  userType: string = 'user'; // Por defecto, registra como usuario
  isUserLoggedIn: boolean = false;
  isRegistrationFailed: boolean = false;
  showError: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  register(): void {
    if (this.authService.register(this.username, this.password)) {

      const userData = {
        username: this.username,
        userType: this.userType,
       
      };

      this.firestore
        .collection('users')
        .doc(this.username)
        .set(userData)
        .then(() => {
          this.router.navigate(['/welcome']);
          this.isUserLoggedIn = true;
          this.username = '';
          this.password = '';
        })
        .catch((error) => {
          console.error('Error al registrar en Firestore:', error);
          this.isRegistrationFailed = true;
        });
    } else {
      this.isRegistrationFailed = true;
    }
  }
}
