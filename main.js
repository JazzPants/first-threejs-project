import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//1. scene
const scene = new THREE.Scene();

//2.camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//3. renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// renderer.render(scene, camera);

//objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
//use one line of scene.add to add multiple lights
scene.add(pointLight, ambientLight);

//helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 25);
const axesHelper = new THREE.AxesHelper(5);
scene.add(lightHelper, gridHelper, axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//starry background
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

Array(200).fill().forEach(addStar);

//scene background image
//can place a callback function into the load function to put a loading bar/image while static images are loading
const spaceTexture = new THREE.TextureLoader().load("images/bkg1_bot.png");
scene.background = spaceTexture;

//render torus
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 1;

  //the dom element listens for user events and the new camera position is saved and changes are reflected in the UI
  controls.update();

  renderer.render(scene, camera);
}

animate();
