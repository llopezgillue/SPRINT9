import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class SightseeingService {
  constructor(private firestore: AngularFirestore) {}

  obtenerSightseeing(): Observable<any[]> {
    return this.firestore.collection('postiks paseo').snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as any;
          data['Document ID'] = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  eliminarPaseo(documentId: string): Promise<void> {
    console.log("Eliminando paseo con ID:", documentId);
    if (documentId) {
      return this.firestore.collection('postiks paseo').doc(documentId).delete()
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
  agregarPersona(documentId: string): Promise<void> {
    console.log("Agregando persona a paseo con ID:", documentId);
    if (documentId) {
      return this.firestore.collection('postiks paseo').doc(documentId).update({
        apuntados: firebase.firestore.FieldValue.increment(1) 
      })
      .then(() => {
        console.log('Persona agregada al paseo en la base de datos');
      })
      .catch(error => {
        console.error('Error al agregar persona al paseo en la base de datos', error);
      });
    } else {
      console.error('ID de paseo no válido');
      return Promise.reject('ID de paseo no válido');
    }
  }

  restarPersona(documentId: string): Promise<void> {
    console.log("Restando persona de paseo con ID:", documentId);
    if (documentId) {
      return this.firestore.collection('postiks paseo').doc(documentId).update({
        apuntados: firebase.firestore.FieldValue.increment(-1)
      })
      .then(() => {
        console.log('Persona restada del paseo en la base de datos');
      })
      .catch(error => {
        console.error('Error al restar persona del paseo en la base de datos', error);
      });
    } else {
      console.error('ID de paseo no válido');
      return Promise.reject('ID de paseo no válido');
    }
  }
}
