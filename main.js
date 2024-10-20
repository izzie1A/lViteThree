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
camera.position.z = -20;
camera.position.y = -20;
camera.position.x = -20;

// Earth
const earthTexture = new THREE.TextureLoader().load('asset/earthmap1k.jpg');
const sphereGeometry = new THREE.SphereGeometry(2, 32, 16);
const earth = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ map: earthTexture }));
scene.add(earth);
earth.position.set(7, 0, -20);
earth.rotateY(2);


// Fibonacci function
function fibonacciTem(num) {
  let num1 = 0, num2 = 1, sum;
  for (let i = 0; i < num; i++) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return num2;
}

// 
// 
console.log(fibonacci(10))
class TreeNode {
  constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}

function createFibonacciTree(n) {
  if (n <= 0) return null; // Base case
  const root = new TreeNode(fibonacci(n));
  root.left = createFibonacciTree(n - 1); // Left child is F(n-1)
  root.right = createFibonacciTree(n - 2); // Right child is F(n-2)
  return root;
}

function fibonacci(n) {
  if (n <= 1) return n; // Base Fibonacci cases
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function printTree(node, level = 0) {
  if (node === null) return;
  printTree(node.right, level + 1);
  console.log(' '.repeat(level * 4) + node.value);
  printTree(node.left, level + 1);
}

// Example usage
const n = 5; // Change this value for different tree sizes
const fibonacciTree = createFibonacciTree(n);
printTree(fibonacciTree);


// 
// 

// Stars
function addPlate() {
  const squareGeometry = new THREE.PlaneGeometry(10, 10); // 1 unit by 1 unit
  const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
  const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
  // const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  squareMesh.position.set(x, y, z);
  scene.add(squareMesh);
}
// Generate stars
// Array(10).fill().forEach(addPlate);

const squareGeometry = new THREE.PlaneGeometry(30, 300); // 1 unit by 1 unit
const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const groundFloor = new THREE.Mesh(squareGeometry, squareMaterial);
// const star = new THREE.Mesh(geometry, material);
const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
groundFloor.position.set(-0, -0, -50);
groundFloor.rotation.z = 0;
groundFloor.rotation.x = 90;
groundFloor.rotation.y = 0;
scene.add(groundFloor);

// createSquare();


// User input
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

  camera.rotation.x = t * 0.00002;
}
document.body.onscroll = moveCamera;

// Animation Loop
let counter = 0;
const rotationRate = 0.01;

function animate() {
  requestAnimationFrame(animate);
  counter += rotationRate;
  const sin = Math.sin(counter);
  const cos = Math.cos(counter);
  
  // camera.position.z +=  counter * 0.05 ;
  // camera.position.z += counter *0.01;
  
  earth.position.x = (sin + 0) / 2 * 20;
  earth.position.y = (cos + 0) / 2 * 20;
  earth.position.z = (sin + 0) / 2 * 20;
  // earth.position.z += (sin + 2) / 2 * 0.01;
  earth.rotation.y += (sin + 2) / 2 * 0.05;

  // groundFloor.position.y += (sin + 2) / 2 * 0.01;
  // groundFloor.rotation.x += (sin + 2) / 2 * 0.01;
  // groundFloor.rotation.z += (sin + 2) / 2 * 0.01;
  renderer.render(scene, camera);
}
animate();
