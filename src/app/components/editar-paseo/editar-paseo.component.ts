import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component } from '@angular/core';

// Define una interfaz para la estructura de datos del paseo
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
        // Carga los datos del paseo cuando se inicializa el componente
        this.cargarDatosPaseo();
      }
    });
  }

  cargarDatosPaseo() {
    // Asegúrate de que tengas un ID de paseo válido
    if (!this.paseoId) {
      console.error('ID de paseo no válido');
      return;
    }

    // Obtén el documento del paseo desde Firestore
    this.Firestore.collection('postiks paseo').doc(this.paseoId).get()
      .subscribe((doc) => {
        if (doc.exists) {
          const data = doc.data() as PaseoData; // Utiliza la interfaz para el tipo de datos
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
    // Verifica que tengas un ID de paseo válido
    if (!this.paseoId) {
      console.error('ID de paseo no válido');
      return;
    }

    // Define los datos a actualizar utilizando la interfaz PaseoData
    const data: PaseoData = {
      Nombre: this.nombreDelPaseo,
      fecha: this.fechaDelPaseo,
      hora: this.horaDelPaseo,
      comentarios: this.comentariosDelPaseo
    };

    // Actualiza el documento en Firestore
    this.Firestore.collection('postiks paseo').doc(this.paseoId).update(data)
      .then(() => {
        console.log('Cambios guardados correctamente');
        // Después de guardar los cambios, redirige a la pantalla anterior
        this.router.navigate(['/sightseeing']);
      })
      .catch(error => {
        console.error('Error al guardar los cambios:', error);
      });
  }
}

