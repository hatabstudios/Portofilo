export interface FaqItem {
  id: string;
  category: "Membership" | "Facilities" | "Classes & Coaching" | "Guest & Trial";
  question: string;
  answer: string;
}

export const faqsData: FaqItem[] = [
  {
    id: "f1",
    category: "Membership",
    question: "Are there long-term contracts or cancellation fees?",
    answer:
      "No. All memberships operate on a transparent month-to-month commitment unless you select our discounted Annual Prepaid tier. You can pause or cancel anytime with 14 days notice.",
  },
  {
    id: "f2",
    category: "Membership",
    question: "What is included in the Free 7-Day Trial Pass?",
    answer:
      "Your 7-day trial grants full access to our gym floor, weightlifting platforms, locker amenities, and 2 complimentary group fitness classes of your choice.",
  },
  {
    id: "f3",
    category: "Facilities",
    question: "How does 24/7 keycard access work?",
    answer:
      "Upon joining, your mobile app generate a secure encrypted NFC keycard. Scan your phone at our biometric entry turnstiles anytime 24 hours a day, 365 days a year.",
  },
  {
    id: "f4",
    category: "Classes & Coaching",
    question: "Do I need to book group classes in advance?",
    answer:
      "We recommend booking through our member portal up to 7 days in advance as popular classes (like Friday Night Heavy Bag Boxing) cap at 20 participants for quality control.",
  },
  {
    id: "f5",
    category: "Facilities",
    question: "Is personal training included in standard memberships?",
    answer:
      "All new members receive a complimentary 60-minute InBody composition assessment and baseline orientation with a Master Trainer. Elite plans include ongoing weekly 1-on-1 coaching.",
  },
  {
    id: "f6",
    category: "Guest & Trial",
    question: "Can I bring guests with my membership?",
    answer:
      "VIP members receive 2 complimentary guest passes per month. Elite Performance members enjoy unlimited guest privileges.",
  },
];
