import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private profileData: any = null;

  constructor() {}

  setProfileData(data: any) {
    this.profileData = data;
  }

  getProfileData() {
    return this.profileData;
  }

  clearProfileData() {
    // Limpia los datos del perfil
    this.profileData = null;
  }
}
