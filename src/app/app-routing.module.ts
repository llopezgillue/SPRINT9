import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SaludParentComponent } from './components/salud-parent/salud-parent.component';
import { AuthGuard } from './guard/auth.guard';
import { FollowMeComponent } from './components/followme/followme.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { Login1Component } from './components/login1/login1.component';
import { Register1Component } from './components/register1/register1.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: Login1Component },
  { path: 'register', component: Register1Component},
  { path: 'salud', component: SaludParentComponent},
  { path: 'followme', component: FollowMeComponent,canActivate: [AuthGuard]},
  { path: 'formulario', component: FormularioComponent },
  { path: 'perfil/:username', component: UserProfileComponent },
  { path: 'profile-data', component: ProfileDataComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
