import { Component } from '@angular/core';
import { AcompanantesService } from '../../services/acompañante.service';


@Component({
  selector: 'app-followme',
  templateUrl: './followme.component.html',
  styleUrls: ['./followme.component.css'],
})
export class FollowMeComponent {
  poblacion: string = '';
  resultados: any[] = [];

  constructor(private AcompanantesService: AcompanantesService) {}

  buscarPorPoblacion(): void {
    if (this.poblacion) {
      this.AcompanantesService
        .buscarAcompanantesPorPoblacion(this.poblacion)
        .subscribe(
          (data: any[]) => {
            console.log('Datos recibidos:', data);
            this.resultados = data;
          },
          (error) => {
            console.error('Error al buscar:', error);
            this.resultados = [];
          }
        );
    } else {
      this.resultados = [];
    }
  }
}
