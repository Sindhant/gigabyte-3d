import * as THREE from 'three';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const standard = (color, metalness = 0.5, roughness = 0.35, extra = {}) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
function box(parent, name, size, position, material, bevel = 0.04) {
  const geometry = new THREE.BoxGeometry(...size);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  if (bevel) {
    const edges = new THREE.EdgesGeometry(geometry, 25);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x83858b, transparent: true, opacity: 0.28 }));
    line.position.copy(mesh.position);
    line.rotation.copy(mesh.rotation);
    parent.add(line);
  }
  return mesh;
}
function cable(parent, points, color = 0x171a20, radius = 0.035) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, radius, 8, false), standard(color, 0.28, 0.42));
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function fan(parent, radius, position, glow = 0xff7146) {
  const group = new THREE.Group();
  group.position.set(...position);
  parent.add(group);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.91, radius * 0.055, 12, 64), standard(0x9ca0a8, 0.75, 0.22, { emissive: glow, emissiveIntensity: 0.9 }));
  group.add(ring);
  const rotor = new THREE.Group();
  rotor.position.z = 0.035;
  group.add(rotor);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, 0.12, 32), standard(0x6a6d72, 0.82, 0.23, { emissive: glow, emissiveIntensity: 0.16 }));
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.015;
  rotor.add(hub);
  const hubRing = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.19, radius * 0.025, 8, 32), standard(0xc4c8cc, 0.7, 0.2, { emissive: glow, emissiveIntensity: 1.1 }));
  hubRing.position.z = 0.08;
  rotor.add(hubRing);
  const bladeMaterial = standard(0x32363d, 0.65, 0.3, { emissive: glow, emissiveIntensity: 0.11, side: THREE.DoubleSide });
  for (let i = 0; i < 9; i++) {
    const angle = i * Math.PI * 2 / 9;
    const shape = new THREE.Shape();
    shape.moveTo(radius * 0.18, -radius * 0.11);
    shape.quadraticCurveTo(radius * 0.57, -radius * 0.38, radius * 0.79, -radius * 0.12);
    shape.quadraticCurveTo(radius * 0.63, radius * 0.02, radius * 0.25, radius * 0.12);
    shape.closePath();
    const blade = new THREE.Mesh(new THREE.ShapeGeometry(shape, 10), bladeMaterial);
    blade.rotation.z = angle;
    blade.position.z = -0.025;
    rotor.add(blade);
  }
  group.userData.rotor = rotor;
  group.userData.rgbMaterials = [ring.material, hub.material, hubRing.material, bladeMaterial];
  return group;
}
function makePc() {
  const root = new THREE.Group();
  root.name = 'Concept PC';
  const frameMat = standard(0x25282e, 0.82, 0.24);
  const darkMat = standard(0x111419, 0.38, 0.3);
  const boardMat = standard(0x17221f, 0.34, 0.48);
  const accentMat = standard(0xf15b2a, 0.55, 0.27, { emissive: 0x7c210d, emissiveIntensity: 0.42 });
  const caseGroup = new THREE.Group();
  caseGroup.name = 'case';
  // Tower shell: an open-front chassis so the component arrangement reads clearly.
  box(caseGroup, 'case back', [2.85, 3.65, 0.13], [0, 0, -0.57], frameMat);
  box(caseGroup, 'case top', [2.85, 0.12, 1.25], [0, 1.8, 0.02], frameMat);
  box(caseGroup, 'case base', [2.85, 0.14, 1.25], [0, -1.8, 0.02], frameMat);
  box(caseGroup, 'case left rail', [0.12, 3.55, 1.2], [-1.38, 0, 0.02], frameMat);
  box(caseGroup, 'case right rail', [0.12, 3.55, 1.2], [1.38, 0, 0.02], frameMat);
  box(caseGroup, 'glass panel', [2.58, 3.38, 0.025], [0, 0, 0.64], new THREE.MeshPhysicalMaterial({ color: 0x8b9ba4, metalness: 0.14, roughness: 0.12, transparent: true, opacity: 0.13, transmission: 0.2, thickness: 0.06, side: THREE.DoubleSide }));
  box(caseGroup, 'glass reflection edge', [0.018, 3.2, 0.02], [1.27, 0, 0.67], standard(0x99d9e8, 0.28, 0.17, { emissive: 0x2b7790, emissiveIntensity: 0.45 }), 0);
  box(caseGroup, 'glass top reflection', [2.4, 0.018, 0.02], [0, 1.66, 0.67], standard(0xb9e9f4, 0.2, 0.16, { emissive: 0x347d94, emissiveIntensity: 0.36 }), 0);
  // Motherboard tray and circuit details.
  box(caseGroup, 'motherboard', [1.72, 2.45, 0.12], [0.25, 0.2, -0.25], boardMat);
  box(caseGroup, 'cpu block', [0.73, 0.72, 0.16], [0.04, 0.53, -0.14], standard(0x34383e, 0.76, 0.24));
  box(caseGroup, 'cpu accent', [0.57, 0.56, 0.035], [0.04, 0.53, -0.045], standard(0x252a2e, 0.65, 0.25, { emissive: 0x102922, emissiveIntensity: 0.42 }));
  const cpuLight = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.018, 8, 48), standard(0x96f1ff, 0.38, 0.22, { emissive: 0x21cfff, emissiveIntensity: 2.2 }));
  cpuLight.position.set(0.04, 0.53, 0.005);
  caseGroup.add(cpuLight);
  for (let i = 0; i < 2; i++) {
    box(caseGroup, `memory module ${i + 1}`, [0.13, 0.96, 0.12], [0.69 + i * 0.2, 0.58, -0.11], standard(0x31353a, 0.7, 0.25, { emissive: 0xf15b2a, emissiveIntensity: 0.15 }));
    box(caseGroup, `memory light bar ${i + 1}`, [0.07, 0.83, 0.025], [0.69 + i * 0.2, 0.58, -0.038], standard(0x9cf2ff, 0.28, 0.2, { emissive: 0x36cfff, emissiveIntensity: 2.1 }), 0);
  }
  box(caseGroup, 'GPU light strip', [1.72, 0.035, 0.025], [0.08, -0.36, 0.41], standard(0xffa16c, 0.4, 0.22, { emissive: 0xff5428, emissiveIntensity: 1.8 }), 0);
  box(caseGroup, 'motherboard accent', [0.025, 1.62, 0.025], [1.04, 0.18, -0.17], standard(0x8deaff, 0.4, 0.22, { emissive: 0x24aaff, emissiveIntensity: 1.4 }), 0);
  for (let i = 0; i < 4; i++) {
    const trace = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.025), standard(0x91eeff, 0.35, 0.25, { emissive: 0x32bfff, emissiveIntensity: 1.7 }));
    trace.position.set(-0.78 + i * 0.18, -0.02, -0.13);
    caseGroup.add(trace);
  }
  for (let i = 0; i < 5; i++) box(caseGroup, `circuit trace ${i}`, [0.72 + (i % 2) * 0.18, 0.018, 0.012], [-0.3 + (i % 2) * 0.1, 0.05 - i * 0.17, -0.165], standard(0x647466, 0.6, 0.5));
  // Board heatsinks, expansion slots and memory contacts add readable hardware detail.
  box(caseGroup, 'VRM heatsink upper', [0.3, 0.63, 0.22], [-0.79, 1.18, -0.08], standard(0x343941, 0.82, 0.25));
  box(caseGroup, 'VRM heatsink lower', [0.25, 0.55, 0.2], [-0.78, -0.88, -0.08], standard(0x343941, 0.82, 0.25));
  for (let i = 0; i < 7; i++) box(caseGroup, `heatsink fin ${i}`, [0.035, 0.48, 0.025], [-0.94 + i * 0.045, 1.18, 0.045], standard(0x858b94, 0.82, 0.29), 0);
  for (let i = 0; i < 3; i++) box(caseGroup, `PCIe slot ${i + 1}`, [0.82, 0.045, 0.028], [-0.25, -0.98 + i * 0.17, -0.105], standard(0x777d84, 0.65, 0.34), 0);
  for (let i = 0; i < 6; i++) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.1, 16), standard(0xb0b4b9, 0.75, 0.24));
    cap.position.set(-0.67 + (i % 3) * 0.14, 0.94 - Math.floor(i / 3) * 0.18, -0.02);
    caseGroup.add(cap);
  }
  // Three-fan GPU.
  box(caseGroup, 'graphics card', [2.22, 0.63, 0.62], [0.08, -0.65, 0.08], standard(0x24282e, 0.76, 0.25));
  box(caseGroup, 'GPU top plate', [2.18, 0.085, 0.6], [0.08, -0.32, 0.08], standard(0x41454b, 0.76, 0.24));
  box(caseGroup, 'GPU end cap', [0.12, 0.54, 0.56], [1.2, -0.65, 0.08], standard(0x757b82, 0.78, 0.22));
  for (let i = 0; i < 2; i++) fan(caseGroup, 0.205, [-0.38 + i * 0.82, -0.65, 0.405]);
  for (let i = 0; i < 3; i++) box(caseGroup, `GPU power connector ${i + 1}`, [0.12, 0.08, 0.07], [-0.82 + i * 0.16, -0.26, -0.24], standard(0x1c2025, 0.3, 0.4), 0.01);
  // Braided power leads route naturally from the GPU toward the case edge.
  cable(caseGroup, [[-0.65, -0.29, -0.22], [-0.5, -0.12, -0.04], [-0.45, 0.24, -0.02], [-0.72, 0.47, 0.02]], 0x191c22, 0.035);
  cable(caseGroup, [[-0.48, -0.29, -0.22], [-0.3, -0.1, -0.04], [-0.28, 0.22, -0.02], [-0.55, 0.47, 0.02]], 0x252930, 0.028);
  // CPU cooling block, radiator and front intake.
  box(caseGroup, 'radiator', [1.62, 0.22, 0.38], [0.05, 1.42, 0.1], darkMat);
  for (let i = 0; i < 3; i++) fan(caseGroup, 0.34, [-1.02, 0.99 - i * 0.91, 0.13]);
  box(caseGroup, 'power supply shroud', [2.22, 0.48, 0.83], [0, -1.48, 0.02], standard(0x1a1d22, 0.65, 0.3));
  box(caseGroup, 'power supply accent', [0.6, 0.026, 0.02], [-0.65, -1.23, 0.445], accentMat, 0);
  box(caseGroup, 'PSU grille', [1.3, 0.025, 0.025], [0.35, -1.29, 0.445], standard(0x777d82, 0.56, 0.4), 0);
  for (let i = 0; i < 5; i++) box(caseGroup, `PSU vent ${i + 1}`, [0.035, 0.22, 0.02], [0.75 + i * 0.1, -1.48, 0.45], standard(0x4b5057, 0.5, 0.4), 0);
  // Visible coolant tubes link the CPU block and top radiator.
  cable(caseGroup, [[-0.3, 0.68, -0.1], [-0.54, 0.88, 0.18], [-0.56, 1.24, 0.22], [-0.48, 1.4, 0.19]], 0x121a22, 0.045);
  cable(caseGroup, [[0.37, 0.68, -0.1], [0.58, 0.9, 0.18], [0.58, 1.23, 0.22], [0.55, 1.4, 0.19]], 0x121a22, 0.045);
  // Front I/O on the visible front edge.
  box(caseGroup, 'front I/O', [0.72, 0.11, 0.045], [0.8, 1.63, 0.68], standard(0x55585e, 0.65, 0.3), 0.01);
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.045, 20, 16), new THREE.MeshStandardMaterial({ color: 0xff7045, emissive: 0xff3c17, emissiveIntensity: 2.6 }));
  led.position.set(1.06, 1.62, 0.72);
  caseGroup.add(led);
  root.add(caseGroup);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.8, 0.12, 64), standard(0x24272c, 0.8, 0.25));
  base.position.y = -2.18;
  base.receiveShadow = true;
  root.add(base);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.025, 10, 64), standard(0xe85c35, 0.65, 0.24, { emissive: 0xa03217, emissiveIntensity: 0.8 }));
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = -2.1;
  root.add(baseRing);
  root.userData.fans = caseGroup.children.filter((child) => child.userData.rotor);
  return root;
}

export function setupFloatingModel() {
  const container = document.querySelector('#model-stage');
  const canvas = document.querySelector('#pc-canvas');
  if (!container || !canvas) return;
  const loading = document.querySelector('#model-loading');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    loading.textContent = '3D PREVIEW UNAVAILABLE — CHECK BROWSER GRAPHICS SETTINGS';
    loading.classList.add('visible');
    console.error('WebGL renderer could not be initialized.', error);
    return;
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
  camera.position.set(0, 0.08, 10.7);
  scene.add(new THREE.HemisphereLight(0xc9d8ed, 0x17171b, 2.6));
  const key = new THREE.DirectionalLight(0xffe3d4, 4.8);
  key.position.set(4, 6, 8);
  scene.add(key);
  const fill = new THREE.PointLight(0x7892bc, 18, 15);
  fill.position.set(-4, 1, 4);
  scene.add(fill);
  const rim = new THREE.PointLight(0xff542b, 26, 12);
  rim.position.set(3, 1, -3);
  scene.add(rim);
  const floorGlow = new THREE.PointLight(0xf15b2a, 3, 9);
  floorGlow.position.set(0, -3.5, 2);
  scene.add(floorGlow);
  const coolBounce = new THREE.PointLight(0x24cfff, 8, 7);
  coolBounce.position.set(-2.5, 1.2, 2.8);
  scene.add(coolBounce);
  const rig = new THREE.Group();
  const pc = makePc();
  pc.scale.setScalar(0.86);
  rig.add(pc);
  scene.add(rig);
  loading.classList.remove('visible');
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  let yaw = -0.38;
  let pitch = 0.025;
  let pointerX = 0;
  let pointerY = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastFrame = 0;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const onDown = (event) => {
    if (event.target.closest('button')) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    container.setPointerCapture(event.pointerId);
  };
  const onMove = (event) => {
    if (dragging) {
      yaw += (event.clientX - lastX) * 0.008;
      pitch = clamp(pitch + (lastY - event.clientY) * 0.004, -0.32, 0.32);
      lastX = event.clientX;
      lastY = event.clientY;
    } else {
      const bounds = container.getBoundingClientRect();
      pointerX = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
      pointerY = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
    }
  };
  const onUp = () => { dragging = false; };
  container.addEventListener('pointerdown', onDown);
  container.addEventListener('pointermove', onMove, { passive: true });
  container.addEventListener('pointerup', onUp);
  container.addEventListener('pointercancel', onUp);
  document.querySelector('#model-rotate-left').addEventListener('click', () => { yaw -= 0.42; });
  document.querySelector('#model-rotate-right').addEventListener('click', () => { yaw += 0.42; });
  document.querySelector('#model-reset').addEventListener('click', () => { yaw = -0.38; pitch = 0.025; });
  let raf = 0;
  const render = (time) => {
    raf = requestAnimationFrame(render);
    if (reduceMotion.matches && time - lastFrame < 80) return;
    lastFrame = time;
    if (!dragging && !reduceMotion.matches) yaw += 0.0018;
    if (!reduceMotion.matches) {
      const hue = (time * 0.00012) % 1;
      pc.userData.fans.forEach((fanGroup, index) => {
        fanGroup.userData.rotor.rotation.z += 0.18 + index * 0.012;
        const color = new THREE.Color().setHSL((hue + index / pc.userData.fans.length) % 1, 0.92, 0.58);
        fanGroup.userData.rgbMaterials.forEach((material, materialIndex) => {
          material.color.copy(color);
          material.emissive.copy(color);
          material.emissiveIntensity = materialIndex === 3 ? 0.16 : materialIndex === 2 ? 1.5 : 0.9;
        });
      });
    }
    rig.rotation.y += (yaw + (dragging ? 0 : pointerX * 0.1) - rig.rotation.y) * 0.075;
    rig.rotation.x += (pitch - pointerY * 0.06 - rig.rotation.x) * 0.075;
    rig.position.y = reduceMotion.matches ? 0 : Math.sin(time * 0.00075) * 0.075;
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(render);
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    renderer.dispose();
  }, { once: true });
}
