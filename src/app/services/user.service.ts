import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = false;
  public loggedInUserName: string | null = null;
  public isLoggedInSuccessfully = false;
  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private auth: Auth) {
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
        this.clearMessages();
        this.successMessage = 'El registro fue exitoso.';
        this.errorMessage = null;
      })
      .catch((error) => {
        this.clearMessages();
        this.errorMessage = 'Ocurrió un error en el registro. Asegúrate de que el usuario no esté registrado anteriormente y la contraseña sea válida.';
        this.successMessage = null;
        console.error('Error al registrar:', error);
      });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.clearMessages();
        this.successMessage = 'Inicio de sesión exitoso.';
        this.errorMessage = null;
        this.isLoggedIn = true;  // Establece isLoggedIn en true después del inicio de sesión exitoso
      })
      .catch((error) => {
        this.clearMessages();
        this.errorMessage = 'Error al iniciar sesión. Asegúrate de que el correo electrónico y la contraseña sean correctos.';
        this.successMessage = null;
        console.error('Error al iniciar sesión:', error);
      });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => {
        this.clearMessages();
        this.successMessage = 'Inicio de sesión con Google exitoso.';
        this.errorMessage = null;
      })
      .catch((error) => {
        this.clearMessages();
        this.errorMessage = 'Error al iniciar sesión con Google.';
        this.successMessage = null;
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  logout() {
    return signOut(this.auth)
      .then(() => {
        this.isLoggedIn = false;
        this.loggedInUserName = null;
        this.successMessage = 'Cierre de sesión exitoso.';
        this.errorMessage = null;
        this.loginStatusChanged.emit(this.isLoggedIn);
      })
      .catch((error) => {
        this.errorMessage = 'Error al cerrar sesión.';
        this.successMessage = null;
        console.error('Error al cerrar sesión:', error);
      });
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  setLoggedInSuccessfully() {
    this.isLoggedInSuccessfully = true;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  setLoggedInState(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }
}
