import { Component } from '@angular/core';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  constructor() { }

  skills = [
    {
      name: 'HTML, CSS e JavaScript',
      icon: 'web',
      description: 'Trio essencial para o desenvolvimento web: estrutura, estilização e interação/dinamismo para páginas web.',
      expanded: false
    },
    {
      name: 'Angular',
      icon: 'integration_instructions',
      description: 'Framework front-end robusto baseado em TypeScript para criação de SPAs.',
      expanded: false
    },
    {
      name: 'TypeScript',
      icon: 'code',
      description: 'Superset do JavaScript que adiciona tipagem estática e recursos avançados.',
      expanded: false
    },
    {
      name: 'Node.js',
      icon: 'hub',
      description: 'Node.js é o motor que faz o Angular funcionar no desenvolvimento: instalar dependências, rodar o servidor, buildar o projeto, rodar testes e mais.',
      expanded: false
    },
    {
      name: 'Jasmine',
      icon: 'science',
      description: 'Framework de testes para JavaScript, utilizado em projetos Angular.',
      expanded: false
    },
    {
      name: 'Karma',
      icon: 'bug_report',
      description: 'Executor de testes usado para rodar testes unitários em projetos Angular.',
      expanded: false
    },
    {
      name: 'Java',
      icon: 'coffee',
      description: 'Linguagem orientada a objetos amplamente usada no back-end e Android.',
      expanded: false
    },
    {
      name: 'Spring Boot',
      icon: 'cloud',
      description: 'Framework Java para construção de APIs RESTful e microsserviços.',
      expanded: false
    },
    {
      name: 'JUnit',
      icon: 'fact_check',
      description: 'Framework de testes unitários para aplicações Java.',
      expanded: false
    },
    {
      name: 'Mockito',
      icon: 'psychology',
      description: 'Biblioteca para criação de mocks em testes unitários com Java.',
      expanded: false
    },
    {
      name: 'MySQL',
      icon: 'storage',
      description: 'Sistema de gerenciamento de banco de dados relacional amplamente utilizado.',
      expanded: false
    },
    {
      name: 'MongoDB',
      icon: 'dataset',
      description: 'Banco de dados NoSQL orientado a documentos, ideal para aplicações modernas.',
      expanded: false
    }
  ];


  toggleSkill(skill: any) {
    skill.expanded = !skill.expanded;
  }

}
