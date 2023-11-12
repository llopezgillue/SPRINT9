import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  profileData: any;
  userId: string | null = null;
  userName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName || '';
        this.loadProfileData();
      }
    });
  }

  loadProfileData() {
    if (this.userId) {
      this.profileService.getProfileData(this.userId).subscribe((data: any) => {
        console.log('Data from Firestore:', data);
        if (data) {
          this.profileData = data;
          console.log('Profile data loaded:', this.profileData);
        } else {
          console.warn('No profile data found for user ID:', this.userId);
        }
      }, (error) => {
        console.error('Error fetching profile data:', error);
      });
    }
  }
  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }
}
