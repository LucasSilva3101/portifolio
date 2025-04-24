import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  linkParaCurriculo = 'assets/curriculo.pdf';
  isVisible = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    window.addEventListener('scroll', this.checkScroll);
  }

  checkScroll = () => {
    const section = this.el.nativeElement.querySelector('.about-container');
    if (section) {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75) {
        this.isVisible = true;
        window.removeEventListener('scroll', this.checkScroll);
      }
    }
  };
}
