import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sehr-azhar',
    name: 'Azhar',
    tagline: 'Echoes of Grace | SEHR',
    price: 7999,
    category: 'eid-collection',
    categoryLabel: "Echoes of Grace '26",
    badge: 'Signature Panjabi',
    images: [
      '/images/azhar_portrait.png',
      '/images/azhar_collar.jpg',
      '/images/azhar_standing.png',
      '/images/azhar_reading.png'
    ],
    description: 'An ode to understated luxury. Crafted from a premium bamboo cotton blend, Azhar features a tone-on-tone embroidered body and bespoke handcrafted clustered buttons along the placket. Designed for an immaculate silhouette and effortless breathability during festive celebrations.',
    fabricDetails: [
      'Premium Bamboo Cotton Blend',
      'Artisanal Tone-on-Tone Embroidered Body',
      'Handcrafted Clustered Fabric Loop Buttons',
      'Structured Mandarin Collar with SEHR Woven Atelier Label',
      'Concealed Functional Side Pockets',
      'Tailored Regular Fit engineered for fluid comfort'
    ],
    careInstructions: [
      'Dry clean exclusively to preserve fine embroidery',
      'Steam iron on reverse with press cloth',
      'Do not bleach or tumble dry',
      'Store suspended on a wooden hanger inside garment cover'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    featured: true
  },
  {
    id: 'sehr-yazeer',
    name: 'Yazeer',
    tagline: 'Echoes of Grace | SEHR',
    price: 7999,
    category: 'eid-collection',
    categoryLabel: "Echoes of Grace '26",
    badge: 'Signature Panjabi',
    images: [
      '/images/yazeer_portrait.jpg',
      '/images/yazeer_embroidery.png',
      '/images/yazeer_archway.jpg',
      '/images/yazeer_standing.jpg'
    ],
    description: 'Commanding and regal. Tailored from a premium bamboo cotton blend in a rich heritage olive moss tone, Yazeer is adorned with delicate gold-hued floral embroidery across the body and finished with distinctive handcrafted clustered buttons.',
    fabricDetails: [
      'Premium Bamboo Cotton Blend',
      'Intricate Gold Threadwork Embroidered Body',
      'Handcrafted Clustered Loop Buttons',
      'Architectural Mandarin Band Collar',
      'Reinforced Side Slits for ease of movement',
      'Tailored Regular Fit for traditional festive grandeur'
    ],
    careInstructions: [
      'Dry clean only to maintain gold zari needlework lustre',
      'Cool steam iron on reverse side',
      'Do not wring or soak',
      'Keep away from direct sunlight when storing'
    ],
    sizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    featured: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Creations' },
  { id: 'eid-collection', label: "Echoes of Grace '26" },
];

export const ANNOUNCEMENTS = [
  'Complimentary Express Shipping in Dhaka on orders over ৳10,000',
  'Echoes of Grace — Eid ul Fitr 2026 Presentation Now Live',
  'Instagram Concierge (@sehr.bd): Sizing & Custom Alterations',
  'Worldwide Courier & International Dispatch to UK, USA & UAE'
];

export const SIZE_CHART = [
  { size: '38', chest: '40"', length: '40"', shoulder: '17.5"', sleeve: '24"' },
  { size: '40', chest: '42"', length: '42"', shoulder: '18.0"', sleeve: '24.5"' },
  { size: '42', chest: '44"', length: '44"', shoulder: '18.5"', sleeve: '25"' },
  { size: '44', chest: '46"', length: '45"', shoulder: '19.0"', sleeve: '25.5"' },
  { size: '46', chest: '48"', length: '46"', shoulder: '19.5"', sleeve: '26"' }
];
