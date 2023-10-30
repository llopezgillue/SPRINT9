import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-salud-child',
  templateUrl: './salud-child.component.html',
  styleUrls: ['./salud-child.component.css']
})
export class SaludChildComponent {

 @Input() consejosSalud: string[] = [];
}
