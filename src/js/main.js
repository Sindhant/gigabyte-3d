import { setupFloatingModel } from './model.js';
import { renderCatalog, setupComponents, setupNavigation, setupReveals, setupBuildPlanner } from './interactions.js';

setupNavigation();
renderCatalog();
setupComponents();
setupReveals();
setupBuildPlanner();
setupFloatingModel();
