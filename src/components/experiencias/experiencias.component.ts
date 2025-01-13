import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})

export class ExperienciasComponent {

  constructor() { }

  ngOnInit() {
  }

  experiences = [
    {
      id: 1,
      title: 'SulAmérica',
      logo: 'assets/logo-sulamerica.jpg',
      description: 'Trabalhei como estagiário de TI...',
      details: ['Desenvolvimento em Angular', 'Manutenção de sistemas legados', 'Automação de relatórios'],
    },
    {
      id: 2,
      title: 'Empresa 2',
      logo: 'assets/logo-empresa2.jpg',
      description: 'Atuei em projetos web...',
      details: ['Integração com APIs', 'Desenvolvimento front-end', 'Otimização de performance'],
    },
    {
      id: 3,
      title: 'Empresa 3',
      logo: 'assets/logo-empresa3.jpg',
      description: 'Responsável pelo desenvolvimento...',
      details: ['Criação de módulos em Angular', 'Testes unitários', 'Documentação técnica'],
    },
  ];
}
