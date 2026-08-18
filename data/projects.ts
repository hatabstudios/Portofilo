export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  image: string; // Standard screenshot or thumbnail image path / URL
  subtitle?: string;
  badge?: string;
  accentColor?: string; // Signature accent color hex
  glowColor?: string; // Glow RGBA string
  emblemText?: string; // Lettermark emblem text (auto-generated if omitted)
  bgGradient?: string; // CSS background gradient
  texturePath?: string; // Deprecated legacy texture path
  align?: 'left' | 'right'; // Per-card layout alignment
  backgroundVideo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'majarrah',
    name: 'MAJARRAH',
    subtitle: 'Web Development & E-Commerce',
    tagline: 'Heavyweight streetwear brand storefront built in Cairo.',
    description:
      'Developed the web platform for Drop 01 & Eclipse Collection teaser. Coded from provided brand assets into a high-performance web experience.',
    url: 'https://majarrah.vercel.app/',
    image: '/textures/majarrah_screenshot.png',
    badge: 'WEB APP IMPLEMENTATION',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    align: 'left',
  },
  {
    id: 'aasifa',
    name: 'AASIFA',
    subtitle: 'Teaser Platform Implementation',
    tagline: 'Exclusive oversized streetwear drop teaser from Egypt.',
    description:
      'Engineered the single-page teaser web application from provided brand direction, implementing high-speed layout rendering for luxury streetwear drops.',
    url: 'https://aasifaa.vercel.app/',
    image: '/textures/aasifa_screenshot.png',
    badge: 'FRONTEND DEVELOPMENT',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    align: 'right',
  },
  {
    id: 'pulse-gym',
    name: 'PULSE GYM',
    subtitle: 'High-Performance Fitness & Club Template',
    tagline: 'Cyberpunk athletic performance center & membership portal.',
    description:
      'Feature-rich web template for luxury fitness centers, personal training reservations, workout routines, and supplement storefronts.',
    url: '/demo/pulse-gym',
    image: '/textures/gym_keycard.jpg',
    badge: 'FITNESS TEMPLATE',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    align: 'left',
  },
  {
    id: 'cafe-lumiere',
    name: 'CAFÉ LUMIÈRE',
    subtitle: 'Artisan Coffee & Bakery Digital Menu',
    tagline: 'Warm, atmospheric digital bistro menu & reservation showcase.',
    description:
      'Aesthetic website template crafted for boutique cafes, specialty roasters, online table booking, and QR menu ordering.',
    url: '/demo/cafe-lumiere',
    image: '/textures/cafe_keycard.jpg',
    badge: 'HOSPITALITY TEMPLATE',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    align: 'right',
  },
  {
    id: 'vela-estate',
    name: 'VELA ESTATE',
    subtitle: 'Architectural Real Estate Showcase',
    tagline: 'Luxury penthouse & architectural development showcase.',
    description:
      'High-end real estate web template featuring interactive floorplan tours, property galleries, location maps, and private client inquiry portal.',
    url: '/demo/vela-estate',
    image: '/textures/realestate_keycard.jpg',
    badge: 'REAL ESTATE TEMPLATE',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    align: 'left',
  },
  {
    id: 'blade-comb',
    name: 'BLADE & COMB',
    subtitle: 'Cyber Barbershop & Grooming Lounge',
    tagline: 'Premium barber booking platform & grooming products storefront.',
    description:
      'Sleek dark-mode web application designed for modern barber studios, appointments, service packages, and hair care product sales.',
    url: '/demo/blade-comb',
    image: '/textures/barber_keycard.jpg',
    badge: 'SALON TEMPLATE',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.45)',
    align: 'right',
  },
  {
    id: 'echo-lounge',
    name: 'ECHO LOUNGE',
    subtitle: 'VIP Nightlife & Event Ticket Platform',
    tagline: 'Electric event platform & VIP table reservation app.',
    description:
      'Immersive nightlife venue web application built for live music events, DJ lineups, VIP table booking, and guestlist registration.',
    url: '/demo/echo-lounge',
    image: '/textures/nightclub_keycard.jpg',
    badge: 'NIGHTLIFE TEMPLATE',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    align: 'left',
  },
  {
    id: 'nexus-ai',
    name: 'NEXUS AI',
    subtitle: 'B2B SaaS Tech & AI Platform',
    tagline: 'Ultra-modern AI SaaS product landing page & dashboard interface.',
    description:
      'Conversion-focused tech startup template featuring interactive pricing tier matrices, feature breakdowns, and API documentation portal.',
    url: '/demo/nexus-ai',
    image: '/textures/saas_keycard.jpg',
    badge: 'SAAS TECH TEMPLATE',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    align: 'right',
  },
  {
    id: 'apex-motors',
    name: 'APEX MOTORS',
    subtitle: 'Supercar & Custom Auto Studio',
    tagline: 'High-performance exotic automotive studio & vehicle configurator.',
    description:
      'Premium automotive web experience highlighting exotic vehicle inventory, custom detailing specs, performance packages, and test drive scheduler.',
    url: '/demo/apex-motors',
    image: '/textures/motors_keycard.jpg',
    badge: 'AUTOMOTIVE TEMPLATE',
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    align: 'left',
  },
];

