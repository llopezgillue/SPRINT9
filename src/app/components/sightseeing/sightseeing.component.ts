import { Component, OnInit } from '@angular/core';
import { SightseeingService } from '../../services/sightseeing.service';
import { Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';


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


  constructor(private sightseeingService: SightseeingService, private router: Router, private cookieService:CookieService) {}

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  ngOnInit() {
    this.obtenerPoblaciones();

  }

  buscarPorPoblacionYFecha(): void {
    console.log("Función buscarPorPoblacionYFecha llamada. Población:", this.selectedPoblacion, "Fecha:", this.selectedFecha);


    console.log("Fecha ingresada:", this.selectedFecha);


    const fechaFormateada = this.selectedFecha;

    if (fechaFormateada) {
      this.sightseeingService.obtenerSightseeing().subscribe(
        (data: any[]) => {

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

  eliminarPaseo(documentId: string) {
    console.log('ID del paseo que se va a eliminar:', documentId);
    if (documentId) {
      this.sightseeingService.eliminarPaseo(documentId)
        .then(() => {
          console.log('Paseo eliminado');

          const index = this.resultados.findIndex(resultado => resultado['Document ID'] === documentId); // Cambiar 'id' por 'Document ID'
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
  editarPaseo(documentId: string) {
    console.log('ID del resultado:', documentId);
    this.router.navigate(['/editar-paseo', documentId]);

  }
  agregarPersona(index: number) {

    this.personasAgregadas[index] = (this.personasAgregadas[index] || 0) + 1;

    this.cookieService.set('personasAgregadas', JSON.stringify(this.personasAgregadas));
  }
}
