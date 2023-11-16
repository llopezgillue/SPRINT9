import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component } from '@angular/core';


interface PaseoData {
  Nombre: string;
  fecha: string;
  hora: string;
  comentarios: string;
}

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
  paseoId: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private Firestore: AngularFirestore) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.paseoId = id;

        this.cargarDatosPaseo();
      }
    });
  }

  cargarDatosPaseo() {

    if (!this.paseoId) {
      console.error('ID de paseo no válido');
      return;
    }


    this.Firestore.collection('postiks paseo').doc(this.paseoId).get()
      .subscribe((doc) => {
        if (doc.exists) {
          const data = doc.data() as PaseoData;
          this.nombreDelPaseo = data.Nombre;
          this.fechaDelPaseo = data.fecha;
          this.horaDelPaseo = data.hora;
          this.comentariosDelPaseo = data.comentarios;
        } else {
          console.error('El documento del paseo no existe');
        }
      });
  }

  guardarCambios() {

    if (!this.paseoId) {
      console.error('ID de paseo no válido');
      return;
    }


    const data: PaseoData = {
      Nombre: this.nombreDelPaseo,
      fecha: this.fechaDelPaseo,
      hora: this.horaDelPaseo,
      comentarios: this.comentariosDelPaseo
    };


    this.Firestore.collection('postiks paseo').doc(this.paseoId).update(data)
      .then(() => {
        console.log('Cambios guardados correctamente');

        this.router.navigate(['/sightseeing']);
      })
      .catch(error => {
        console.error('Error al guardar los cambios:', error);
      });
  }
}

