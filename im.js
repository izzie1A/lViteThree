// utils.js
import * as THREE from 'three';

export function getRandomNumber() {
    return Math.floor(Math.random() * 101); // Returns a random number between 0 and 100
  }
  
export function genernateWorld(){

  const geometry = new THREE.SphereGeometry(0.25, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
  return star
}


// Stars
function addStar() {
}