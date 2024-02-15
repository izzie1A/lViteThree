import './style.css'
import * as THREE from 'three'

// Render
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Lightings
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 19;
// objs
// Torus
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

scene.add(torus);
// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z); 

  scene.add(star);
  return star
}
function addlineStart() {
  const geometry = new THREE.SphereGeometry(0.25, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  const [x, y, z] = Array(3).fill().map(() => {THREE.MathUtils.randFloatSpread(100)});
  star.position.set(x, y, z);
  scene.add(star);
}
function fibonacci(num) {
  var num1 = 0;
  var num2 = 1;
  var sum;
  var i = 0;
  for (i = 0; i < num; i++) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return num2;
}
console.log(fibonacci(6))
Array(1000).fill().forEach(addStar);
// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 1, 1);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);
//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));
//   star.position.set(x, y, z);
//   scene.add(star);
// }
// Array(1000).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('asset/kekeke2.png');
// scene.background = spaceTexture;

//earth
const earthTexture = new THREE.TextureLoader().load('asset/earthmap1k.jpg');
const sphare = new THREE.SphereGeometry(2, 32, 16);
const earth = new THREE.Mesh(sphare, new THREE.MeshBasicMaterial({ map: earthTexture }))// const sphere = new THREE.Mesh( geometry2, material2 ); 
scene.add(earth);
earth.position.z = -20;
earth.position.x = 7;


// user input
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

// Animation Loop

// gameloop
let counter = 0;
let rRate = 0.01;
function animate() {
  requestAnimationFrame(animate);
  counter += rRate;
  let sin = Math.sin(counter);
  let cos = Math.cos(counter);
  let tan = Math.tan(counter);

  camera.position.y = camera.position.y+sin*0.01;
  earth.rotation.y = earth.rotation.y+((sin+2)/2*0.01);
  // earth.rotation.x += cos*0.00005;
  renderer.render(scene, camera);
}
animate();

