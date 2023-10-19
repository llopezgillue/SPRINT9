import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent {
  nombre: string | null = null;
  apellidos: string | null = null;
  edad: number | null = null;
  aficiones: string | null = null;
  poblacion: string | null = null;

  constructor(private Router: Router, private UserService: UserService, private ProfileService: ProfileService) { }

  guardarDatosPerfil() {
    if (this.UserService.loggedInUserName) {
      const data = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        edad: this.edad,
        aficiones: this.aficiones,
        poblacion: this.poblacion
      };

      // Llama al servicio para guardar los datos del perfil
      this.ProfileService.saveProfileData(data, this.UserService.loggedInUserName);

      // Guarda también los datos en el Local Storage
      localStorage.setItem('perfil_' + this.UserService.loggedInUserName, JSON.stringify(data));

      // Restablece los campos a nulos después de guardar los datos
      this.nombre = null;
      this.apellidos = null;
      this.edad = null;
      this.aficiones = null;
      this.poblacion = null;
    }
  }
}
