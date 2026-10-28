import { setupFloatingModel } from './model.js';
import { renderCatalog, setupComponents, setupNavigation, setupReveals, setupBuildPlanner } from './interactions.js';

setupNavigation();
renderCatalog();
setupComponents();
setupReveals();
setupBuildPlanner();
setupFloatingModel();

document.querySelector('.hero-video')?.addEventListener('error', (event) => {
  const video = event.currentTarget;
  if (video.dataset.fallbackTried) return;
  video.dataset.fallbackTried = 'true';
  video.poster = `${import.meta.env.BASE_URL}images/hardware-editorial.jpg`;
  video.src = `${import.meta.env.BASE_URL}images/14203516_3840_2160_25fps.mp4`;
  video.load();
});
