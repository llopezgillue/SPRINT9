import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css',]
})
export class UserProfileComponent implements OnInit {
  username: string | null = null;
  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];

      // Intenta cargar los datos del perfil desde el Local Storage
      const storedProfile = localStorage.getItem('perfil_' + this.username);
      if (storedProfile) {
        this.profileData = JSON.parse(storedProfile);
      } else {
        // Si no se encuentra en el Local Storage, carga desde el servicio
        this.loadProfileData();
      }
    });
  }

  loadProfileData() {
    if (this.username) {
      this.profileData = this.profileService.getProfileData(this.username);

      // Si se obtienen datos del servicio, guárdalos en el Local Storage
      if (this.profileData) {
        localStorage.setItem('perfil_' + this.username, JSON.stringify(this.profileData));
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }

 
}
