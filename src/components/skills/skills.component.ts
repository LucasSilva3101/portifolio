import { Component, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private octahedron!: THREE.LineSegments;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };

  constructor() { }

  ngOnInit(): void {
    this.initThreeJsScene();
  }

  initThreeJsScene(): void {
    const canvas = document.getElementById('app-skills') as HTMLCanvasElement;
    if (!canvas) return;

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 2, 2);
    this.scene.add(pointLight);

    const geometry = new THREE.OctahedronGeometry(1.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x44aa88 });
    this.octahedron = new THREE.LineSegments(edges, material);
    this.scene.add(this.octahedron);

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);

    window.addEventListener('resize', () => {
      this.onResize();
    });

    canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
    canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.addEventListener('mouseup', () => this.onMouseUp());

    this.animate();
  }

  onResize(): void {
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera.aspect = canvasSizes.width / canvasSizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaMove = {
      x: event.clientX - this.previousMousePosition.x,
      y: event.clientY - this.previousMousePosition.y,
    };

    const rotationSpeed = 0.005;
    this.octahedron.rotation.y += deltaMove.x * rotationSpeed;
    this.octahedron.rotation.x += deltaMove.y * rotationSpeed;

    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  onMouseUp(): void {
    this.isDragging = false;
  }
}
