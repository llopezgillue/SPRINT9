import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public titleService: Title) {}

  mostrarConsejosSalud = false;


  showTooltip(text: string) {
    this.titleService.setTitle(text);
  }

  hideTooltip() {
    this.titleService.setTitle('');
  }

  mostrarConsejos() {
    this.mostrarConsejosSalud = true;
  }
}
