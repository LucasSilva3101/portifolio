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
  private rotationVector = new THREE.Vector3(0, 0, 0);
  private isRotating = false;

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
    if (this.isRotating) {
      this.octahedron.rotation.x -= this.rotationVector.x;
      this.octahedron.rotation.y -= this.rotationVector.y;
    }
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const centerX = width / 2;
    const centerY = height / 2;

    const deltaX = clientX - centerX;
    const deltaY = centerY - clientY;

    this.rotationVector.set(
      -deltaY / height * 0.1,
      -deltaX / width * 0.1,
      0
    );
    this.isRotating = true;

    setTimeout(() => { this.isRotating = false; }, 500);
  }
}
