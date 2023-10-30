import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-salud-parent',
  templateUrl: './salud-parent.component.html',
  styleUrls: ['./salud-parent.component.css']
})
export class SaludParentComponent {
  consejosSalud: string[] = [
    '-Realiza ejercicios de equilibrio para prevenir caídas, como yoga o tai chi',
    '-Mantén una rutina de sueño regular y un ambiente de descanso cómodo.',
    '-Consume una variedad de frutas y verduras para obtener nutrientes esenciales y antioxidantes.',
    '-Consulta a un oftalmólogo regularmente para mantener una buena salud visual.',
    '-Haz ejercicios de resistencia para mantener la fuerza muscular y la densidad ósea.',
    '-Practica la seguridad en el baño, como el uso de alfombras antideslizantes y barras de apoyo.',
    '-Participa en actividades al aire libre para disfrutar del sol y la vitamina D.',
    '-Mantén una lista de medicamentos actualizada y sigue las indicaciones médicas.',
    '-Fomenta relaciones intergeneracionales para enriquecer tu vida y la de otros.',
    '-Cuida de tu salud bucal con cepillado y limpiezas regulares.',
    '-Realiza ejercicios de respiración para mantener la salud pulmonar.',
    '-Practica ejercicios de memoria y rompecabezas para estimular la cognición.',
    '-Programa tiempo para el ocio y las actividades que te gusten.',
    '-Mantén una postura erguida y evita estar sentado durante largos períodos.',
    '-Aprende técnicas de relajación y gestión del estrés, como la respiración profunda.',
    '-Escucha música relajante para reducir la ansiedad y mejorar el estado de ánimo.',
    '-Participa en grupos de apoyo y comunidades en línea para compartir experiencias.',
    '-Haz ejercicio regularmente para mejorar la circulación y la salud cardiovascular.',
    '-Planifica comidas equilibradas con proteínas, carbohidratos y grasas saludables.',
    '-Considera la posibilidad de hacer ejercicio en el agua para reducir la presión en las articulaciones.',
    '-Practica la gratitud y enfócate en lo positivo para mantener una actitud optimista.',
    '-Mantén una lista de emergencia con números de contacto y detalles médicos.',
    '-Recuerda que el envejecimiento es una etapa de la vida valiosa y significativa.',
    '-Mantén un horario regular de comidas.',
    '-Evita el consumo excesivo de alcohol.',
    '-Mantén tus vacunas al día.',
    '-Realiza ejercicios de estiramiento para mejorar la flexibilidad.',
    '-Prueba la meditación para reducir el estrés.',
    '-Consulta a un podólogo para el cuidado de tus pies.',
    '-Evita el tabaquismo y el humo de segunda mano.',
    '-Controla tu presión arterial regularmente.',
    '-Mantén un peso saludable.',
    '-Realiza ejercicios de fortalecimiento muscular.',
    '-Evita el exceso de sal en tu dieta.',
    '-Mantén un registro de tus signos vitales.',
    '-Participa en actividades sociales para mantener tu mente activa.',
    '-Limita la cafeína antes de acostarte para mejorar el sueño.',
    '-Evita el estrés excesivo.',
    '-Mantén una lista de contactos de emergencia actualizada.',
    '-Considera tomar suplementos de vitamina D, si es necesario.',
    '-Haz ejercicio para mantener la movilidad de las articulaciones.',
    '-Evita el consumo excesivo de cafeína.',
    '-Realiza ejercicios de equilibrio para prevenir caídas.',
    '-Mantén una buena higiene personal.',
    '-Evita la exposición excesiva al sol para prevenir el daño solar.',
    '-Mantén una lista de alergias actualizada.',
    '-Practica la gratitud diariamente.',
    '-Evita el consumo excesivo de azúcar.',
    '-Haz ejercicio acuático para aliviar la presión en las articulaciones.',
    '-Mantén una postura erguida.',
    '-Consume alimentos ricos en calcio para la salud ósea.',
    '-Evita el consumo excesivo de grasas saturadas.',
    '-Mantén una dieta rica en fibra para la salud digestiva.',
    '-Practica la jardinería como actividad física.',
    '-Evita el aislamiento social.',
    '-Mantén un registro de tus medicamentos.',
    '-Consume alimentos ricos en antioxidantes.',
    '-Evita el consumo excesivo de bebidas azucaradas.',
    '-Mantén un calendario para no olvidar citas médicas.',
    '-Practica la escritura creativa para ejercitar tu mente.',
    '-Evita el consumo excesivo de alimentos procesados.',
    '-Mantén una actitud optimista.',
    '-Escucha música clásica para relajarte.',
    '-Evita el exceso de comida rápida.',
    '-Mantén una buena relación con tu médico.',
    '-Practica la lectura como estimulación mental.',
    '-Evita el consumo excesivo de alimentos picantes.',
    '-Mantén una rutina regular de cuidado bucal.',
    '-Aprende un nuevo idioma para mantener tu mente activa.',
    '-Evita el consumo excesivo de alimentos con alto contenido de sodio.',

  ];
  consejosMostrados: string[] = [];
  isReversed: boolean = false;

  @Output() consejosCambiados: EventEmitter<string[]> = new EventEmitter<string[]>();

  ngOnInit() {
    this.obtenerConsejos();
  }

  obtenerConsejos() {
    const consejosAleatorios = this.shuffleArray(this.consejosSalud).slice(0, 6);
    this.consejosMostrados = consejosAleatorios;
    this.consejosCambiados.emit(this.consejosMostrados);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
