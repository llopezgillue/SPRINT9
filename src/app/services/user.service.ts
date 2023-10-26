import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = false;
  public loggedInUserName: string | null = null;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private auth: Auth,private cookieService: CookieService) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.loggedInUserName = user.displayName;
      } else {
        this.isLoggedIn = false;
        this.loggedInUserName = null;
      }
      this.loginStatusChanged.emit(this.isLoggedIn);
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.auth.signOut();
        this.setSuccessMessage('El registro fue exitoso.');
      })
      .catch((error) => {
        this.setErrorMessage('Ocurrió un error en el registro. Asegúrate de que el usuario no esté registrado anteriormente y la contraseña sea válida.');
        console.error('Error al registrar:', error);
      });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const atIndex = email.indexOf('@');
        this.loggedInUserName = email.slice(0, atIndex)
        this.setSuccessMessage('Inicio de sesión exitoso.');
        this.isLoggedIn = true;
      })
      .catch((error) => {
        this.setErrorMessage('Error al iniciar sesión. Asegúrate de que el correo electrónico y la contraseña sean correctos.');
        console.error('Error al iniciar sesión:', error);
      });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => {

        this.setSuccessMessage('Inicio de sesión con Google exitoso.');
      })
      .catch((error) => {
        this.setErrorMessage('Error al iniciar sesión con Google.');
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  logout() {

    this.cookieService.delete('username');
    return signOut(this.auth)
      .then(() => {
        this.isLoggedIn = false;
        this.loggedInUserName = null;
        this.setSuccessMessage('Cierre de sesión exitoso.');
        this.loginStatusChanged.emit(this.isLoggedIn);
      })
      .catch((error) => {
        this.setErrorMessage('Error al cerrar sesión.');
        console.error('Error al cerrar sesión:', error);
      });
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
    this.clearMessagesAfterTimeout();
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
    this.clearMessagesAfterTimeout();
  }

  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  private clearMessagesAfterTimeout() {
    setTimeout(() => {
      this.clearMessages();
    }, 3000);
  }
}
