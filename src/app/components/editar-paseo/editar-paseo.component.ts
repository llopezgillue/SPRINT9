import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component } from '@angular/core';


@Component({
  selector: 'app-editar-paseo',
  templateUrl: './editar-paseo.component.html',
  styleUrls: ['./editar-paseo.component.css']
})
export class EditarPaseoComponent {
  nombreDelPaseo: string = '';
  fechaDelPaseo: string = '';
  horaDelPaseo: string = '';
  comentariosDelPaseo: string = '';
  paseoId: string = ''; // Asigna un valor inicial

  constructor(private Firestore: AngularFirestore) {}

  guardarCambios() {
    // Verifica que tengas un ID de paseo válido
    if (!this.paseoId) {
      console.error('ID de paseo no válido');
      return;
    }

    // Define los datos a actualizar
    const data = {
      nombre: this.nombreDelPaseo,
      fecha: this.fechaDelPaseo,
      hora: this.horaDelPaseo,
      comentarios: this.comentariosDelPaseo
    };

    // Actualiza el documento en Firestore
    this.Firestore.collection('paseos').doc(this.paseoId).update(data)
      .then(() => {
        console.log('Cambios guardados correctamente');
      })
      .catch(error => {
        console.error('Error al guardar los cambios:', error);
      });
  }
}
