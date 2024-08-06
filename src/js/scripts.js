import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scene
const scene = new THREE.Scene();
// orbit


// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera,renderer.domElement)

camera.position.set(0,2,5);
orbit.update();
// Create a material for the box
// Add AxesHelper to the scene
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Animation loop to continuously render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Update the renderer and camera size when the window is resized
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Create a box geometry

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial= new THREE.MeshBasicMaterial({color: 0x00FF00})
const box= new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

box.rotation.x=5;
box.rotation.y=5;

// Animation loop to continuously rotate the box

let rotationSpeed = 0.01;
function animateBox() {
  requestAnimationFrame(animateBox);
  box.rotation.x += rotationSpeed;
  box.rotation.y += rotationSpeed;
}

animateBox();