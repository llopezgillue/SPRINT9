import { FollowMeComponent } from './components/followme/followme.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SaludParentComponent } from './components/salud-parent/salud-parent.component';
import { SaludChildComponent } from './components/salud-child/salud-child.component';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AcompanantesService } from './services/acompañante.service';

import { environment } from '../environments/environment';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MainComponent } from './components/main/main.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';



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
    FormularioComponent,
    MainComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),


  ],
  providers: [AuthService, AcompanantesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
