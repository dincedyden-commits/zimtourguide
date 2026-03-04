// JavaScript Document// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controls (rotate, zoom, pan)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("image.jpg");

// Plane Geometry
const geometry = new THREE.PlaneGeometry(6, 4);
const material = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
