export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  certifications: string[];
  experienceYears: number;
  bio: string;
  quote: string;
  image: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const trainersData: Trainer[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head Strength & Conditioning Coach",
    specialties: ["Powerlifting", "Olympic Weightlifting", "Hypertrophy"],
    certifications: ["CSCS (NSCA)", "USA Weightlifting Level 2", "Precision Nutrition Level 1"],
    experienceYears: 12,
    bio: "Former collegiate track athlete turned head strength coach. Marcus has coached over 300 competitive athletes and bodybuilders toward personal records and gold medals.",
    quote: "Technique dictates tension. Tension dictates transformation.",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Lead HIIT & Performance Specialist",
    specialties: ["Functional Fitness", "Fat Loss", "Kettlebell Conditioning"],
    certifications: ["NASM Master CPT", "StrongFirst SFG I", "EXOS Performance Specialist"],
    experienceYears: 9,
    bio: "Elena specializes in explosive metabolic conditioning and total-body recomposition. Her high-octane coaching style motivates members to shatter mental barriers.",
    quote: "Comfort is the enemy of progress. Embrace the sweat.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "tariq-lawson",
    name: "Tariq Lawson",
    role: "Boxing & Combat Fitness Director",
    specialties: ["Heavy Bag Boxing", "Core Conditioning", "Agility & Speed"],
    certifications: ["USA Boxing Certified Coach", "ACE Personal Trainer", "Functional Movement Screen (FMS)"],
    experienceYears: 10,
    bio: "Former Golden Gloves finalist with a passion for teaching tactical fight mechanics. Tariq delivers high-tempo boxing workouts that build confidence and steel core strength.",
    quote: "Float in mind, hit hard in execution.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://x.com",
    },
  },
  {
    id: "sophia-lin",
    name: "Sophia Lin",
    role: "Yoga & Mobility Specialist",
    specialties: ["Power Vinyasa", "Postural Realignment", "Recovery Protocols"],
    certifications: ["E-RYT 500 Yoga Alliance", "FRC Mobility Specialist", "Fascial Stretch Therapist"],
    experienceYears: 8,
    bio: "Sophia brings a clinical understanding of human movement to mobility and yoga. She helps heavy lifters and busy professionals unlock tight joints and prevent injury.",
    quote: "Length before strength. Flex into your potential.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
];
