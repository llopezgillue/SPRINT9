import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { SocialComponent } from './components/social/social.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FollowmeComponent } from './components/followme/followme.component';
import { SaludParentComponent } from './components/salud-parent/salud-parent.component';
import { SaludChildComponent } from './components/salud-child/salud-child.component';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    SocialComponent,
    WelcomeComponent,
    FollowmeComponent,
    SaludParentComponent,
    SaludChildComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
