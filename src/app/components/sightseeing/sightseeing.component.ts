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
  selectedFecha: Date | null = null;

  constructor(private sightseeingService: SightseeingService, private router: Router) {}

  navigateToAddSightseeing() {
    this.router.navigate(['/sightseeing-form']);
  }

  ngOnInit() {
    this.selectedFecha = null;
    this.obtenerPoblaciones();
  }

  buscarPorPoblacionYFecha(): void {
    this.sightseeingService.obtenerSightseeing().subscribe(
      (data: any[]) => {
        this.resultados = data.filter(resultado => this.coincidePoblacionYFecha(resultado));
      },
      (error) => {
        console.error('Error al buscar:', error);
        this.resultados = [];
      }
    );
  }

  coincidePoblacionYFecha(resultado: any): boolean {
    let poblacionCoincide = !this.selectedPoblacion || resultado.poblacion === this.selectedPoblacion;
    let fechaCoincide = !this.selectedFecha || this.formatDate(resultado.fecha) === this.formatDate(this.selectedFecha.toISOString().split('T')[0]);
    return poblacionCoincide && fechaCoincide;
  }

  formatDate(date: string): string {

    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
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
    console.log("Antes de eliminar el paseo");
    this.sightseeingService.eliminarPaseo(paseoId)
      .then(() => {

        console.log('Paseo eliminado');
        
        this.buscarPorPoblacionYFecha();
      })
      .catch(error => {
        console.error('Error al eliminar el paseo', error);
      });
  }
}
