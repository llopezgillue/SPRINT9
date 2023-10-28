import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private photoUrl: string | undefined;

  setPhotoUrl(url: string) {
    this.photoUrl = url;
  }

  getPhotoUrl(): string | undefined {
    return this.photoUrl;
  }
}
