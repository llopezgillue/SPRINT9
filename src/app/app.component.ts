import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SPRINT9';
  isWelcomePage = false;
  isLoggedIn = true;
  loggedInUserName: string | null = null;
  showNavbar = true;
  healthAdvices: string[] = [];




  constructor(private router: Router, public AuthService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.showNavbar = event.url !== '/';
      }
    });
    this.AuthService.loginStatusChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.loggedInUserName = this.AuthService.getLoggedInUserName();
    });
  }

  ngOnInit(): void {

    this.updateLoginStatus();
    this.AuthService.loginStatusChanged.subscribe(() => {
      this.updateLoginStatus();
    });
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.AuthService.isLoggedInUser();
    this.loggedInUserName = this.AuthService.getLoggedInUserName();
  }

  logout(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }

}

