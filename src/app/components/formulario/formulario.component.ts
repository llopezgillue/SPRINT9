import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  solicitud = {
    nombre: '',
    apellidos: '',
    edad: '',
    horasDeseadas: '',
    comentarios: ''
  };

  enviarFormulario() {

    console.log('Formulario enviado:', this.solicitud);

    this.solicitud = {
      nombre: '',
      apellidos: '',
      edad: '',
      horasDeseadas: '',
      comentarios: ''

    }
  }
}
