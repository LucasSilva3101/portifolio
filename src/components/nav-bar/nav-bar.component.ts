import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
    standalone: false
})
export class NavBarComponent {

  LinkedinLink:string = "https://linkedin.com/in/lucas-da-silva-gomes-b89171269";

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('E-mail copiado para a área de transferência!');
    }).catch((err) => {
      console.error('Falha ao copiar o texto: ', err);
      alert('Não foi possível copiar o e-mail.');
    });
  }
}
