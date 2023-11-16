import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcompanantesService {
  constructor(private firestore: AngularFirestore) { }

  obtenerAcompanantes(): Observable<any[]> {
    return this.firestore.collection('cuidadores').valueChanges();
  }

  buscarAcompanantesPorPoblacion(poblacion: string): Observable<any[]> {
    return this.firestore
      .collection('cuidadores', (ref) => ref.where('poblacion', '==', poblacion))
      .valueChanges();
  }
  obtenerPoblacionesDisponibles(): Observable<string[]> {
    return this.firestore.collection('cuidadores').valueChanges()
      .pipe(
        map((cuidadores: any[]) => {

          const poblaciones = [...new Set(cuidadores.map(cuidadores => cuidadores.poblacion))];
          return poblaciones;
        })
      );

  }
}
