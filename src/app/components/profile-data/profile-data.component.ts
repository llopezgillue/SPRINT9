import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  nombre: string | null = null;
  apellidos: string | null = null;
  edad: number | null = null;
  aficiones: string | null = null;
  poblacion: string | null = null;

  constructor(private router: Router, private userService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    if (this.userService.loggedInUserName) {
      const storedData = localStorage.getItem('perfil_' + this.userService.loggedInUserName);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.nombre = parsedData.nombre;
        this.apellidos = parsedData.apellidos;
        this.edad = parsedData.edad;
        this.aficiones = parsedData.aficiones;
        this.poblacion = parsedData.poblacion;
      }
    }
  }

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

      this.router.navigate(['perfil', this.userService.loggedInUserName]);
    }
  }
}
