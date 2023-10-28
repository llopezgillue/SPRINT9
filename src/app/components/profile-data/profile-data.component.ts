import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { PhotoService } from '../../services/photo.service';

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
  profileData: any;
  selectedFile: File | null = null;


  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private cookieService: CookieService,
    private PhotoService: PhotoService
  ) { }

  ngOnInit() {


    this.profileData = null;
    if (this.cookieService.check('username')) {
      const usernameCookie = this.cookieService.get('username');
      console.log('Nombre de usuario desde la cookie:', usernameCookie);
    } else {
      console.log('No se encontró un nombre de usuario en la cookie.');
    }

    const usernameCookie = this.cookieService.get('username');
    if (usernameCookie) {
      this.userService.loggedInUserName = usernameCookie;
    }

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
        poblacion: this.poblacion,
        

      };

      this.profileService.saveProfileData(data, this.userService.loggedInUserName);

      this.cookieService.delete('username');
      this.cookieService.set('username', this.userService.loggedInUserName);

      localStorage.setItem('perfil_' + this.userService.loggedInUserName, JSON.stringify(data));

      this.router.navigate(['perfil', this.userService.loggedInUserName]);

    }
  }

  onFileSelected(event: any) {
debugger
    this.selectedFile = event.target.files[0];
    this.PhotoService.setSelectedPhoto(this.selectedFile);
    console.log('Archivo seleccionado:', this.selectedFile);
  }
}
