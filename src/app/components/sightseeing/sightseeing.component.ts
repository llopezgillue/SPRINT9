import { Component, OnInit } from '@angular/core';
import { SightseeingService } from '../../services/sightseeing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sightseeing',
  templateUrl: './sightseeing.component.html',
  styleUrls: ['./sightseeing.component.css']
})
export class SightseeingComponent implements OnInit {
  resultados: any[] = [];
  poblacionesDisponibles: string[] = [];
  selectedPoblacion: string = '';
  selectedFecha: string = '';

  constructor(private sightseeingService: SightseeingService, private router: Router) {}

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  ngOnInit() {
    this.obtenerPoblaciones();
  }

  buscarPorPoblacionYFecha(): void {
    console.log("Función buscarPorPoblacionYFecha llamada. Población:", this.selectedPoblacion, "Fecha:", this.selectedFecha);

    // Asegurarte de que selectedFecha esté en el formato correcto
    console.log("Fecha ingresada:", this.selectedFecha);

    // No es necesario realizar una conversión de formato para la fecha
    const fechaFormateada = this.selectedFecha;

    if (fechaFormateada) {
      this.sightseeingService.obtenerSightseeing().subscribe(
        (data: any[]) => {
          // Utilizamos la función filter para filtrar por población y fecha
          this.resultados = data.filter(resultado => this.coincidePoblacionYFecha(resultado, fechaFormateada));
          console.log("Resultados después de filtrar:", this.resultados);
        },
        (error) => {
          console.error('Error al buscar:', error);
          this.resultados = [];
        }
      );
    } else {
      console.error('Fecha seleccionada no válida.');
    }
  }
  coincidePoblacionYFecha(resultado: any, fechaSeleccionada: string): boolean {
    const poblacionCoincide = !this.selectedPoblacion || resultado.poblacion === this.selectedPoblacion;
    console.log("Población coincide:", poblacionCoincide);

    return poblacionCoincide && resultado.fecha === fechaSeleccionada;
  }

  obtenerPoblaciones(): void {
    this.sightseeingService.obtenerPoblacionesDisponibles().subscribe(
      (poblaciones: string[]) => {
        this.poblacionesDisponibles = poblaciones;
      },
      (error) => {
        console.error('Error al obtener poblaciones:', error);
      }
    );
  }

  eliminarPaseo(paseoId: string) {
    if (paseoId) {
      console.log("Eliminando paseo con ID:", paseoId);

      this.sightseeingService.eliminarPaseo(paseoId)
        .then(() => {
          console.log('Paseo eliminado');

          // Elimina el paseo de this.resultados si se encuentra en la lista
          const index = this.resultados.findIndex(resultado => resultado.id === paseoId);
          if (index !== -1) {
            this.resultados.splice(index, 1);
          }
        })
        .catch(error => {
          console.error('Error al eliminar el paseo', error);
        });
    } else {
      console.error('ID de paseo no válido');
    }
  }
  editarPaseo(paseoId: string) {
    console.log('ID del resultado:', paseoId); // Agrega este registro de depuración
    this.router.navigate(['/editar-paseo', paseoId]);
  }
}
