import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcompanantesService {
  constructor(private firestore: AngularFirestore) {}

  obtenerAcompanantes(): Observable<any[]> {
    return this.firestore.collection('acompanantes').valueChanges();
  }

  buscarAcompanantesPorPoblacion(poblacion: string): Observable<any[]> {
    return this.firestore
      .collection('acompanantes', (ref) => ref.where('poblacion', '==', poblacion))
      .valueChanges();
  }
}
