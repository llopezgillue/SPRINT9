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
    if (paseoId) {
      console.log("Eliminando paseo con ID:", paseoId);

      return this.firestore.collection('postiks paseo').doc(paseoId).delete()
        .then(() => {
          console.log('Paseo eliminado de la base de datos');
        })
        .catch(error => {
          console.error('Error al eliminar el paseo de la base de datos', error);
        });
    } else {
      console.error('ID de paseo no válido');
      return Promise.reject('ID de paseo no válido');
    }
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
