import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', padding: '6px 24px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1, padding: '16px 24px' })),
      transition('expanded <=> collapsed', animate('300ms ease')),
    ]),
  ],
})
export class ExperienciasComponent {
  expandedCardId: number | null = null;

  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  experiences = [
    {
      id: 1,
      title: 'SulAmérica Seguros',
      logo: 'assets/logo-sulamerica.jpg',
      description: 'Estagiário de TI',
      dataInit: '07/12/2022',
      dataFim: '06/12/2024',
      details: [
        'Desenvolvimento de aplicações web usando Angular',
        'Manutenção de sistemas legados',
        'Atender chamados/demandas do RH',
        'Manutenção de API REST com Java Spring Boot',
      ],
    },
    {
      id: 2,
      title: 'Droga Raia',
      logo: 'assets/droga-raia-logo.png',
      description: 'Caixa/Atendente',
      dataInit: '02/2020',
      dataFim: '06/2022',
      details: [
        'Abrir e contar caixa',
        'Atender clientes no meio de loja',
        'Repor mercadorias',
        'Verificar receitas',
        'Dispensar medicamentos',
      ],
    },
    {
      id: 3,
      title: 'Tateno Supermercado',
      logo: 'assets/tateno.png',
      description: 'Jovem Aprendiz',
      dataInit: '06/2018',
      dataFim: '06/2019',
      details: [
        'Separação de produtos para expedição',
        'Reposição de mercadorias',
        'Limpar as gôndolas',
      ],
    },
  ];
}
