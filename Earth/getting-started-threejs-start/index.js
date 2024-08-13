import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const loader= new THREE.TextureLoader();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor=0.03;
const geo = new THREE.IcosahedronGeometry(1.0,14);
const mat = new THREE.MeshStandardMaterial(
  {
    map: loader.load("earthmap1k.jpg")
  }
);

// ADD stars
const loader1 = new THREE.TextureLoader();
const bgTexture = loader1.load('stars.jpg');
scene.background = bgTexture;

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1 );
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5).normalize();
scene.add(dirLight);
function animate(){
  requestAnimationFrame(animate);
 
  mesh.rotation.y += 0.001;
  // wireframeMesh.rotation.x += 0.01;
  // wireframeMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}


animate();