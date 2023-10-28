import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private selectedPhotoSource = new BehaviorSubject<File | null>(null);
  selectedPhoto$ = this.selectedPhotoSource.asObservable();

  setSelectedPhoto(photo: File | null) {
    this.selectedPhotoSource.next(photo);
  }
}
