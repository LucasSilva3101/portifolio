import { Component } from '@angular/core';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent {

  constructor() { }

  ngOnInit() {
  }
  isExpanded = false;

  toggleCard() {
    this.isExpanded = !this.isExpanded;
  }
}
