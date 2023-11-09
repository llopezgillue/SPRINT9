import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';  // Cambio en la importación

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = false;
  public loggedInUser: { name: string | null, id: string | null } = { name: null, id: null };
  public successMessage: string | null = null;
  public errorMessage: string | null = null;

  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.loggedInUser = { name: user.displayName || null, id: user.uid || null };
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = { name: null, id: null };
      }
      this.loginStatusChanged.emit(this.isLoggedIn);
    });
  }

  register({ email, password }: any) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.auth.signOut();
        this.setSuccessMessage('El registro fue exitoso.');
      })
      .catch((error: any) => {
        this.setErrorMessage('Ocurrió un error en el registro. Asegúrate de que el usuario no esté registrado anteriormente y la contraseña sea válida.');
        console.error('Error al registrar:', error);
      });
  }

  login({ email, password }: any) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const atIndex = email.indexOf('@');
        this.loggedInUser.name = email.slice(0, atIndex);
        this.setSuccessMessage('Inicio de sesión exitoso.');
        this.isLoggedIn = true;
      })
      .catch((error: any) => {
        this.setErrorMessage('Error al iniciar sesión. Asegúrate de que el correo electrónico y la contraseña sean correctos.');
        console.error('Error al iniciar sesión:', error);
      });
  }

  loginWithGoogle() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()) 
      .then(() => {
        this.setSuccessMessage('Inicio de sesión con Google exitoso.');
      })
      .catch((error: any) => {
        this.setErrorMessage('Error al iniciar sesión con Google.');
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  logout() {
    return this.auth.signOut()
      .then(() => {
        this.isLoggedIn = false;
        this.loggedInUser.name = null;
        this.setSuccessMessage('Cierre de sesión exitoso.');
        this.loginStatusChanged.emit(this.isLoggedIn);
      })
      .catch((error: any) => {
        this.setErrorMessage('Error al cerrar sesión.');
        console.error('Error al cerrar sesión:', error);
      });
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUser.name;
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

  setUserData(userName: string, data: any) {
    this.auth.currentUser.then(async (user) => {
      if (user) {
        const userId = user.uid;

        try {
          await this.firestore.collection('users').doc(userId).set({
            userName,
            ...data
          });
          console.log('Datos de usuario guardados en Firestore');
        } catch (error) {
          console.error('Error al guardar los datos de usuario en Firestore:', error);
        }
      }
    });
  }

  getUserData(username: string): Observable<any> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Si hay un usuario autenticado
          const userData = this.firestore.collection('users').doc(username).valueChanges();
          return userData;
        } else {
          return of(null);
        }
      })
    );
  }
}
