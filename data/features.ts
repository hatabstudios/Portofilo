export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name string tag
  highlight?: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: "machinery",
    title: "State-of-the-Art Machinery",
    description:
      "Precision-engineered Hammer Strength and Eleiko equipment imported directly from Sweden for peak biomechanics.",
    icon: "Dumbbell",
    highlight: "Top-Tier Gear",
  },
  {
    id: "trainers",
    title: "Elite Master Trainers",
    description:
      "Work 1-on-1 with IFBB pros and NSCA CSCS certified performance specialists to craft your bespoke routine.",
    icon: "Award",
    highlight: "1-on-1 Coaching",
  },
  {
    id: "schedule",
    title: "50+ Weekly Group Classes",
    description:
      "From high-intensity HIIT and Olympic Weightlifting to Reformer Pilates and restorative Vinyasa Flow.",
    icon: "Calendar",
    highlight: "Flexible Times",
  },
  {
    id: "recovery",
    title: "Cryo & Sauna Recovery Suite",
    description:
      "Accelerate muscle repair with infrared saunas, cold plunge tubs, and Theragun percussion therapy.",
    icon: "Flame",
    highlight: "Luxury Amenities",
  },
  {
    id: "nutrition",
    title: "Customized Nutrition Coaching",
    description:
      "InBody 770 composition scans paired with personalized macro targets and meal planning guides.",
    icon: "Utensils",
    highlight: "Data Driven",
  },
  {
    id: "access",
    title: "24/7 Keycard Member Access",
    description:
      "Train on your schedule with round-the-clock secure digital access, biometric entry, and private lockers.",
    icon: "Key",
    highlight: "Always Open",
  },
];

export const whyChooseUsStats = [
  { label: "Success Rate", value: "98.5%", note: "Members achieve their goal within 90 days" },
  { label: "Certified Staff", value: "100%", note: "NSCA, NASM & ACE accredited coaches" },
  { label: "Cleanliness Rating", value: "5/5", note: "Continuous sanitation cycles every hour" },
  { label: "Community", value: "2,500+", note: "Active supportive athletic members" },
];
