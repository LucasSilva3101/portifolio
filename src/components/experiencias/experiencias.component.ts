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
    standalone: false
})
export class ExperienciasComponent {
  expandedCardId: number | null = null;

  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  experiences = [
    {
      id: 4,
      title: 'Engemon IT',
      logo: 'assets/engemon_it_logo.jpg',
      description: 'Técnico de Microinformatica',
      dataInit: '06/2024',
      dataFim: 'Atualmente',
      details: [
        'Atuação no preparo e manutenção de estações de trabalho para novos e atuais colaboradores, incluindo formatação, instalação de imagem do Windows com aplicativos pré-configurados e integração ao domínio da empresa via Microsoft Active Directory.',
        'Criação e gerenciamento de contas no Active Directory (reset de senhas, desbloqueio de usuários e associação ao domínio).',
        'Instalação e configuração de aplicativos corporativos e ferramentas específicas como SQL Tools, Oracle Client, Power BI e certificados digitais.',
        'Configuração de VPNs e suporte técnico remoto via TeamViewer, AnyDesk e Conexão de Área de Trabalho Remota (RDP).',
        'Manutenção de hardware (substituição de peças, ajustes em teclado, mouse e outros periféricos).',
        'Configuração de softwares e ajustes de ambiente conforme demandas internas.',
      ],
    },
    {
      id: 1,
      title: 'SulAmérica Seguros',
      logo: 'assets/logo-sulamerica.jpg',
      description: 'Estagiário de TI',
      dataInit: '07/12/2022',
      dataFim: '06/12/2024',
      details: [
        'Trabalhei em uma equipe multidisciplinar responsável por diversos projetos relacionados a recursos humanos e sistemas de gestão interna.',
        'Participei ativamente da reformulação e desenvolvimento da plataforma interna, adaptando os sistemas para atender novos colaboradores.',
        'Desenvolvimento e manutenção de aplicações backend utilizando Java 8 e Spring Boot, implementando novas funcionalidades e regras de negócio.',
        'Criação e manutenção de testes unitários com JUnit e Mockito (backend), e Karma com Jasmine (frontend).',
        'Desenvolvimento de aplicações frontend com Angular 8, TypeScript e Bootstrap.',
        'Manipulação de dados e integração com bancos MongoDB e Oracle.',
        'Manutenção e criação de batchs para envio automático de e-mails e geração de relatórios.',
        'Integração de sistemas internos com o LinkedIn para compartilhamento de conteúdos.',
        'Versionamento de código utilizando Git, Bitbucket e Sourcetree, além de acompanhamento de deploys e análise de logs via Jenkins.',
        'Colaboração com engenheiros de DevOps para garantir a implantação de alterações de código e atualizações de aplicações.',
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
