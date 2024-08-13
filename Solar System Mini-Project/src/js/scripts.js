import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();



const sunGeo = new THREE.SphereGeometry(16,30,30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);



const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(mercuryTexture)
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryOrbit = new THREE.Object3D();
sun.add(mercuryOrbit);
mercury.position.x = 28;
mercuryOrbit.add(mercury);





const pointLight = new THREE.PointLight(0xFFFFFF,2,300);
scene.add(pointLight);




const venusGeo = new THREE.SphereGeometry(7.1, 30, 30);
const venusMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(venusTexture)
});
const venus = new THREE.Mesh(venusGeo, venusMat);

const venusOrbit = new THREE.Object3D();
sun.add(venusOrbit);
venus.position.x = 45;
venusOrbit.add(venus);




const earthGeo = new THREE.SphereGeometry(5.9, 30, 30);
const earthMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(earthTexture)
});
const earth = new THREE.Mesh(earthGeo, earthMat);

const earthOrbit = new THREE.Object3D();
sun.add(earthOrbit);
earth.position.x = 60;
earthOrbit.add(earth);





const marsGeo = new THREE.SphereGeometry(3.8, 30, 30);
const marsMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(marsTexture)
});
const mars = new THREE.Mesh(marsGeo, marsMat);

const marsOrbit = new THREE.Object3D();
sun.add(marsOrbit);
mars.position.x = 75;
marsOrbit.add(mars);




const jupiterGeo = new THREE.SphereGeometry(12.5, 30, 30);
const jupiterMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(jupiterTexture)
});
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);

const jupiterOrbit = new THREE.Object3D();
sun.add(jupiterOrbit);
jupiter.position.x = 100;
jupiterOrbit.add(jupiter);





const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(saturnTexture),
    metalness: 0.8,
    roughness: 0.2
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);
sun.add(saturnObj);
saturnObj.position.x = 138;
const saturnRingGeo = new THREE.RingGeometry(12, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingTexture),
    side:THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.rotation.x = Math.PI / 2; 
saturn.add(saturnRing);

const uranusGeo = new THREE.SphereGeometry(7, 30, 30);
const uranusMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(uranusTexture),
    metalness: 0.8,
    roughness: 0.2
});
const uranus = new THREE.Mesh(uranusGeo, uranusMat);
const uranusObj = new THREE.Object3D();
uranusObj.add(uranus);
sun.add(uranusObj);
uranusObj.position.x = 176;

const uranusRingGeo = new THREE.RingGeometry(7, 12, 32);
const uranusRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(uranusRingTexture),
    side: THREE.DoubleSide
});
const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMat);
uranusRing.rotation.x = Math.PI / 2;
uranus.add(uranusRing);



const neptuneGeo = new THREE.SphereGeometry(7, 30, 30);
const neptuneMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(neptuneTexture),
    metalness: 0.8,
    roughness: 0.2
});
const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
const neptuneOrbit = new THREE.Object3D();
sun.add(neptuneOrbit);
neptune.position.x = 200;
neptuneOrbit.add(neptune);



function animate() {
    sun.rotateY(0.004); // Sun rotation

    // Mercury rotation and orbit speed
    mercury.rotateY(0.004);
    mercuryOrbit.rotateY(0.01);

    // Venus rotation and orbit speed
    venus.rotateY(0.002);  // Slower rotation
    venusOrbit.rotateY(0.008);  // Slower orbit

    // Earth rotation and orbit speed
    earth.rotateY(0.005);  // Faster rotation
    earthOrbit.rotateY(0.007);  // Slower orbit

    // Mars rotation and orbit speed
    mars.rotateY(0.004);
    marsOrbit.rotateY(0.006);  // Slower orbit

    // Jupiter rotation and orbit speed
    jupiter.rotateY(0.006);  // Faster rotation
    jupiterOrbit.rotateY(0.005);  // Slower orbit

    // Saturn rotation and orbit speed
    saturn.rotateY(0.004);
    saturnObj.rotateY(0.004);  // Slower orbit

    // Uranus rotation and orbit speed
    uranus.rotateY(0.003);  // Slower rotation
    uranusObj.rotateY(0.002);  // Slower orbit

    // Neptune rotation and orbit speed
    neptune.rotateY(0.005);  // Faster rotation
    neptuneOrbit.rotateY(0.001);  // Slowest orbit

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});