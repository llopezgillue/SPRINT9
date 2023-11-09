import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface UserData {
  profile?: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AngularFireAuth,
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Obtener el nombre de usuario desde el objeto de usuario
        this.username = user.displayName || '';

        // Cargar y mostrar los datos del perfil
        await this.loadAndShowProfileData();
      }
    });
  }

  async loadAndShowProfileData() {
    if (this.username) {
      console.log('UserProfileComponent: Loading profile data for', this.username);

      try {
        const userData: UserData = await this.userService.getUserData(this.username).toPromise();

        if (userData.profile) {
          // Asignar datos del perfil y mostrarlos
          this.profileData = userData.profile;
          console.log('UserProfileComponent: Profile Data', this.profileData);
        } else {
          console.warn('UserProfileComponent: Profile Data is null');
        }
      } catch (error) {
        console.error('UserProfileComponent: Error fetching user data', error);
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
