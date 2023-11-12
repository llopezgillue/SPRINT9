import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileService } from '../../services/profile.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output() profileSaved = new EventEmitter<void>();

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName || '';
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

        const targetUrl = this.userName ? ['/perfil', this.userName] : ['perfil/:username'];
        console.log('Intentando navegar a:', targetUrl);

        this.router.navigate(targetUrl);
      }).catch((error) => {
        console.error('Error al guardar los datos del perfil:', error);
      });
    }
  }
}
