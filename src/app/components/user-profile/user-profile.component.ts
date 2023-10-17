import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string | null = null;

  constructor(private route: ActivatedRoute,  private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log('Username from params:', params['username']);
      this.username = params['username'];
    });
  }
  // Función para editar el perfil
  editarPerfil() {
    this.router.navigate(['/profile-data']);
  }

  // Función para mostrar los datos del perfil
  mostrarDatosPerfil() {
    // Agrega aquí la lógica para mostrar los datos del perfil
  }

  // Función para ir al chat
  irAChat() {
    // Agrega aquí la lógica para ir al chat
  }
}


