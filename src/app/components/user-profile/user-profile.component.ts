import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProfileDataService } from '../../services/profile-data.service';

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
    private profileDataService: ProfileDataService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.username = params['username'] || '';

      console.log('UserProfileComponent: Username', this.username);

      // Limpia los datos del perfil actual en el servicio
      this.profileDataService.clearProfileData();

      console.log('UserProfileComponent: Cleared profile data');

      // Cargar los datos del perfil del usuario actual
      await this.loadProfileData();

      // Ahora, los datos del perfil deberían estar disponibles
      this.profileData = this.profileDataService.getProfileData();

      console.log('UserProfileComponent: Profile Data', this.profileData);
    });
  }

  async loadProfileData() {
    if (this.username) {
      console.log('UserProfileComponent: Loading profile data for', this.username);

      const userData: UserData = (await this.userService.getUserData(this.username)) || {};
      if (userData.profile) {
        // Actualiza el servicio ProfileDataService con los datos del perfil
        this.profileDataService.setProfileData(userData.profile);

        console.log('UserProfileComponent: Set profile data', userData.profile);
      } else {
        console.log('UserProfileComponent: No profile data found');
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
