export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  accentColor: string; // Hex color easily modifiable by customer
  accentColorHover: string;
  accentGlow: string;
  logo: {
    text: string;
    subtext: string;
    mark: string; // Icon or symbol text
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    mapsEmbedUrl: string;
    workingHours: {
      weekdays: string;
      weekends: string;
      holidays: string;
    };
  };
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
  nav: {
    label: string;
    href: string;
  }[];
  hero: {
    badge: string;
    headingLine1: string;
    headingHighlight: string;
    headingLine2: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    bgImage: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: "VORTEX ATHLETIC CLUB",
  tagline: "FORGE YOUR LEGACY",
  description:
    "Experience elite fitness, state-of-the-art machinery, world-class personal trainers, and high-energy group classes designed to push your limits.",
  domain: "https://vortexathletic.example.com",
  accentColor: "#E53E3E", // High-energy luxury Crimson Red (Change to #EAB308 for Gold, #10B981 for Emerald, #3B82F6 for Electric Blue, #84CC16 for Volt Green)
  accentColorHover: "#C53030",
  accentGlow: "rgba(229, 62, 62, 0.35)",

  logo: {
    text: "VORTEX",
    subtext: "FITNESS & ATHLETICS",
    mark: "V",
  },

  contact: {
    phone: "010X XXX XXXX",
    email: "contact@vortexathletic.eg",
    address: "Pyramids Road, Al Haram",
    city: "Giza, Cairo, Egypt",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456!2d31.1342!3d29.9792!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584587ac8f291b%3A0x810c2f3fa2a52424!2sThe%20Great%20Pyramid%20of%20Giza!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
    workingHours: {
      weekdays: "5:00 AM – 11:00 PM",
      weekends: "6:00 AM – 10:00 PM",
      holidays: "7:00 AM – 8:00 PM",
    },
  },

  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    twitter: "https://x.com",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Classes", href: "/classes" },
    { label: "Trainers", href: "/trainers" },
    { label: "Schedule", href: "/schedule" },
    { label: "Pricing", href: "/pricing" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    badge: "PREMIUM FITNESS CLUB",
    headingLine1: "TRANSFORM YOUR",
    headingHighlight: "BODY & MIND",
    headingLine2: "AT VORTEX CLUB",
    description:
      "Join an exclusive community dedicated to physical mastery. World-class equipment, personalized coaching, and luxury amenities standard.",
    primaryCta: {
      text: "Start Free 7-Day Pass",
      href: "/pricing",
    },
    secondaryCta: {
      text: "Explore Classes",
      href: "/classes",
    },
    bgImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    stats: [
      { value: "15,000+", label: "Square Feet Space" },
      { value: "35+", label: "Certified Trainers" },
      { value: "50+", label: "Weekly Classes" },
      { value: "99.4%", label: "Member Satisfaction" },
    ],
  },

  seo: {
    defaultTitle: "Vortex Athletic Club | Luxury Gym & Fitness Center",
    titleTemplate: "%s | Vortex Athletic Club",
    defaultDescription:
      "Premium gym template with state-of-the-art equipment, personalized training programs, high-energy group fitness classes, and luxury recovery lounge.",
    keywords: [
      "luxury gym",
      "fitness template",
      "personal trainer",
      "crossfit",
      "bodybuilding",
      "yoga studio",
      "hiit classes",
      "workout schedule",
    ],
  },
};
