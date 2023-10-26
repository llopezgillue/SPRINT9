import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: File): Observable<string> {
    const filePath = `user-profile-images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Observable((observer) => {
      task.then(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          observer.next(url);
          observer.complete();
        });
      });
    });
  }
}
