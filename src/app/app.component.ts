import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SPRINT9';
  isLoggedIn = false;
  loggedInUserName: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;


  constructor(private router: Router, public userService: UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.updateLoginStatus();
      }
    });
  }

  ngOnInit(): void {

    this.updateLoginStatus();
    this.userService.loginStatusChanged.subscribe(() => {

      this.updateLoginStatus();
    });
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.userService.isLoggedInUser();
    this.loggedInUserName = this.userService.getLoggedInUserName();
   
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
