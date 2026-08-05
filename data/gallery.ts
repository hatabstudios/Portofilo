export interface GalleryItem {
  id: string;
  title: string;
  category: "Facilities" | "Equipment" | "Classes" | "Recovery";
  image: string;
  caption: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Hammer Strength Dumbbell Suite",
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop",
    caption: "Heavy dumbbell rack going up to 150 lbs with custom polyurethane coating.",
  },
  {
    id: "g2",
    title: "Olympic Weightlifting Platforms",
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    caption: "Eleiko Swedish steel bars and competition calibrated bumper plates.",
  },
  {
    id: "g3",
    title: "Vortex Metcon Arena",
    category: "Facilities",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    caption: "Custom turf lane, sled tracks, and pull-up rig matrix.",
  },
  {
    id: "g4",
    title: "Infrared Sauna & Plunge Suite",
    category: "Recovery",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    caption: "Full spectrum infrared saunas paired with 45°F cold plunge tubs.",
  },
  {
    id: "g5",
    title: "Heavy Bag Boxing Ring",
    category: "Classes",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    caption: "12 heavy bags mounted on dual shock-absorbing tracks.",
  },
  {
    id: "g6",
    title: "Zenith Yoga & Mobility Studio",
    category: "Classes",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    caption: "Climate-controlled acoustic yoga studio with timber floors.",
  },
  {
    id: "g7",
    title: "Executive Locker Lounge",
    category: "Facilities",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
    caption: "Keycard biometric lockers, rainfall showers, and Dyson grooming stations.",
  },
  {
    id: "g8",
    title: "Cycle & Cardio Arena",
    category: "Classes",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    caption: "High-power spin cycles equipped with real-time wattage leaderboards.",
  },
];
