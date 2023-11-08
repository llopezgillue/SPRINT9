import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private profileData: any = null;

  setProfileData(data: any) {
    this.profileData = data;
  }

  getProfileData(): any {
    return this.profileData;
  }
}
