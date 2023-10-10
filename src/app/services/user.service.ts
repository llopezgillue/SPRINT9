import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn = false;
  private loggedInUserName: string | null = null;

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
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth).then(() => {

      this.isLoggedIn = false;
      this.loggedInUserName = null;
     
      this.loginStatusChanged.emit(this.isLoggedIn);
    }).catch((error) => {

      console.error('Error al cerrar sesión:', error);
    });
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }
}
