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
      await this.loadProfileData();
    });

    // Obtiene los datos del perfil desde el servicio
    this.profileData = this.profileDataService.getProfileData();
  }

  async loadProfileData() {
    if (this.username) {
      // Código para cargar los datos del perfil
      const userData: UserData = (await this.userService.getUserData(this.username)) || {};
      if (userData.profile) {
        this.profileDataService.setProfileData(userData.profile);
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
