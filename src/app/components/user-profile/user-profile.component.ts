import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { PhotoService } from '../../services/photo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string | null = null;
  profileData: any;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private CookieService: CookieService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params['username'];


      const storedProfile = localStorage.getItem('perfil_' + this.username);
      if (storedProfile) {
        this.profileData = JSON.parse(storedProfile);
      } else {

        this.loadProfileData();
      }
    });
  }

  loadProfileData() {
    if (this.username) {
      this.profileData = this.profileService.getProfileData(this.username);


      if (this.profileData) {
        localStorage.setItem('perfil_' + this.username, JSON.stringify(this.profileData));
      }
    }
  }

  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }

  getPhotoUrl() {
    if (this.selectedFile) {
      return URL.createObjectURL(this.selectedFile);
    }

    let selectedPhoto;

    this.photoService.selectedPhoto$.subscribe((photo: File | null) => {
      selectedPhoto = photo;
    });

    return selectedPhoto ? URL.createObjectURL(selectedPhoto) : '';
  }

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];
    this.photoService.setSelectedPhoto(this.selectedFile);
    console.log('Archivo seleccionado:', this.selectedFile);
  }

  logSelectedFile() {
    console.log('Foto seleccionada:', this.selectedFile);
  }
}
