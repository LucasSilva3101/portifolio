import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer; // Renderer para renderizar labels
  private octahedron!: THREE.LineSegments;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private randomRotationSpeed = { x: Math.random() * 0.01, y: Math.random() * 0.01 };

  constructor() { }

  ngOnInit(): void {
    this.initThreeJsScene();
  }

  initThreeJsScene(): void {
    const canvas = document.getElementById('app-skills') as HTMLCanvasElement;
    if (!canvas) return;

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const geometry = new THREE.OctahedronGeometry(1.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x007acc });
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

    // Criando o CSS2DRenderer para labels
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(canvasSizes.width, canvasSizes.height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    // Criando os labels nos vértices do octaedro
    this.createLabel('Teste', 1.5, 0, 0);  // Vértice 1
    this.createLabel('Teste 2', -1.5, 0, 0); // Vértice 2
    this.createLabel('Teste 3', 0, 1.5, 0);  // Vértice 3
    this.createLabel('Teste 4', 0, -1.5, 0); // Vértice 4
    this.createLabel('Teste 5', 0, 0, 1.5);  // Vértice 5
    this.createLabel('Teste 6', 0, 0, -1.5); // Vértice 6

    window.addEventListener('resize', () => this.onResize());
    canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
    canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    canvas.addEventListener('mouseup', () => this.onMouseUp());

    this.animate();
  }

  createLabel(text: string, x: number, y: number, z: number): void {
    // Criando o label com estilo
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = text;
    labelDiv.style.backgroundColor = 'transparent';
    labelDiv.style.color = 'white';
    labelDiv.style.fontSize = '20px';

    // Criando o CSS2DObject para o label
    const labelObject = new CSS2DObject(labelDiv);
    labelObject.position.set(x, y, z); // Posição do label no espaço 3D
    this.octahedron.add(labelObject); // Associando o label ao octaedro
  }

  onResize(): void {
    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera.aspect = canvasSizes.width / canvasSizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);
    this.labelRenderer.setSize(canvasSizes.width, canvasSizes.height);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    // Rotação aleatória
    this.octahedron.rotation.x += this.randomRotationSpeed.x;
    this.octahedron.rotation.y += this.randomRotationSpeed.y;

    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera); // Renderizando os labels
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
