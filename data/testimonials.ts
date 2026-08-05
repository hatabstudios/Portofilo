export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  transformation?: {
    weeks: number;
    weightChange: string;
    bodyFatChange: string;
  };
}

export const testimonialsData: Testimonial[] = [
  {
    id: "alex-carter",
    name: "Alexander Carter",
    role: "Tech Founder & Marathon Runner",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    content:
      "VORTEX completely elevated my standard for what a fitness facility should be. The coaches understand biomechanics at an elite level, and the recovery sauna suite has doubled my workout recovery rate.",
    transformation: {
      weeks: 16,
      weightChange: "-22 lbs",
      bodyFatChange: "21% → 11%",
    },
  },
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Orthopedic Surgeon",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    content:
      "As a physician, form and safety are non-negotiable. Coach Marcus and the team maintain spotless platforms, top-tier Hammer Strength equipment, and flawless lifting mechanics guidance.",
    transformation: {
      weeks: 12,
      weightChange: "+8 lbs muscle",
      bodyFatChange: "Maintained lean",
    },
  },
  {
    id: "david-miller",
    name: "David Miller",
    role: "Architect & Boxing Member",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    content:
      "The heavy bag boxing classes with Tariq are unreal. The energy inside the club when the lights dim and the bass drops makes you want to smash every goal you ever set.",
    transformation: {
      weeks: 24,
      weightChange: "-35 lbs",
      bodyFatChange: "26% → 14%",
    },
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    role: "Corporate Executive",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    content:
      "24/7 keycard access allows me to fit 6:00 AM workouts into my hectic schedule seamlessly. The community here is driven, respectful, and incredibly supportive.",
  },
];
