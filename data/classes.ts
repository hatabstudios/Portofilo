export interface GymClass {
  id: string;
  slug: string;
  title: string;
  category: "Strength" | "HIIT" | "Cardio" | "Yoga & Mobility" | "Boxing & Combat";
  description: string;
  fullDescription: string;
  image: string;
  durationMinutes: number;
  caloriesBurned: string;
  intensity: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  scheduleInfo: string;
  instructorName: string;
  benefits: string[];
  equipmentNeeded: string[];
}

export const classesData: GymClass[] = [
  {
    id: "power-lifting",
    slug: "power-lifting-strength",
    title: "Powerlifting & Barbell Mechanics",
    category: "Strength",
    description:
      "Master the squat, bench press, and deadlift with technical precision and structured progressive overload.",
    fullDescription:
      "Engineered for athletes looking to build brute strength and power. This class focuses on compound movement mechanics, bar speed, mobility prep, and periodized lifting protocols under expert eye instruction.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 60,
    caloriesBurned: "500 - 700 kcal",
    intensity: "Intermediate",
    scheduleInfo: "Mon, Wed, Fri • 7:00 AM & 6:00 PM",
    instructorName: "Marcus Vance",
    benefits: [
      "Increases raw maximal strength",
      "Improves bone density & posture",
      "Teaches safest compound lifting techniques",
      "Monitored video analysis feedback",
    ],
    equipmentNeeded: ["Lifting Shoes", "Wrist Wraps (Optional)", "Water Bottle"],
  },
  {
    id: "vortex-hiit",
    slug: "vortex-hiit-shred",
    title: "Vortex HIIT & Metcon Shred",
    category: "HIIT",
    description:
      "High-energy metabolic conditioning combining kettlebells, air bikes, plyometrics, and battle ropes.",
    fullDescription:
      "Push your anaerobic threshold with rapid work-to-rest interval cycles. Designed to maximize post-exercise oxygen consumption (EPOC), keeping your metabolism firing for up to 36 hours post-workout.",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 45,
    caloriesBurned: "650 - 900 kcal",
    intensity: "All Levels",
    scheduleInfo: "Daily • 6:30 AM, 12:00 PM, 5:30 PM",
    instructorName: "Elena Rostova",
    benefits: [
      "Burns maximum body fat efficiently",
      "Boosts VO2 Max & cardiovascular stamina",
      "Builds athletic conditioning and lean muscle",
      "Motivating club-light soundtrack environment",
    ],
    equipmentNeeded: ["Cross-Trainers", "Sweat Towel"],
  },
  {
    id: "combat-boxing",
    slug: "boxing-strike-conditioning",
    title: "Heavy Bag Boxing & Tactical Strike",
    category: "Boxing & Combat",
    description:
      "Authentic boxing combinations, footwork drills, and heavy bag conditioning for full-body power.",
    fullDescription:
      "Unleash stress while mastering authentic boxing fundamentals. You'll execute 10 intense rounds of heavy bag work, speed bag drills, medicine ball core work, and defensive footwork.",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 50,
    caloriesBurned: "700 - 850 kcal",
    intensity: "All Levels",
    scheduleInfo: "Tue, Thu, Sat • 8:00 AM & 7:00 PM",
    instructorName: "Tariq Lawson",
    benefits: [
      "Enhances hand-eye coordination & reflexes",
      "Sculpts shoulders, core, and legs",
      "Exceptional mental focus & stress relief",
      "Combines self-defense with cardiovascular workout",
    ],
    equipmentNeeded: ["Boxing Hand Wraps", "14oz or 16oz Gloves"],
  },
  {
    id: "zenith-yoga",
    slug: "vinyasa-power-yoga",
    title: "Infrared Power Vinyasa Yoga",
    category: "Yoga & Mobility",
    description:
      "Dynamic flow postures conducted in a warm infrared heated studio to deepen flexibility and detoxify.",
    fullDescription:
      "Harmonize strength with flexibility. Heated to an optimal 88°F using infrared warmth, this dynamic flow unleashes joint tension, improves core stability, and clears mental clutter.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 60,
    caloriesBurned: "350 - 500 kcal",
    intensity: "All Levels",
    scheduleInfo: "Tue, Thu, Sun • 7:30 AM & 6:30 PM",
    instructorName: "Sophia Lin",
    benefits: [
      "Increases hamstring and hip flexibility",
      "Prevents lifting injuries & improves joint mobility",
      "Promotes deep parasympathetic nervous system recovery",
      "Strengthens deep stabilizing muscle groups",
    ],
    equipmentNeeded: ["Yoga Mat", "Yoga Towel"],
  },
  {
    id: "olympic-weightlifting",
    slug: "olympic-snatch-clean",
    title: "Olympic Snatch & Clean Studio",
    category: "Strength",
    description:
      "Technical coaching for explosive snatch and clean & jerk mechanics on wooden weightlifting platforms.",
    fullDescription:
      "Precision coaching on bumper plates and Eleiko barbells. Break down triple extension, foot positioning, and turnover mechanics with step-by-step video playback assistance.",
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 75,
    caloriesBurned: "550 - 750 kcal",
    intensity: "Advanced",
    scheduleInfo: "Mon, Fri • 5:00 PM",
    instructorName: "Marcus Vance",
    benefits: [
      "Builds explosive athleticism & vertical leap",
      "Refines rate of force development (RFD)",
      "High core & posterior chain recruitment",
    ],
    equipmentNeeded: ["Lifters Shoes", "Chalk Provided"],
  },
  {
    id: "hybrid-cardio",
    slug: "endurance-spin-row",
    title: "Endurance Spin & Ergometer Hybrid",
    category: "Cardio",
    description:
      "Rhythm-driven indoor cycling combined with Concept2 rowing sprints for ultimate aerobic endurance.",
    fullDescription:
      "Ride the pulse. A high-wattage indoor cycling experience that transitions into row ergometer interval challenges. Immersive lighting and custom sound design keep your heart pumping.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    durationMinutes: 45,
    caloriesBurned: "600 - 800 kcal",
    intensity: "Intermediate",
    scheduleInfo: "Daily • 6:00 AM & 6:00 PM",
    instructorName: "Elena Rostova",
    benefits: [
      "Low impact on knees and ankles",
      "Maximum calorie burn rate per minute",
      "Improves lung capacity and lactate threshold",
    ],
    equipmentNeeded: ["SPD Cycling Shoes or Sneakers"],
  },
];
