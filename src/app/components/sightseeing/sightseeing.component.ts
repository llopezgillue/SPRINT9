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

  constructor(private sightseeingService: SightseeingService, private router: Router) {}

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  ngOnInit() {
    this.obtenerPoblaciones();
  }

  buscarPorPoblacionYFecha(): void {
    console.log("Función buscarPorPoblacionYFecha llamada. Población:", this.selectedPoblacion, "Fecha:", this.selectedFecha);

    const fechaFormateada = this.selectedFecha;

    if (fechaFormateada) {
      this.sightseeingService.obtenerSightseeing().subscribe(
        (data: any[]) => {
          this.resultados = data.filter(resultado => this.coincidePoblacionYFecha(resultado, fechaFormateada));
          // Llenar el array personasAgregadas con ceros para cada resultado
          this.personasAgregadas = Array(this.resultados.length).fill(0);
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
            // Eliminar el elemento correspondiente en el array personasAgregadas
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
      this.sightseeingService.restarPersona(documentId)  // Cambié de agregarPersona a restarPersona
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
  toggleComentarios(index: number) {

    this.resultados[index].mostrarComentarios = !this.resultados[index].mostrarComentarios;
  }
  }
