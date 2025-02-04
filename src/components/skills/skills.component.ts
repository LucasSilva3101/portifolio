import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;
  private octahedron!: THREE.LineSegments;
  private controls!: OrbitControls;
  private gui!: GUI;
  private labels: { text: string, object: CSS2DObject }[] = [];

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

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    this.createLabel('Habilidade 1', 1.5, 0, 0);
    this.createLabel('Habilidade 2', -1.5, 0, 0);
    this.createLabel('Habilidade 3', 0, 1.5, 0);
    this.createLabel('Habilidade 4', 0, -1.5, 0);
    this.createLabel('Habilidade 5', 0, 0, 1.5);
    this.createLabel('Habilidade 6', 0, 0, -1.5);

    this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.initGUI();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  createLabel(text: string, x: number, y: number, z: number): void {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = text;
    labelDiv.style.backgroundColor = 'transparent';
    labelDiv.style.color = 'white';
    labelDiv.style.fontSize = '20px';

    const labelObject = new CSS2DObject(labelDiv);
    labelObject.position.set(x, y, z);
    this.octahedron.add(labelObject);

    this.labels.push({ text, object: labelObject });
  }

  initGUI(): void {
    this.gui = new GUI();
    const skillsFolder = this.gui.addFolder('Habilidades');
    this.labels.forEach(label => {
      skillsFolder.add({ show: () => this.focusOnLabel(label.object) }, 'show').name(label.text);
    });
    skillsFolder.open();
  }

  focusOnLabel(labelObject: CSS2DObject): void {
    const targetPosition = labelObject.position.clone().multiplyScalar(2);
    new THREE.Vector3().lerpVectors(this.camera.position, targetPosition, 0.2);
    this.camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z + 2);
    this.controls.target.set(labelObject.position.x, labelObject.position.y, labelObject.position.z);
    this.controls.update();
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
}
