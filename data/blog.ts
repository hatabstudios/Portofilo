export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Training" | "Nutrition" | "Recovery" | "Mindset";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  featured?: boolean;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "b1",
    slug: "hypertrophy-vs-strength-training-guide",
    title: "Hypertrophy vs. Raw Strength: Optimizing Rep Ranges & Rest Intervals",
    excerpt:
      "Understand the physiological differences between mechanical tension and metabolic stress to accelerate muscle building without burnout.",
    content: `
Building muscular size (hypertrophy) and maximizing neurological force production (raw strength) require distinct mechanical stimulus protocols.

### 1. Mechanical Tension & Compound Loading
Heavy compound barbell movements in the 80–90% 1RM range recruit high-threshold motor units. Rest periods between 3 to 5 minutes ensure full ATP-CP resynthesis.

### 2. Metabolic Stress & Volume Hypertrophy
Hypertrophy thrives in the 6–12 rep range with controlled eccentric tempos (3-0-1-0) and rest windows capped at 60–90 seconds. This traps blood within the working muscle tissue, triggering local growth factor cascades.

### 3. Combining Both Protocols
To build a dense, athletic physique, start your training session with heavy compound strength work (3–5 sets of 3–5 reps), followed by targeted accessory work in higher rep brackets.
    `,
    category: "Training",
    author: {
      name: "Marcus Vance",
      role: "Head Strength Coach",
      avatar:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "August 1, 2026",
    readTimeMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "b2",
    slug: "infrared-sauna-cold-plunge-recovery-science",
    title: "Contrast Therapy: Why Pairing Infrared Sauna with Cold Plunges Doubles Recovery",
    excerpt:
      "Discover how thermal vasodilation and sudden cold shock flush lactate, lower systemic inflammation, and boost mental resilience.",
    content: `
Contrast water and thermal therapy is the secret weapon used by elite Olympic athletes to recover faster between training sessions.

### 1. Thermal Vasodilation
Exposure to 170°F infrared heat causes systemic blood vessels to dilate, driving nutrient-dense oxygenated blood deep into micro-torn muscular fibers.

### 2. Cold Shock & Vasoconstriction
Immediate exposure to a 45°F cold plunge triggers rapid vasoconstriction, squeezing out cellular waste and metabolic byproducts like lactic acid.

### 3. Protocol Recommendation
Spend 15 minutes in the sauna followed immediately by 2–3 minutes in the cold plunge. Repeat 3 cycles for optimal neuro-endocrine reset.
    `,
    category: "Recovery",
    author: {
      name: "Sophia Lin",
      role: "Mobility Specialist",
      avatar:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "July 24, 2026",
    readTimeMinutes: 5,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "b3",
    slug: "macronutrient-timing-for-high-intensity-hiit",
    title: "Pre- & Post-Workout Nutrition: Fueling High-Intensity Metcon Sessions",
    excerpt:
      "How to time your complex carbohydrates, leucine-rich proteins, and electrolytes to prevent muscle breakdown during HIIT.",
    content: `
Training hard without proper carbohydrate glycogen stores leads to cortisol spikes and premature fatigue during high-intensity intervals.

### 1. 2 Hours Pre-Workout
Consume 30-40g of slow-digesting carbohydrates (oatmeal, rice cakes, sweet potato) paired with 25g of lean protein.

### 2. Intra-Workout Hydration
Incorporate sodium (500mg) and potassium-rich electrolytes into your water to maintain cellular hydration and prevent cramps.

### 3. The Anabolic Post-Workout Window
Within 45 minutes after your workout, ingest 30-40g of fast-absorbing whey isolate protein and simple carbs to immediately replenish depleted muscle glycogen stores.
    `,
    category: "Nutrition",
    author: {
      name: "Elena Rostova",
      role: "HIIT Specialist",
      avatar:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "July 15, 2026",
    readTimeMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
];
