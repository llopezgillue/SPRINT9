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
  personasAgregadas: number[] = [];
  mostrarComentariosCompleto: boolean[] = [];

  constructor(private sightseeingService: SightseeingService, private router: Router) { }

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  ngOnInit() {
    this.obtenerPoblaciones();
  }

  buscarPorPoblacionYFecha(): void {
    console.log("Función buscarPorPoblacionYFecha llamada. Población:", this.selectedPoblacion, "Fecha:", this.selectedFecha);

    if (this.selectedFecha || (this.selectedPoblacion && this.selectedPoblacion !== 'Todas')) {

      const fechaFormateada = this.selectedFecha;

      this.sightseeingService.obtenerSightseeing().subscribe(
        (data: any[]) => {
          this.resultados = data.filter(resultado => this.coincidePoblacionYFecha(resultado, fechaFormateada));
          this.personasAgregadas = Array(this.resultados.length).fill(0);
          console.log("Resultados después de filtrar:", this.resultados);
        },
        (error) => {
          console.error('Error al buscar:', error);
          this.resultados = [];
        }
      );
    } else {

      this.sightseeingService.obtenerSightseeing().subscribe(
        (data: any[]) => {
          this.resultados = data;
          this.personasAgregadas = Array(this.resultados.length).fill(0);
          console.log("Resultados sin filtrar:", this.resultados);
        },
        (error) => {
          console.error('Error al buscar:', error);
          this.resultados = [];
        }
      );
    }
  }

  coincidePoblacionYFecha(resultado: any, fechaSeleccionada: string): boolean {
    const poblacionCoincide = !this.selectedPoblacion || resultado.poblacion === this.selectedPoblacion;

    if (!fechaSeleccionada && this.selectedPoblacion === 'Todas') {

      return true;
    }

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

  eliminarPaseo(documentId: string) {
    console.log('ID del paseo que se va a eliminar:', documentId);
    if (documentId) {
      this.sightseeingService.eliminarPaseo(documentId)
        .then(() => {
          console.log('Paseo eliminado');

          const index = this.resultados.findIndex(resultado => resultado['Document ID'] === documentId);
          if (index !== -1) {
            this.resultados.splice(index, 1);

            this.personasAgregadas.splice(index, 1);
          }
        })
        .catch(error => {
          console.error('Error al eliminar el paseo', error);
        });
    } else {
      console.error('ID de paseo no válido');
    }
  }

  editarPaseo(documentId: string) {
    console.log('ID del resultado:', documentId);
    this.router.navigate(['/editar-paseo', documentId]);
  }

  agregarPersona(index: number) {
    const documentId = this.resultados[index]['Document ID'];

    if (documentId) {
      this.sightseeingService.agregarPersona(documentId)
        .then(() => {
          this.personasAgregadas[index]++;
        })
        .catch(error => {
          console.error('Error al agregar persona:', error);
        });
    } else {
      console.error('ID de paseo no válido');
    }
  }

  restarPersona(index: number) {
    const documentId = this.resultados[index]['Document ID'];

    if (documentId) {
      this.sightseeingService.restarPersona(documentId)
        .then(() => {
          this.personasAgregadas[index]--;
        })
        .catch(error => {
          console.error('Error al restar persona:', error);
        });
    } else {
      console.error('ID de paseo no válido');
    }
  }

}
