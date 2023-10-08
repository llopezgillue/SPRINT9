import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FollowMeComponent } from './components/followme/followme.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SaludParentComponent } from './components/salud-parent/salud-parent.component';
import { SaludChildComponent } from './components/salud-child/salud-child.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { AcompanantesService } from './services/acompañante.service';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    WelcomeComponent,
    SaludParentComponent,
    SaludChildComponent,
    FollowMeComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,


  ],
  providers: [AuthService, AcompanantesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
