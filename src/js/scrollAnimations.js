import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const storyScenes = [
  { n: '01 — 04', kicker: '01 / Graphics', title: 'Graphics, unleashed.', heading: 'Graphics,<br>unleashed.', description: 'A closer look at the graphics card position in this procedural model. No real product or specification is represented.', focus: [0.15, -0.87, 1.2], camera: [1.7, -0.55, 5.2], rotation: 0.1 },
  { n: '02 — 04', kicker: '02 / Platform', title: 'The platform beneath.', heading: 'The platform<br>beneath.', description: 'The motherboard connects the conceptual system components; this placeholder does not represent an identified board.', focus: [0.28, 0.15, 1.1], camera: [1.35, 0.25, 5.55], rotation: -0.08 },
  { n: '03 — 04', kicker: '03 / Cooling', title: 'Cool under pressure.', heading: 'Cool under<br>pressure.', description: 'Fans and a top radiator are represented as illustrative geometry, not a measured or named cooling solution.', focus: [0.45, 0.5, 1.05], camera: [1.4, 1.05, 5.7], rotation: 0.13 },
  { n: '04 — 04', kicker: '04 / Complete system', title: 'One complete system.', heading: 'One complete<br>system.', description: 'A wider view brings the illustrative components together. Explore official product categories for real product information.', focus: [0, 0, 0], camera: [0, 0.1, 8.2], rotation: -0.12 }
];

function updatePanel(index) {
  const item = storyScenes[Math.min(storyScenes.length - 1, index)];
  document.querySelector('#story-step').textContent = item.n;
  document.querySelector('#scene-progress').textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#story-heading').innerHTML = item.heading;
  document.querySelector('#story-copy').textContent = item.description;
  document.querySelector('#story-kicker').textContent = item.kicker;
  document.querySelector('#story-title').textContent = item.title;
  document.querySelector('#story-description').textContent = item.description;
  const url = index === 0 ? 'https://www.gigabyte.com/Graphics-Card' : index === 1 ? 'https://www.gigabyte.com/Motherboard' : index === 2 ? 'https://www.gigabyte.com/CPU-Cooler' : 'https://www.gigabyte.com/DIY-KIT';
  document.querySelector('#story-panel .text-link').href = url;
}

export function setupScrollStory(pcScene, reducedMotion) {
  const panel = document.querySelector('#story-panel');
  if (!pcScene) {
    updatePanel(0);
    panel.style.opacity = '1';
    panel.style.visibility = 'visible';
    return () => {};
  }
  if (reducedMotion) {
    updatePanel(0);
    gsap.set(panel, { autoAlpha: 1 });
    gsap.set(pcScene.camera.position, { x: 1.4, y: 0.1, z: 6.8 });
    return () => {};
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.experience',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.15,
      onUpdate: (self) => updatePanel(Math.min(3, Math.floor(self.progress * 4)))
    }
  });
  storyScenes.forEach((item, index) => {
    timeline.to(pcScene.camera.position, { x: item.camera[0], y: item.camera[1], z: item.camera[2], duration: 1, ease: 'none' }, index);
    timeline.to(pcScene.pc.rotation, { y: item.rotation, duration: 1, ease: 'none' }, index);
    timeline.to(pcScene.pc.position, { x: -item.focus[0] * 0.09, y: -item.focus[1] * 0.08, duration: 1, ease: 'none' }, index);
    timeline.to(panel, { autoAlpha: index === 3 ? 0 : 1, duration: 0.18, ease: 'none' }, index + 0.13);
  });
  updatePanel(0);
  return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
}

export function setupInterfaceAnimations(reducedMotion) {
  if (reducedMotion) return () => {};
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline.from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.55, delay: 0.1 })
    .from('.hero h1', { y: 38, opacity: 0, duration: 0.85 }, '-=0.2')
    .from('.hero-copy,.hero-actions', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.35');
  const revealTargets = gsap.utils.toArray('.section-heading,.category-card,.feature-card,.tech-grid article,.explorer-layout');
  revealTargets.forEach((element, i) => {
    gsap.from(element, {
      y: 22, opacity: 0, duration: 0.65, delay: (i % 4) * 0.04, ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    });
  });
  return () => { ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); heroTimeline.kill(); };
}
