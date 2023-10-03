import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private loggedInUserName: string | null = null;
  public showOptions = true;
  errorMessage: string | null = null;

  loginStatusChanged = new EventEmitter<boolean>();

  private registeredUsers: { username: string; password: string }[] = [];

  register(username: string, password: string): boolean {
    const existingUser = this.registeredUsers.find(
      (user) => user.username === username
    );

    if (existingUser) {
      this.errorMessage = 'El usuario ya existe, por favor introduce un nuevo usuario';
      this.clearErrorMessageAfterDelay();
      return false;
    }

    this.registeredUsers.push({ username, password });
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.registeredUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.isLoggedIn = true;
      this.loggedInUserName = username;
      this.loginStatusChanged.emit(true);
      this.showOptions = true;
      return true;
    }

    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUserName = null;
    this.loginStatusChanged.emit(false);
  }

  isLoggedInUser(): boolean {
    return this.loggedInUserName !== null;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }

  private clearErrorMessageAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = null;
    }, 2000);
  }
}
