import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Configure a GLB here when you have a model and usage rights. Leave empty to use the procedural concept model.
export const MODEL_CONFIG = {
  url: '', // Example: '/assets/models/your-licensed-model.glb'
  scale: 1,
  rotationY: -0.12,
  meshNames: { gpu: '', motherboard: '', cooling: '', memory: '', storage: '', psu: '', case: '' }
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
function addBox(parent, w, h, d, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}
function addDisc(parent, radius, material, x, y, z, depth = 0.035, segments = 40) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

// Recognizably PC-like but intentionally non-product-specific geometry for a no-asset first run.
export function createProceduralPC() {
  const root = new THREE.Group();
  root.name = 'ProceduralConceptPC';
  const frame = new THREE.MeshStandardMaterial({ color: 0x191b20, metalness: 0.72, roughness: 0.32 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x353840, metalness: 0.78, roughness: 0.27 });
  const board = new THREE.MeshStandardMaterial({ color: 0x20242b, metalness: 0.32, roughness: 0.58 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xff6a00, emissive: 0xff4c00, emissiveIntensity: 1.1, metalness: 0.4, roughness: 0.3 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x687080, metalness: 0.1, roughness: 0.18, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
  const silver = new THREE.MeshStandardMaterial({ color: 0x81858e, metalness: 0.82, roughness: 0.25 });
  const parts = {};

  // Outer chassis rails and see-through side panel.
  const caseGroup = new THREE.Group(); caseGroup.name = 'case';
  addBox(caseGroup, 2.45, 3.8, 0.16, frame, 0, 0, 0);
  addBox(caseGroup, 2.36, 0.1, 1.2, metal, 0, 1.9, 0.48);
  addBox(caseGroup, 2.36, 0.1, 1.2, metal, 0, -1.9, 0.48);
  addBox(caseGroup, 0.1, 3.7, 1.2, metal, -1.18, 0, 0.48);
  addBox(caseGroup, 0.1, 3.7, 1.2, metal, 1.18, 0, 0.48);
  addBox(caseGroup, 2.28, 3.62, 0.025, glass, 0, 0, 1.105);
  root.add(caseGroup); parts.case = caseGroup;

  // Motherboard plane, CPU block and visually distinct memory sticks.
  const motherboard = new THREE.Group(); motherboard.name = 'motherboard';
  addBox(motherboard, 1.5, 2.4, 0.08, board, 0.27, 0.12, 0.83);
  addBox(motherboard, 0.68, 1.12, 0.18, frame, 0.43, 0.3, 0.96);
  addBox(motherboard, 0.12, 0.85, 0.14, accent, 0.95, 0.24, 0.98);
  root.add(motherboard); parts.motherboard = motherboard;
  const memory = new THREE.Group(); memory.name = 'memory';
  for (let i = 0; i < 4; i++) addBox(memory, 0.08, 0.72, 0.09, i % 2 ? metal : accent, 0.72 + i * 0.12, -0.72, 0.96);
  root.add(memory); parts.memory = memory;

  // Graphics card assembly with three simple, illustrative fan faces.
  const gpu = new THREE.Group(); gpu.name = 'gpu';
  addBox(gpu, 1.74, 0.48, 0.42, frame, 0.15, -0.87, 0.68);
  addBox(gpu, 1.76, 0.09, 0.44, metal, 0.15, -0.64, 0.68);
  for (let i = 0; i < 3; i++) {
    const x = -0.42 + i * 0.57;
    addDisc(gpu, 0.17, metal, x, -0.87, 0.91);
    addDisc(gpu, 0.115, frame, x, -0.87, 0.94);
    addDisc(gpu, 0.035, accent, x, -0.87, 0.97);
  }
  root.add(gpu); parts.gpu = gpu;

  // Front intake fans, cooling details, lower shroud, and a generic SSD location.
  const cooling = new THREE.Group(); cooling.name = 'cooling';
  for (let i = 0; i < 3; i++) {
    const y = 0.95 - i * 0.91;
    addDisc(cooling, 0.37, metal, -0.77, y, 0.91, 0.05);
    addDisc(cooling, 0.31, frame, -0.77, y, 0.95, 0.03);
    addDisc(cooling, 0.265, accent, -0.77, y, 0.97, 0.02);
    addDisc(cooling, 0.23, frame, -0.77, y, 0.985, 0.025);
    addDisc(cooling, 0.075, silver, -0.77, y, 1.01, 0.035);
    for (let blade = 0; blade < 6; blade++) {
      const angle = blade * Math.PI / 3;
      const vane = addBox(cooling, 0.17, 0.055, 0.018, metal, -0.77 + Math.cos(angle) * 0.15, y + Math.sin(angle) * 0.15, 1.005);
      vane.rotation.z = angle;
    }
  }
  addBox(cooling, 1.45, 0.22, 0.35, frame, 0.25, 1.57, 0.72);
  for (let i = 0; i < 4; i++) addBox(cooling, 0.04, 0.24, 0.37, metal, -0.35 + i * 0.34, 1.57, 0.73);
  root.add(cooling); parts.cooling = cooling;
  const psu = new THREE.Group(); psu.name = 'psu';
  addBox(psu, 1.95, 0.42, 0.52, frame, 0, -1.59, 0.52);
  addBox(psu, 0.64, 0.025, 0.025, accent, -0.5, -1.365, 0.79);
  root.add(psu); parts.psu = psu;
  const storage = new THREE.Group(); storage.name = 'storage';
  addBox(storage, 0.34, 0.14, 0.05, silver, 0.53, 1.04, 0.91);
  root.add(storage); parts.storage = storage;

  for (let i = 0; i < 5; i++) addBox(root, 0.5, 0.018, 0.32, metal, -0.65 + i * 0.28, 1.91, 0.46);
  root.rotation.y = MODEL_CONFIG.rotationY;
  root.userData.parts = parts;
  root.userData.isProcedural = true;
  root.userData.disclaimer = 'Illustrative primitive geometry, not a real or product-accurate gaming PC.';
  return root;
}

function findPart(root, name) {
  if (!name) return null;
  let found = null;
  root.traverse((object) => { if (!found && object.name === name) found = object; });
  return found;
}

async function loadModel(url) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url);
  const model = gltf.scene;
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  model.position.sub(center);
  const maxDimension = Math.max(size.x, size.y, size.z);
  if (maxDimension > 0) model.scale.multiplyScalar(4.2 / maxDimension);
  model.scale.multiplyScalar(MODEL_CONFIG.scale);
  model.rotation.y = MODEL_CONFIG.rotationY;
  const parts = {};
  for (const [key, meshName] of Object.entries(MODEL_CONFIG.meshNames)) {
    if (meshName) {
      const match = findPart(model, meshName);
      if (match) parts[key] = match;
      else console.warn(`Configured GLTF mesh "${meshName}" for ${key} was not found; camera focus will be used.`);
    }
  }
  model.userData.parts = parts;
  model.userData.isProcedural = false;
  return model;
}

export async function createShowcaseScene(container, { modelUrl = MODEL_CONFIG.url, zoom = 8.4, scale = 1, onReady = () => {} } = {}) {
  const canvas = container.querySelector('canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.1, zoom);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: window.innerWidth > 700, alpha: true, powerPreference: 'low-power' });
  } catch (error) {
    container.querySelector('.webgl-fallback')?.classList.add('visible');
    console.error('WebGL renderer could not be created. Check browser WebGL support and GPU settings.', error);
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  scene.add(new THREE.HemisphereLight(0xb9c6da, 0x171318, 1.8));
  const key = new THREE.DirectionalLight(0xffe1ca, 3.6); key.position.set(4, 6, 8); scene.add(key);
  const rim = new THREE.PointLight(0xff6a00, 16, 14); rim.position.set(-3, 2, 4); scene.add(rim);
  const fill = new THREE.PointLight(0x667da8, 8, 14); fill.position.set(2, -2, -3); scene.add(fill);

  const loading = container.querySelector('.scene-loading');
  let pc;
  if (modelUrl) {
    try {
      pc = await loadModel(modelUrl);
      console.info(`Loaded GLTF model: ${modelUrl}`);
    } catch (error) {
      console.error(`Could not load GLTF model at "${modelUrl}". Using procedural PC instead.`, error);
      pc = createProceduralPC();
      container.querySelector('.webgl-fallback')?.classList.add('visible');
    }
  } else {
    pc = createProceduralPC();
  }
  pc.scale.multiplyScalar(scale);
  const floatRig = new THREE.Group();
  floatRig.name = 'FloatingProductRig';
  floatRig.add(pc);
  scene.add(floatRig);
  if (loading) loading.classList.add('hidden');
  onReady(pc);

  const resize = () => {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  const pointer = { x: 0, y: 0 };
  const onPointer = (event) => {
    const rect = container.getBoundingClientRect();
    pointer.x = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    pointer.y = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
  };
  container.addEventListener('pointermove', onPointer, { passive: true });
  let raf = 0;
  let lastFrame = 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { pointer, idle: true, disposed: false, baseY: pc.rotation.y, floatRig };
  const render = (time) => {
    if (state.disposed) return;
    raf = requestAnimationFrame(render);
    if (isReducedMotion && time - lastFrame < 50) return;
    lastFrame = time;
    if (!isReducedMotion) {
      if (state.idle) {
        pc.rotation.y += ((state.baseY + pointer.x * 0.13 + Math.sin(time * 0.00035) * 0.018) - pc.rotation.y) * 0.025;
        pc.rotation.x += ((-pointer.y * 0.045) - pc.rotation.x) * 0.025;
      }
      floatRig.position.y = Math.sin(time * 0.0007) * 0.055;
      floatRig.rotation.y = Math.sin(time * 0.00024) * 0.012;
    }
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(render);
  console.info('Three.js WebGL scene initialized:', pc.userData.isProcedural ? 'procedural concept model' : 'GLTF model');
  return {
    scene, camera, pc, renderer, state,
    dispose() {
      state.disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener('pointermove', onPointer);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) for (const material of (Array.isArray(obj.material) ? obj.material : [obj.material])) material.dispose();
      });
      renderer.dispose();
    }
  };
}
