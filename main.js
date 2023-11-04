import './style.css'
import * as THREE from 'three'

// Render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// complete Render

// Torus
// const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347});
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347 ,wireframe:true});
// const torus = new THREE.Mesh(torusGeometry, torusMaterial);
// scene.add(torus);


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);

// // Background
// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;
// stars


// Avatar
// const jeffTexture = new THREE.TextureLoader().load('jeff.png');
// const jeffTexture = new THREE.TextureLoader().load('ZZ5H.gif');
// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
// scene.add(jeff);
// jeff.position.z = -5;
// jeff.position.x = 2;

// Avatar
// const jeffTexture = new THREE.TextureLoader().load('asset/auska.png');
// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
//  new THREE.MeshBasicMaterial({ map: jeffTexture }));
// scene.add(jeff);
// jeff.position.z = -5;
// jeff.position.x = 2;

const earthTexture = new THREE.TextureLoader().load('asset/kekeke2.png');
const sphare = new THREE.SphereGeometry(2, 32, 16);
const earth = new THREE.Mesh(sphare, new THREE.MeshBasicMaterial({ map: earthTexture }))// const sphere = new THREE.Mesh( geometry2, material2 ); 
scene.add(earth);
earth.position.z = 0;
earth.position.x = 0;




function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
// Animation Loop

let counter = 0;
let rRate = 0.1;
let height = 1;

function animate() {
  requestAnimationFrame(animate);
  counter += rRate;
  let sin = Math.sin(counter) * height;
  let cos = Math.cos(counter) * height;
  let tan = Math.tan(counter) * height;

  // camera.position.z += rRate;
  // camera.position.x += rRate;
  // torus.rotation.x += rRate;
  // torus.rotation.y += rRate;
  // torus.rotation.z += rRate;
  // earth.rotation.y += rRate;
  earth.position.y = sin;
  earth.position.x = cos;
  earth.position.z = sin;
  earth.rotation.y += rRate;
  // controls.update();
  renderer.render(scene, camera);
}

animate();
