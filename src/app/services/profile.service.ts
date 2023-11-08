import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: AngularFirestore) {}

  saveProfileData(data: any, userId: string) {
    return this.firestore.collection('profiles').doc(userId).set(data);
  }

  getProfileData(userId: string) {
    return this.firestore.collection('profiles').doc(userId).valueChanges();
  }
}
