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
  poblacionesDisponibles: string[] = [];

  constructor(private AcompanantesService: AcompanantesService) {}

  ngOnInit(): void {
    this.obtenerPoblaciones();
  }

  buscarPorPoblacion(): void {
    if (this.poblacion) {
      this.AcompanantesService.buscarAcompanantesPorPoblacion(this.poblacion).subscribe(
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
     
      this.AcompanantesService.obtenerAcompanantes().subscribe(
        (data: any[]) => {
          console.log('Datos recibidos:', data);
          this.resultados = data;
        },
        (error) => {
          console.error('Error al buscar:', error);
          this.resultados = [];
        }
      );
    }
  }

  obtenerPoblaciones(): void {
    this.AcompanantesService.obtenerPoblacionesDisponibles().subscribe(
      (poblaciones: string[]) => {
        this.poblacionesDisponibles = poblaciones;
      },
      (error) => {
        console.error('Error al obtener poblaciones:', error);
      }
    );
  }
}
