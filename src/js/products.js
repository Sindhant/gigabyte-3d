export const storyBeats = [
  {
    kicker: '01 / THE BIG PICTURE', title: 'Your world.<br>Your rules.', heading: 'MAKE ROOM<br>FOR <em>MORE.</em>',
    description: 'A setup is a sum of its parts — and a reflection of its player. Take a closer look at the hardware and the feeling around it.',
    card: 'A considered setup brings performance, comfort, and personal style into one space. Start with the parts that matter to you.',
    image: import.meta.env.BASE_URL + 'images/hardware-editorial.jpg', label: 'THE WHOLE BUILD', link: 'https://www.gigabyte.com/DIY-KIT'
  },
  {
    kicker: '02 / GRAPHICS', title: 'Make every frame count.', heading: 'DRAW YOUR<br>OWN <em>WORLD.</em>',
    description: 'Graphics shape what you see on screen. The best fit depends on your games, display, and the settings you want to play with.',
    card: 'Explore the current graphics lineup and check the product page for exact model features and compatibility.',
    image: import.meta.env.BASE_URL + 'images/hardware-detail.jpg', label: 'GRAPHICS / VISUAL STUDY', link: 'https://www.gigabyte.com/Graphics-Card'
  },
  {
    kicker: '03 / PLATFORM + THERMALS', title: 'The inside matters.', heading: 'GOOD BUILDS<br>RUN <em>DEEP.</em>',
    description: 'Platform choices, airflow, and cooling all shape the build. Compatibility is part of the craft — not an afterthought.',
    card: 'Start with the platform you need, then verify socket, memory support, dimensions, and cooling clearances for the actual products.',
    image: import.meta.env.BASE_URL + 'images/component-build.jpg', label: 'PLATFORM / DETAIL STUDY', link: 'https://www.gigabyte.com/Motherboard'
  },
  {
    kicker: '04 / MAKE IT YOURS', title: 'The setup is yours.', heading: 'MAKE IT<br><em>PERSONAL.</em>',
    description: 'The right setup feels right to you. Explore the wider product family and follow the details back to the official source.',
    card: 'Browse the official catalog for current products, regional availability, and verified specifications.',
    image: import.meta.env.BASE_URL + 'images/hardware-editorial.jpg', label: 'THE COMPLETE SETUP', link: 'https://www.gigabyte.com/DIY-KIT'
  }
];

export const categories = [
  { name: 'Graphics Cards', description: 'Frames, detail, atmosphere.', icon: '◉', url: 'https://www.gigabyte.com/Graphics-Card' },
  { name: 'Motherboards', description: 'The platform underneath.', icon: '▦', url: 'https://www.gigabyte.com/Motherboard' },
  { name: 'Gaming Laptops', description: 'Your setup, off the desk.', icon: '▭', url: 'https://www.gigabyte.com/Laptop' },
  { name: 'Gaming Monitors', description: 'Make the picture yours.', icon: '▱', url: 'https://www.gigabyte.com/Monitor' },
  { name: 'PC Cases', description: 'The frame for your build.', icon: '▤', url: 'https://www.gigabyte.com/PC-Case' },
  { name: 'Power Supplies', description: 'Power for the platform.', icon: 'ϟ', url: 'https://www.gigabyte.com/Power-Supply' },
  { name: 'Cooling', description: 'Airflow is a team sport.', icon: '⌁', url: 'https://www.gigabyte.com/CPU-Cooler' },
  { name: 'Memory', description: 'Room for active workloads.', icon: '▥', url: 'https://www.gigabyte.com/Memory' },
  { name: 'SSD Storage', description: 'Space for what is next.', icon: '▰', url: 'https://www.gigabyte.com/SSD' },
  { name: 'Mini PCs', description: 'Small footprint, full setup.', icon: '▪', url: 'https://www.gigabyte.com/Mini-Pc' }
];

export const components = [
  { name: 'Graphics cards', label: '01 / VISUAL STUDY', kicker: 'GRAPHICS / VISUAL REFERENCE', text: 'A visual study of the hardware that draws the world. Image shown is editorial reference, not a GIGABYTE product.', image: import.meta.env.BASE_URL + 'images/hardware-detail.jpg', url: 'https://www.gigabyte.com/Graphics-Card', position: 'center 55%', ring: ['68%', '30%'] },
  { name: 'Motherboards', label: '02 / PLATFORM STUDY', kicker: 'PLATFORM / VISUAL REFERENCE', text: 'A motherboard connects key system components. Check the exact product page for socket, expansion, and compatibility details.', image: 'https://images.unsplash.com/photo-1592664474505-51c549ad15c5?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/Motherboard', position: '60% 48%', ring: ['58%', '38%'] },
  { name: 'Cooling', label: '03 / AIRFLOW STUDY', kicker: 'THERMALS / VISUAL REFERENCE', text: 'Cooling is about more than fan count. Case airflow, cooler fit, and component requirements all matter.', image: 'https://images.unsplash.com/photo-1513366884929-f0b3bedfb653?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/CPU-Cooler', position: '68% 42%', ring: ['73%', '31%'] },
  { name: 'Memory', label: '04 / MEMORY STUDY', kicker: 'MEMORY / VISUAL REFERENCE', text: 'Memory supports active work. Type, capacity, speed, and platform compatibility depend on the selected system.', image: 'https://images.unsplash.com/photo-1676554565685-3aeb5d7ad1b7?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/Memory', position: '60% 36%', ring: ['59%', '29%'] },
  { name: 'SSD storage', label: '05 / STORAGE STUDY', kicker: 'STORAGE / VISUAL REFERENCE', text: 'SSDs provide persistent storage. Verify capacity, form factor, interface, and compatibility on the product page.', image: 'https://images.unsplash.com/photo-1601737487795-dab272f52420?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/SSD', position: '46% 60%', ring: ['50%', '58%'] },
  { name: 'Power supplies', label: '06 / POWER STUDY', kicker: 'POWER / VISUAL REFERENCE', text: 'Power supply selection depends on the complete build and its requirements. No wattage or product is assumed here.', image: 'https://images.unsplash.com/photo-1756576170672-1123237f1d77?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/Power-Supply', position: '40% 72%', ring: ['48%', '72%'] },
  { name: 'PC cases', label: '07 / ENCLOSURE STUDY', kicker: 'ENCLOSURE / VISUAL REFERENCE', text: 'The case shapes layout, airflow, and fit. Check dimensions and clearance against each component you choose.', image: 'https://images.unsplash.com/photo-1718777025831-5cb28feb8518?auto=format&fit=crop&w=1800&q=85', url: 'https://www.gigabyte.com/PC-Case', position: '52% 48%', ring: ['50%', '50%'] }
];
