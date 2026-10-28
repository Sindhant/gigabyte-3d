import { gsap } from 'gsap';
import { categories, components } from './products.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function renderCatalog() {
  const grid = document.querySelector('#catalog-grid');
  grid.innerHTML = categories.map((item, index) => `
    <a class="catalog-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
      <span class="category-index">${String(index + 1).padStart(2, '0')} / CATEGORY</span><span class="category-symbol" aria-hidden="true">${item.icon}</span>
      <h3>${item.name}</h3><p>${item.description}</p><span class="card-link">Explore <span>↗</span></span>
    </a>`).join('');
}

const buildPlans = {
  entry: [
    ['Graphics card', '1080p entry gaming GPU', '₹22,000–₹30,000', 'Confirm GPU clearance, display outputs, and PSU guidance.', 'Graphics cards'],
    ['CPU', '6-core mainstream CPU', '₹10,000–₹15,000', 'Socket and BIOS must match the selected motherboard.', 'Processors'],
    ['Motherboard', 'Entry compatible platform', '₹8,000–₹12,000', 'Match CPU socket, RAM generation, M.2 support, and case size.', 'Motherboards'],
    ['Memory', '16 GB DDR4 kit', '₹3,000–₹5,000', 'Confirm DDR generation and board support; 32 GB is a possible upgrade.', 'Memory'],
    ['SSD', '1 TB NVMe', '₹4,500–₹6,500', 'Check M.2 size, interface, and motherboard slot support.', 'SSD'],
    ['Power supply', '650 W reputable unit', '₹5,000–₹7,500', 'Check GPU connector, PSU dimensions, and manufacturer power guidance.', 'Power supplies'],
    ['Case + cooling', 'Airflow case with stock fans', '₹5,500–₹9,000', 'Check GPU length, motherboard form factor, and cooler clearance.', 'PC cases']
  ],
  mid: [
    ['Graphics card', '1440p mid-range GPU', '₹35,000–₹55,000', 'Confirm GPU clearance, display outputs, and PSU guidance.', 'Graphics cards'],
    ['CPU', '6–8 core performance CPU', '₹16,000–₹24,000', 'Socket and BIOS must match the selected motherboard.', 'Processors'],
    ['Motherboard', 'Feature-rich compatible platform', '₹12,000–₹19,000', 'Match CPU socket, RAM generation, M.2 slots, and case size.', 'Motherboards'],
    ['Memory', '32 GB DDR5 kit', '₹7,000–₹11,000', 'Confirm DDR generation, supported speed, and board QVL.', 'Memory'],
    ['SSD', '1–2 TB NVMe', '₹6,000–₹11,000', 'Check M.2 size, interface, and motherboard slot support.', 'SSD'],
    ['Power supply', '750 W reputable unit', '₹7,000–₹11,000', 'Check GPU connector, PSU dimensions, and manufacturer power guidance.', 'Power supplies'],
    ['Case + cooling', 'Airflow case + tower cooler', '₹9,000–₹16,000', 'Check GPU length, radiator/cooler clearance, and motherboard form factor.', 'PC cases']
  ],
  high: [
    ['Graphics card', 'High-end gaming GPU', '₹70,000–₹1,60,000+', 'Check exact GPU power requirement, connector, and case clearance.', 'Graphics cards'],
    ['CPU', 'High-end gaming / creator CPU', '₹25,000–₹50,000', 'Socket, BIOS, cooler capacity, and workload should all match.', 'Processors'],
    ['Motherboard', 'Upper-tier compatible platform', '₹18,000–₹35,000', 'Match socket, RAM generation, VRM needs, M.2 slots, and case size.', 'Motherboards'],
    ['Memory', '32–64 GB DDR5 kit', '₹9,000–₹22,000', 'Confirm DDR generation, capacity support, speed, and QVL.', 'Memory'],
    ['SSD', '2–4 TB NVMe', '₹10,000–₹25,000', 'Check M.2 size, heatsink clearance, and PCIe generation.', 'SSD'],
    ['Power supply', '850–1000 W reputable unit', '₹11,000–₹22,000', 'Follow GPU maker power/connector advice and verify PSU dimensions.', 'Power supplies'],
    ['Case + cooling', 'Premium airflow case + high-capacity cooler', '₹15,000–₹32,000', 'Check GPU length, radiator placement, motherboard size, and cooler height.', 'PC cases']
  ]
};
const categoryLinks = {
  'Graphics cards': 'https://www.amazon.in/s?k=graphics+card',
  Processors: 'https://www.amazon.in/s?k=desktop+processor+CPU',
  Motherboards: 'https://www.amazon.in/s?k=desktop+motherboard',
  Memory: 'https://www.amazon.in/s?k=DDR4+DDR5+desktop+RAM',
  SSD: 'https://www.amazon.in/s?k=NVMe+M.2+SSD',
  'Power supplies': 'https://www.amazon.in/s?k=PC+power+supply+650W',
  'PC cases': 'https://www.amazon.in/s?k=PC+case+airflow'
};
export function setupBuildPlanner() {
  const select = document.querySelector('#budget-select');
  const budgetButtons = [...document.querySelectorAll('[data-budget]')];
  const cards = document.querySelector('#planner-mobile');
  const total = document.querySelector('#planner-total');
  const tierLabel = document.querySelector('#planner-tier-label');
  const progressFill = document.querySelector('#planner-progress-fill');
  const tierMeta = { entry: ['STARTER / 1080P', '34%'], mid: ['SWEET SPOT / 1440P', '67%'], high: ['ENTHUSIAST / HIGH-END', '100%'] };
  if (!select || !cards || !total) return;
  const render = () => {
    const plan = buildPlans[select.value];
    budgetButtons.forEach((button) => {
      const active = button.dataset.budget === select.value;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (tierLabel && progressFill) {
      tierLabel.textContent = tierMeta[select.value][0];
      progressFill.style.width = tierMeta[select.value][1];
    }
    cards.innerHTML = plan.map(([part, tier, price, check, category], index) => `<details class="planner-card" style="--card-index:${index}"><summary><span class="planner-card-index">0${index + 1}</span><span class="planner-card-part">${part}</span><span class="planner-card-price">${price}</span><span class="planner-card-toggle" aria-hidden="true">＋</span><small>${tier}</small></summary><div class="planner-card-detail"><p><b>FIT CHECK</b>${check}</p><a href="${categoryLinks[category]}" target="_blank" rel="noopener noreferrer">Compare ${category} listings <span aria-hidden="true">↗</span></a></div></details>`).join('');
    const bounds = plan.map(([, , price]) => price.replaceAll('₹', '').replaceAll(',', '').match(/[\d]+/g).map(Number));
    const min = bounds.reduce((sum, range) => sum + range[0], 0);
    const max = bounds.reduce((sum, range) => sum + (range[1] ?? range[0]), 0);
    const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;
    total.textContent = `${formatINR(min)}–${formatINR(max)}+`;
  };
  select.addEventListener('change', render);
  budgetButtons.forEach((button) => button.addEventListener('click', () => {
    select.value = button.dataset.budget;
    render();
  }));
  render();
}

export function setupComponents() {
  const tabs = document.querySelector('#component-tabs');
  const image = document.querySelector('#component-photo');
  const label = document.querySelector('#component-label');
  const kicker = document.querySelector('#component-kicker');
  const title = document.querySelector('#component-name');
  const copy = document.querySelector('#component-copy');
  const link = document.querySelector('#component-url');
  const hotspot = document.querySelector('#component-hotspot');
  const hotspotTag = document.querySelector('#hotspot-tag');
  const sceneCount = document.querySelector('#component-scene-count');
  const stage = document.querySelector('#component-stage');
  const prev = document.querySelector('#component-prev');
  const next = document.querySelector('#component-next');
  const story = document.querySelector('#component-scroll-story');
  tabs.innerHTML = components.map((item, index) => `<button class="component-tab${index === 0 ? ' active' : ''}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="component-stage" tabindex="${index === 0 ? '0' : '-1'}" data-component="${index}"><span>${String(index + 1).padStart(2, '0')} / COMPONENT</span><b>${item.name}</b></button>`).join('');
  let active = 0;
  let scrollStory = false;
  image.style.backgroundImage = `url('${components[0].image}')`;
  image.style.backgroundPosition = components[0].position;
  const choose = (index, fromScroll = false) => {
    const item = components[index];
    if (!item) return;
    active = index;
    if (!fromScroll && scrollStory) {
      const rect = story.getBoundingClientRect();
      const scrollRange = Math.max(1, story.offsetHeight - innerHeight);
      const nextProgress = (index + 0.5) / components.length;
      window.scrollTo({ top: window.scrollY + rect.top + nextProgress * scrollRange, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
    tabs.querySelectorAll('.component-tab').forEach((tab, tabIndex) => {
      tab.classList.toggle('active', tabIndex === index);
      tab.setAttribute('aria-selected', String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    image.style.backgroundImage = `url('${item.image}')`;
    image.style.backgroundPosition = item.position;
    image.setAttribute('aria-label', `${item.name} — editorial hardware image, illustrative only`);
    label.textContent = item.label;
    hotspot.style.left = item.ring[0];
    hotspot.style.top = item.ring[1];
    hotspotTag.textContent = item.label.split('/')[1]?.trim() || 'DETAIL';
    sceneCount.textContent = `${String(index + 1).padStart(2, '0')}—${String(components.length).padStart(2, '0')}`;
    kicker.textContent = item.kicker;
    title.innerHTML = item.name.replace(' ', '<br>');
    copy.textContent = item.text;
    link.href = item.url;
    link.innerHTML = `Explore ${item.name.toLowerCase()} <span>↗</span>`;
    gsap.fromTo(hotspot, { scale: 0.8, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
    gsap.fromTo([title, copy], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' });
    gsap.fromTo(image, { scale: 1.035 }, { scale: 1, duration: 0.65, ease: 'power2.out' });
  };
  tabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-component]');
    if (tab) choose(Number(tab.dataset.component));
  });
  tabs.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const next = (active + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + components.length) % components.length;
    choose(next);
    tabs.querySelector(`[data-component="${next}"]`).focus();
  });
  prev.addEventListener('click', () => choose((active - 1 + components.length) % components.length));
  next.addEventListener('click', () => choose((active + 1) % components.length));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let scrollQueued = false;
  const updateScrollStory = () => {
    scrollQueued = false;
    if (reduceMotion.matches || !scrollStory) return;
    const rect = story.getBoundingClientRect();
    const scrollRange = Math.max(1, story.offsetHeight - innerHeight);
    const progress = clamp(-rect.top / scrollRange, 0, 0.9999);
    const nextIndex = Math.floor(progress * components.length);
    if (nextIndex !== active) choose(nextIndex, true);
    frame = progress;
    stage.style.setProperty('--story-progress', `${Math.round(progress * 100)}%`);
    stage.dataset.scrollBeat = String(nextIndex + 1).padStart(2, '0');
  };
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScrollStory);
  };
  const enableScrollStory = () => {
    if (innerWidth <= 760 || reduceMotion.matches) {
      story.classList.remove('scroll-enabled');
      story.style.height = '';
      story.style.minHeight = '';
      scrollStory = false;
      window.removeEventListener('scroll', onScroll);
      return;
    }
    story.classList.add('scroll-enabled');
    story.style.height = `${innerHeight * 2.4}px`;
    story.style.minHeight = '1500px';
    scrollStory = true;
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollStory();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', enableScrollStory, { passive: true });
  reduceMotion.addEventListener?.('change', enableScrollStory);
  enableScrollStory();
  stage.addEventListener('pointermove', (event) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    image.style.transform = `scale(1.025) translate(${x}px, ${y}px)`;
  }, { passive: true });
  stage.addEventListener('pointerleave', () => { image.style.transform = ''; });
  choose(0, true);
}

export function setupNavigation() {
  const button = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  const close = () => { nav.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); button.textContent = '☰'; };
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', close));
}

export function setupReveals() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('.manifesto h2,.section-head,.catalog-card,.tech-list article');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('in-view');
      observer.unobserve(target);
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => { target.classList.add('reveal'); observer.observe(target); });
}
