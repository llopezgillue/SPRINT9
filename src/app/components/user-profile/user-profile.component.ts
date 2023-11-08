import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string = ''; // Ahora se declara como una cadena, no como string | null
  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'] || ''; // Ahora se asigna una cadena vacía en lugar de null
      this.loadProfileData();
    });
  }

  loadProfileData() {
    if (this.username) {
      this.profileService.getProfileData(this.username).subscribe((data) => {
        if (data) {
          const userData = this.userService.getUserData(this.username) || {};
          const updatedUserData = { ...userData, profile: data };
          this.userService.setUserData(this.username, updatedUserData);
        }
      });
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
