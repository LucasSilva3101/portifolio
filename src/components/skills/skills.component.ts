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
  private labels: { text: string, description: string, object: CSS2DObject, folder?: GUI, position: THREE.Vector3 }[] = [];
  private isRotating: boolean = true; // Controle da rotação

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
    this.camera.position.z = 3;
    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    // Criar as labels
    this.createLabel('Habilidade 1', 'Comunicação assertiva: expressa a necessidade de ajuda, tira dúvidas ou agenda reuniões.', 1.5, 0, 0);
    this.createLabel('Habilidade 2', 'Trabalho em equipe: colaboração para alcançar objetivos comuns.', -1.5, 0, 0);
    this.createLabel('Habilidade 3', 'Pensamento crítico: análise e avaliação para tomada de decisões.', 0, 1.5, 0);
    this.createLabel('Habilidade 4', 'Resolução de problemas: busca por soluções eficazes e criativas.', 0, -1.5, 0);
    this.createLabel('Habilidade 5', 'Gestão do tempo: organização e priorização de tarefas.', 0, 0, 1.5);
    this.createLabel('Habilidade 6', 'Adaptabilidade: capacidade de lidar com mudanças e novos desafios.', 0, 0, -1.5);

    // Criar o label de "Voltar à rotação"
    this.createRotationLabel();

    this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.initGUI();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  createLabel(text: string, description: string, x: number, y: number, z: number): void {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = text;
    labelDiv.style.backgroundColor = 'transparent';
    labelDiv.style.color = 'white';
    labelDiv.style.fontSize = '20px';

    const labelObject = new CSS2DObject(labelDiv);
    labelObject.position.set(x, y, z);
    this.octahedron.add(labelObject);

    // Adicionar evento de clique à label
    labelDiv.addEventListener('click', () => this.focusOnLabel(labelObject.position));

    // Armazenar a posição da habilidade
    this.labels.push({ text, description, object: labelObject, position: new THREE.Vector3(x, y, z) });
  }

  createRotationLabel(): void {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = 'Voltar à rotação';
    labelDiv.style.backgroundColor = 'transparent';
    labelDiv.style.color = 'white';
    labelDiv.style.fontSize = '20px';
    labelDiv.style.position = 'absolute';
    labelDiv.style.top = '20px';
    labelDiv.style.left = '20px';
    labelDiv.style.zIndex = '10';

    labelDiv.addEventListener('click', () => this.resumeRotation());

    document.body.appendChild(labelDiv);
  }

  initGUI(): void {
    this.gui = new GUI();
    this.labels.forEach(label => {
      const folder = this.gui.addFolder(label.text);
      folder.add({ show: () => this.focusOnLabel(label.object.position) }, 'show').name(label.description);
      folder.close();
      label.folder = folder;

      const folderDomElement = folder.domElement;
      folderDomElement.style.height = '75px';
    });
    this.gui.open();
  }

  focusOnLabel(targetPosition: THREE.Vector3): void {
    // Parar a rotação do octaedro ao clicar na label
    this.isRotating = false;

    // Aplica a rotação atual do octaedro na posição da habilidade
    const targetWorldPosition = targetPosition.clone();
    this.octahedron.localToWorld(targetWorldPosition); // Transforma a posição local para a posição global no espaço 3D

    // Movendo a câmera para a posição da habilidade com base na rotação do octaedro
    const distance = 2; // Distância extra para dar espaço à visualização
    const direction = targetWorldPosition.clone().sub(this.camera.position).normalize();
    this.camera.position.set(targetWorldPosition.x + direction.x * distance, targetWorldPosition.y + direction.y * distance, targetWorldPosition.z + direction.z * distance);

    // Atualizar o ponto de controle da câmera (target)
    this.controls.target.set(targetWorldPosition.x, targetWorldPosition.y, targetWorldPosition.z);
    this.controls.update();
  }

  resumeRotation(): void {
    // Retomar a rotação do octaedro
    this.isRotating = true;
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    // Parar a rotação do octaedro se isRotating for falso
    if (this.isRotating) {
      this.octahedron.rotation.x += 0.01;
      this.octahedron.rotation.y += 0.01;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
}
