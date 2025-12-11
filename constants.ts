import { POI, GreenRule, Product } from './types';

export const APP_NAME = "ECO-Tour San Severo";
export const ERAZMUS_PROJECT_NAME = "ECOEDU - Culture Through Education";

export const POI_DATA: POI[] = [
  {
    id: '1',
    title: 'Teatro Giuseppe Verdi',
    description: 'A magnificent historic theater in the heart of San Severo. It represents the cultural heartbeat of the city.',
    ecoTip: 'Reach the theater on foot from the city center to reduce carbon footprint.',
    image: 'https://picsum.photos/seed/theater/800/600',
    category: 'historic',
    lat: 41.686,
    lng: 15.378
  },
  {
    id: '2',
    title: 'Cattedrale di Santa Maria Assunta',
    description: 'The main religious site, featuring stunning baroque architecture and preserving centuries of history.',
    ecoTip: 'Observe silence to respect the environment and the sanctity of the place.',
    image: 'https://picsum.photos/seed/cathedral/800/600',
    category: 'historic',
    lat: 41.688,
    lng: 15.380
  },
  {
    id: '3',
    title: 'Historic Olive Mills',
    description: 'Ancient underground mills where the famous Daunia oil was produced. A testament to rural engineering.',
    ecoTip: 'Support local producers by buying oil directly from the mill in reusable containers.',
    image: 'https://picsum.photos/seed/oliveoil/800/600',
    category: 'production',
    lat: 41.690,
    lng: 15.385
  },
  {
    id: '4',
    title: 'Stone Quarries of Apricena',
    description: 'Located near San Severo, these quarries produce the famous "Pietra di Apricena". The site is being requalified for tourism.',
    ecoTip: 'Stick to marked paths to protect the regenerating flora around the quarry.',
    image: 'https://picsum.photos/seed/quarry/800/600',
    category: 'nature',
    lat: 41.780,
    lng: 15.440
  },
  {
    id: '5',
    title: 'Vineyards of San Severo',
    description: 'Expansive vineyards producing DOC San Severo wine. A landscape of geometry and nature.',
    ecoTip: 'Participate in organic wine tastings to support pesticide-free agriculture.',
    image: 'https://picsum.photos/seed/vineyard/800/600',
    category: 'nature',
    lat: 41.670,
    lng: 15.360
  }
];

export const GREEN_RULES: GreenRule[] = [
  { id: 1, title: 'Walk or Bike', description: 'Explore the historic center on foot or use a bicycle.', icon: 'fa-bicycle' },
  { id: 2, title: 'Buy Local (Km0)', description: 'Purchase food and crafts made in San Severo.', icon: 'fa-basket-shopping' },
  { id: 3, title: 'Respect Heritage', description: 'Do not touch frescoes or damage ancient stones.', icon: 'fa-monument' },
  { id: 4, title: 'No Plastic', description: 'Use a reusable water bottle. Refill at public fountains.', icon: 'fa-bottle-water' },
  { id: 5, title: 'Silent Tourism', description: 'Keep noise levels low to respect residents and wildlife.', icon: 'fa-volume-low' },
  { id: 6, title: 'Stay on Paths', description: 'In nature areas, do not walk off the marked trails.', icon: 'fa-shoe-prints' },
  { id: 7, title: 'Save Energy', description: 'Turn off lights and AC when leaving your accommodation.', icon: 'fa-lightbulb' },
  { id: 8, title: 'Recycle', description: 'Follow the strict local recycling rules for waste.', icon: 'fa-recycle' },
  { id: 9, title: 'Digital First', description: 'Use this App instead of printing paper maps.', icon: 'fa-mobile-screen' },
  { id: 10, title: 'Share Sustainably', description: 'Take photos, but leave only footprints.', icon: 'fa-camera' }
];

export const LOCAL_PRODUCTS: Product[] = [
  {
    id: 'oil',
    name: 'Daunia Extra Virgin Olive Oil',
    description: 'The "Green Gold" of Puglia. Rich in antioxidants and flavor.',
    sustainabilityFactor: 'Produced from centuries-old trees using low-impact mechanical extraction.',
    image: 'https://picsum.photos/seed/oil/400/300'
  },
  {
    id: 'wine',
    name: 'San Severo DOC Wine',
    description: 'Robust red wines and crisp whites from the sunny plains of Tavoliere.',
    sustainabilityFactor: 'Many local wineries are transitioning to fully organic farming.',
    image: 'https://picsum.photos/seed/wineglass/400/300'
  },
  {
    id: 'stone',
    name: 'Apricena Stone Craft',
    description: 'Artistic creations made from the local limestone.',
    sustainabilityFactor: 'Durable, natural material that lasts centuries, reducing need for replacement.',
    image: 'https://picsum.photos/seed/stonesculpture/400/300'
  }
];
