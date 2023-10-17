import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent {
  nombre: string | null = null;
  apellidos: string | null = null;
  edad: number | null = null;
  aficiones: string[] = [];
  poblacion: string | null = null;

  constructor(private Router: Router) { }

  guardarDatosPerfil() {
    // Aquí puedes agregar la lógica para guardar los datos del perfil en tu sistema.
    // Por ejemplo, puedes enviar una solicitud HTTP a un servidor para guardar los datos.
    // También puedes almacenar los datos localmente en el navegador si es necesario.
    // Recuerda adaptar esta función según las necesidades de tu aplicación.
  }
}



