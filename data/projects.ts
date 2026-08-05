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
  align: 'left' | 'right'; // Per-card layout alignment (Majarrah left, Aasifa right)
  /*
   * Easy swap for background videos (.mp4 / .webm):
   * Simply set `backgroundVideo: '/videos/majarrah.mp4'` to render video background.
   */
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
    texturePath: '/textures/MajarrahKeycardTexture.png',
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
    texturePath: '/textures/AasifaKeycardTexture.png',
    align: 'right',
    backgroundVideo: '',
  },
];
