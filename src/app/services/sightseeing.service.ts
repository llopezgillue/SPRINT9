import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SightseeingService {
  constructor(private firestore: AngularFirestore) {}

  obtenerSightseeing(): Observable<any[]> {
    return this.firestore.collection('postiks paseo').valueChanges();
  }
  eliminarPaseo(paseoId: string): Promise<void> {
    console.log("Eliminando paseo con ID:", paseoId);
    return this.firestore.collection('postiks paseo').doc(paseoId).delete();
  }

  buscarSightseeingPorCampo(nombreCampo: string, valorCampo: any): Observable<any[]> {
    return this.firestore
      .collection('postiks paseo', (ref) => ref.where(nombreCampo, '==', valorCampo))
      .valueChanges();
  }

  obtenerPoblacionesDisponibles(): Observable<string[]> {
    return this.firestore.collection('postiks paseo').valueChanges().pipe(
      map((sightseeing: any[]) => {
        const poblaciones = [...new Set(sightseeing.map(sightseeing => sightseeing.poblacion))];
        return poblaciones;
      })
    );
  }
}
