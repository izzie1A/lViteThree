import './style.css'
import * as THREE from 'three'

console.log('tests')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// renderer.render(scene,camera);
// complete Render

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347 ,wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
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


// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
scene.add(jeff);

jeff.position.z = -5;
jeff.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  let rRate = 0.1;
  // camera.position.z += rRate;
  // camera.position.x += rRate;
  torus.rotation.x += rRate;
  torus.rotation.y += 0.005;
  torus.rotation.z += rRate;


  // controls.update();

  renderer.render(scene, camera);
}

animate();
