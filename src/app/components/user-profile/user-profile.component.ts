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
  username: string = '';
  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'] || '';
      this.loadProfileData();
    });
  }

  loadProfileData() {
    if (this.username) {
      // Aquí puedes obtener la información del usuario desde Firebase (por ejemplo, Firestore) a través del servicio UserService.
      const userData = this.userService.getUserData(this.username);

      if (userData) {
        this.profileData = userData;
        console.log('Profile data loaded:', userData);
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
