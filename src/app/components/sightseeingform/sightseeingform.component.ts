import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sightseeing-form',
  templateUrl: './sightseeingform.component.html',
  styleUrls: ['./sightseeingform.component.css']
})
export class SightseeingFormComponent implements OnInit {
  nuevoPaseo = {
    poblacion: '',
    hora: '',
    Nombre: '',
    comentarios: '',
    fecha: '',
  };

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {}

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  agregarPaseo() {
    this.firestore.collection('postiks paseo').add(this.nuevoPaseo)
      .then(() => {
        console.log('Paseo agregado a Firestore');
        this.router.navigate(['/sightseeing']);

      })
      .catch(error => {
        console.error('Error al agregar el paseo', error);
      });
  }

  cancelarFormulario() {
    this.router.navigate(['/sightseeing']);
  }
}
