export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPriceMonthlyEquivalent: number; // e.g., $49/mo billed annually
  popular?: boolean;
  features: {
    included: boolean;
    text: string;
  }[];
  ctaText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "standard-pass",
    name: "STANDARD ACCESS",
    badge: "STARTER",
    description: "Ideal for self-directed fitness enthusiasts wanting world-class machinery.",
    monthlyPrice: 49,
    annualPriceMonthlyEquivalent: 39,
    popular: false,
    ctaText: "Join Standard Pass",
    features: [
      { included: true, text: "Unlimited 24/7 Gym Floor Access" },
      { included: true, text: "Full Hammer Strength & Free Weight Suite" },
      { included: true, text: "Locker Room & Luxury Showers Access" },
      { included: true, text: "1 InBody 770 Composition Scan / Mo" },
      { included: false, text: "Group Fitness Classes Included" },
      { included: false, text: "Cryo & Sauna Recovery Suite" },
      { included: false, text: "Dedicated Personal Trainer Coach" },
    ],
  },
  {
    id: "vip-all-access",
    name: "VIP ALL-ACCESS",
    badge: "MOST POPULAR",
    description: "Complete access to all group classes, recovery lounge, and digital app tracking.",
    monthlyPrice: 89,
    annualPriceMonthlyEquivalent: 69,
    popular: true,
    ctaText: "Claim VIP Membership",
    features: [
      { included: true, text: "Unlimited 24/7 Gym Floor Access" },
      { included: true, text: "Full Hammer Strength & Free Weight Suite" },
      { included: true, text: "Locker Room & Luxury Showers Access" },
      { included: true, text: "Unlimited 50+ Weekly Group Classes" },
      { included: true, text: "Infrared Sauna & Cold Plunge Suite" },
      { included: true, text: "Monthly InBody Scans & Nutrition Guide" },
      { included: true, text: "Free Guest Pass (2 Per Month)" },
      { included: false, text: "Dedicated 1-on-1 Personal Coaching" },
    ],
  },
  {
    id: "elite-performance",
    name: "ELITE PERFORMANCE",
    badge: "MAXIMUM RESULTS",
    description: "VIP All-Access combined with private coaching sessions and tailored macro coaching.",
    monthlyPrice: 169,
    annualPriceMonthlyEquivalent: 139,
    popular: false,
    ctaText: "Apply For Elite Plan",
    features: [
      { included: true, text: "Everything in VIP All-Access Plan" },
      { included: true, text: "4x 1-on-1 Personal Training Sessions / Mo" },
      { included: true, text: "Personalized Custom Nutrition & Macro Plan" },
      { included: true, text: "Priority Class & Recovery Slot Booking" },
      { included: true, text: "Unlimited Guest Passes (Always Bring a Friend)" },
      { included: true, text: "Vortex Athletics Gear & Supplement Welcome Pack" },
      { included: true, text: "24/7 Direct WhatsApp Coach Support" },
    ],
  },
];
