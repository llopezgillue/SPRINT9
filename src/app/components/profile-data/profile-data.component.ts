import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  userId: string | null = null;
  userName: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName;
        this.getProfileData();
      }
    });
  }

  getProfileData() {
    if (this.userId) {
      this.profileService.getProfileData(this.userId).subscribe((data: any) => {
        if (data) {
          this.nombre = data.nombre;
          this.apellidos = data.apellidos;
          this.edad = data.edad;
          this.aficiones = data.aficiones;
          this.poblacion = data.poblacion;
        }
      });
    }
  }

  guardarDatosPerfil() {
    if (this.userId) {
      const data = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        edad: this.edad,
        aficiones: this.aficiones,
        poblacion: this.poblacion,
      };

      this.profileService.saveProfileData(data, this.userId).then(() => {
        this.router.navigate(['/perfil', this.userName]);
      }).catch((error) => {
        console.error('Error al guardar los datos del perfil:', error);
      });
    }
  }
}
