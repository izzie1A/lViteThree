import './style.css';
import * as THREE from 'three';
import { getRandomNumber } from './im.js'; // Adjust the path as necessary

// Render
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 19;

// Objects
// Torus
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// Generate stars
Array(1000).fill().forEach(addStar);

// Earth
const earthTexture = new THREE.TextureLoader().load('asset/earthmap1k.jpg');
const sphereGeometry = new THREE.SphereGeometry(2, 32, 16);
const earth = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ map: earthTexture }));
scene.add(earth);
earth.position.set(7, 0, -20);


// Fibonacci function
function fibonacci(num) {
  let num1 = 0, num2 = 1, sum;
  for (let i = 0; i < num; i++) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return num2;
}



// Stars
function addStars() {
  const squareGeometry = new THREE.PlaneGeometry(10, 10); // 1 unit by 1 unit
  const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
  const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
  // const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  squareMesh.position.set(x, y, z);
  scene.add(squareMesh);
}
// Generate stars
Array(10).fill().forEach(addStars);

function createSquare() {
  // Create geometry for the square
  const squareGeometry = new THREE.PlaneGeometry(10, 10); // 1 unit by 1 unit
  const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
  const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
  // squareMesh.position.set(Math.floor(Math.random() * 11)+7, -2, -20);
  squareMesh.position.set(Math.floor(Math.random() * 11)+2, 0, -20);
  scene.add(squareMesh);
}
// Call the function to create the square
createSquare();



// User input
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

  camera.rotation.y = t * -0.0002;
  camera.rotation.z = t * 0.0002;
}
document.body.onscroll = moveCamera;

// Animation Loop
let counter = 0;
const rotationRate = 0.01;

function animate() {
  requestAnimationFrame(animate);
  counter += rotationRate;
  const sin = Math.sin(counter);
  
  camera.position.y += sin * 0.01;
  earth.rotation.y += (sin + 2) / 2 * 0.01;
  // squareMesh.rotation.y += (sin + 2) / 2 * 0.01;

  renderer.render(scene, camera);
}
animate();
