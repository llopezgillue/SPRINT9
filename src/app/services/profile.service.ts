import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  saveProfileData(data: any, username: string) {
    const profileData = this.getProfileData(username) || {}; // Obtén los datos existentes si los hay
    // Combina los datos existentes con los nuevos datos
    const updatedData = { ...profileData, ...data };
    localStorage.setItem(`profileData_${username}`, JSON.stringify(updatedData));
  }

  getProfileData(username: string) {
    const data = localStorage.getItem(`profileData_${username}`);
    return data ? JSON.parse(data) : null;
  }
}
