import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import nebula from '../img/Nebula.jpg';
import Stars from '../img/Stars.jpg';
const monkeyUrl = new URL ('../assets/monkey.glb',import.meta.url);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
orbit.update();

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
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 10);
sphere.castShadow = true;

// Spot light
const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(10, 20, 20);
spotLight.castShadow = true;
spotLight.angle = 0.2;
scene.add(spotLight);
const sLightHelper = new THREE.SpotLightHelper(spotLight, 5);
scene.add(sLightHelper);
const sLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(sLightShadowHelper);

// Scene fog
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

// renderer.setClearColor(0xFFEA00);

// Texture
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(Stars);

// Create the second box with texture
const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: textureLoader.load(nebula)
});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);
box2.name = 'theBox';

const plane2Geometry = new THREE.PlaneGeometry(10,10,10,10);
const plane2Material = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  wireframe:true
});

const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);

scene.add(plane2);

plane2.position.set(10,10,15);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();

plane2.geometry.attributes.position.array[1] -= 10 * Math.random();

plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ= plane2.geometry.attributes.position.array.length -1;

plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

const sphere2Geometry = new THREE.SphereGeometry(4);

// const vShader= `
//   void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
//   }
// `;

// const fShader = `
//   void main() {
//    gl_FragColor = vec4(0.5,0.5,1.0, 1.0);
//   }
    
//   `;
  
const sphere2Material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
 
});

const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);

scene.add(sphere2);

sphere2.position.set(10,10,0);

// Load a GLTF model

// Load a GLTF model
const gltfLoader = new GLTFLoader();
gltfLoader.load(monkeyUrl.href, (gltf) => {
  const monkey = gltf.scene;
  monkey.scale.set(0.5, 0.5, 0.5);
  monkey.position.set(10, 10, 20);
  monkey.rotation.y = Math.PI / 2;
  
  monkey.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(monkey);
}, undefined, function (error) {
  console.error('An error happened while loading the model', error);
});
camera.position.set(0, 30, 50); // Adjust the camera position






// Mouse position for raycasting
const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();
const SphareId = sphere.id;

// GUI controls
const gui = new dat.GUI();
const option = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumber: 0,
  intensity: 1,
};

gui.addColor(option, 'sphereColor').onChange((color) => {
  sphereMaterial.color.set(color);
});
gui.add(option, 'wireframe').onChange((wireframe) => {
  sphereMaterial.wireframe = wireframe;
});
gui.add(option, 'speed', 0, 0.1).onChange((speed) => {
  this.speed = speed;
});
gui.add(option, 'angle', 0, 1).onChange((angle) => {
  spotLight.angle = angle;
});
gui.add(option, 'penumber', 0, 1).onChange((penumber) => {
  spotLight.penumbra = penumber;
});
gui.add(option, 'intensity', 0, 1).onChange((intensity) => {
  spotLight.intensity = intensity;
});

let step = 0;

// Animation loop to continuously rotate the box
function animateBox() {
  requestAnimationFrame(animateBox);
  box.rotation.x += 0.1;
  box.rotation.y += 0.01;
  step += option.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  step += option.speed;
  sphere2.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = option.angle;
  spotLight.penumbra = option.penumber;
  spotLight.intensity = option.intensity;
  sLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === SphareId) {
      intersects[i].object.material.color.set(0xff0000);
    }
    if (intersects[i].object.name === 'theBox') {
      intersects[i].object.rotation.x += 0.01;
      intersects[i].object.rotation.y += 0.01;
    }
  }
  
plane2.geometry.attributes.position.array[0] -= 10 * Math.random();

plane2.geometry.attributes.position.array[1] -= 10 * Math.random();

plane2.geometry.attributes.position.array[2] -= 10 * Math.random();

plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

plane2.geometry.attributes.position.needsUpdate = true;
}

animateBox();

window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})