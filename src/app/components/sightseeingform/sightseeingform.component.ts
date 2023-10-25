import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sightseeingform',
  templateUrl: './sightseeingform.component.html',
  styleUrls: ['./sightseeingform.component.css'],
})
export class SightseeingFormComponent implements OnInit {
  paseo: any = {}; // Declarar el objeto para almacenar los datos del paseo.

  constructor(
    private Firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.Firestore.collection('postiks paseo').doc(id).get().subscribe((doc) => {
          this.paseo = doc.data();
        });
      }
    });
  }

  guardarCambios() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.Firestore.collection('postiks paseo').doc(id).set(this.paseo).then(() => {
          console.log('Paseo actualizado en Firestore');
          this.router.navigate(['/sightseeing']);
        });
      }
    });
  }

  cancelarEdicion() {
    this.router.navigate(['/sightseeing']);
  }
}
