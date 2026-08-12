export interface Project {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  url: string;
  badge: string;
  accentColor: string; // Signature accent color hex
  glowColor: string; // Glow RGBA string
  emblemText: string; // Lettermark logo on card
  bgGradient: string; // Radial CSS background gradient
  texturePath: string; // Dedicated custom texture file per card
  align: 'left' | 'right'; // Per-card layout alignment
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
    badge: 'WEB APP IMPLEMENTATION',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    emblemText: 'MJ',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(180, 83, 9, 0.3) 0%, rgba(17, 24, 39, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/Majarrahkeycard.jpg',
    align: 'left',
    backgroundVideo: '',
  },
  {
    id: 'aasifa',
    name: 'AASIFA',
    subtitle: 'Teaser Platform Implementation',
    tagline: 'Exclusive oversized streetwear drop teaser from Egypt.',
    description:
      'Engineered the single-page teaser web application from provided brand direction, implementing high-speed layout rendering for luxury streetwear drops.',
    url: 'https://aasifaa.vercel.app/',
    badge: 'FRONTEND DEVELOPMENT',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    emblemText: 'AF',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(67, 56, 202, 0.3) 0%, rgba(15, 23, 42, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/assifakeycard.jpg',
    align: 'right',
    backgroundVideo: '',
  },
  {
    id: 'pulse-gym',
    name: 'PULSE GYM',
    subtitle: 'High-Performance Fitness & Club Template',
    tagline: 'Cyberpunk athletic performance center & membership portal.',
    description:
      'Feature-rich web template for luxury fitness centers, personal training reservations, workout routines, and supplement storefronts.',
    url: '#pulse-gym',
    badge: 'FITNESS TEMPLATE',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    emblemText: 'PL',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.3) 0%, rgba(6, 78, 59, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/gym_keycard.jpg',
    align: 'left',
  },
  {
    id: 'cafe-lumiere',
    name: 'CAFÉ LUMIÈRE',
    subtitle: 'Artisan Coffee & Bakery Digital Menu',
    tagline: 'Warm, atmospheric digital bistro menu & reservation showcase.',
    description:
      'Aesthetic website template crafted for boutique cafes, specialty roasters, online table booking, and QR menu ordering.',
    url: '#cafe-lumiere',
    badge: 'HOSPITALITY TEMPLATE',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    emblemText: 'CL',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.3) 0%, rgba(67, 20, 7, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/cafe_keycard.jpg',
    align: 'right',
  },
  {
    id: 'vela-estate',
    name: 'VELA ESTATE',
    subtitle: 'Architectural Real Estate Showcase',
    tagline: 'Luxury penthouse & architectural development showcase.',
    description:
      'High-end real estate web template featuring interactive floorplan tours, property galleries, location maps, and private client inquiry portal.',
    url: '#vela-estate',
    badge: 'REAL ESTATE TEMPLATE',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    emblemText: 'VE',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.3) 0%, rgba(12, 74, 110, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/realestate_keycard.jpg',
    align: 'left',
  },
  {
    id: 'blade-comb',
    name: 'BLADE & COMB',
    subtitle: 'Cyber Barbershop & Grooming Lounge',
    tagline: 'Premium barber booking platform & grooming products storefront.',
    description:
      'Sleek dark-mode web application designed for modern barber studios, appointments, service packages, and hair care product sales.',
    url: '#blade-comb',
    badge: 'SALON TEMPLATE',
    accentColor: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.45)',
    emblemText: 'BC',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.3) 0%, rgba(88, 28, 135, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/barber_keycard.jpg',
    align: 'right',
  },
  {
    id: 'echo-lounge',
    name: 'ECHO LOUNGE',
    subtitle: 'VIP Nightlife & Event Ticket Platform',
    tagline: 'Electric event platform & VIP table reservation app.',
    description:
      'Immersive nightlife venue web application built for live music events, DJ lineups, VIP table booking, and guestlist registration.',
    url: '#echo-lounge',
    badge: 'NIGHTLIFE TEMPLATE',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    emblemText: 'EC',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, rgba(58, 12, 163, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/nightclub_keycard.jpg',
    align: 'left',
  },
  {
    id: 'nexus-ai',
    name: 'NEXUS AI',
    subtitle: 'B2B SaaS Tech & AI Platform',
    tagline: 'Ultra-modern AI SaaS product landing page & dashboard interface.',
    description:
      'Conversion-focused tech startup template featuring interactive pricing tier matrices, feature breakdowns, and API documentation portal.',
    url: '#nexus-ai',
    badge: 'SAAS TECH TEMPLATE',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    emblemText: 'NX',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.3) 0%, rgba(8, 51, 68, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/saas_keycard.jpg',
    align: 'right',
  },
  {
    id: 'apex-motors',
    name: 'APEX MOTORS',
    subtitle: 'Supercar & Custom Auto Studio',
    tagline: 'High-performance exotic automotive studio & vehicle configurator.',
    description:
      'Premium automotive web experience highlighting exotic vehicle inventory, custom detailing specs, performance packages, and test drive scheduler.',
    url: '#apex-motors',
    badge: 'AUTOMOTIVE TEMPLATE',
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    emblemText: 'AP',
    bgGradient:
      'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.3) 0%, rgba(69, 26, 3, 0.95) 65%, #030712 100%)',
    texturePath: '/textures/motors_keycard.jpg',
    align: 'left',
  },
];
