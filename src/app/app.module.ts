import { FollowMeComponent } from './components/followme/followme.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SaludParentComponent } from './components/salud-parent/salud-parent.component';
import { SaludChildComponent } from './components/salud-child/salud-child.component';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AcompanantesService } from './services/acompañante.service';

import { environment } from '../environments/environment';
import { FormularioComponent } from './components/formulario/formulario.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { UserService } from './services/user.service';

import { Login1Component } from './components/login1/login1.component';
import { Register1Component } from './components/register1/register1.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    SaludParentComponent,
    SaludChildComponent,
    FollowMeComponent,
    FormularioComponent,
    Register1Component,
    Login1Component,
    UserProfileComponent,
    ProfileDataComponent,


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
  providers: [UserService, AcompanantesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
