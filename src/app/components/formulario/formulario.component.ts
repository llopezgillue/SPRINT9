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
    edad: 0,
    horasDeseadas: 0,
    comentarios: ''
  };

  enviarFormulario() {

    console.log('Formulario enviado:', this.solicitud);


}
}
