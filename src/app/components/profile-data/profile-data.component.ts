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

  constructor(private router: Router, private userService: UserService, private profileService: ProfileService) { }

  guardarDatosPerfil() {
    if (this.userService.loggedInUserName) {
      const data = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        edad: this.edad,
        aficiones: this.aficiones,
        poblacion: this.poblacion
      };
      
      this.profileService.saveProfileData(data, this.userService.loggedInUserName);

      localStorage.setItem('perfil_' + this.userService.loggedInUserName, JSON.stringify(data));


      this.nombre = null;
      this.apellidos = null;
      this.edad = null;
      this.aficiones = null;
      this.poblacion = null;

    }
  }
}
