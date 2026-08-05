export interface ScheduleSlot {
  id: string;
  time: string;
  className: string;
  category: "Strength" | "HIIT" | "Cardio" | "Yoga & Mobility" | "Boxing & Combat";
  instructor: string;
  room: string;
  duration: string;
}

export interface DaySchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  slots: ScheduleSlot[];
}

export const weeklyScheduleData: DaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { id: "m1", time: "06:00 AM", className: "Vortex HIIT & Metcon", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "45m" },
      { id: "m2", time: "07:30 AM", className: "Powerlifting Mechanics", category: "Strength", instructor: "Marcus Vance", room: "Barbell Zone", duration: "60m" },
      { id: "m3", time: "12:00 PM", className: "Heavy Bag Boxing", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Combat Room", duration: "50m" },
      { id: "m4", time: "05:30 PM", className: "Olympic Snatch & Clean", category: "Strength", instructor: "Marcus Vance", room: "Platform 1-4", duration: "75m" },
      { id: "m5", time: "07:00 PM", className: "Infrared Power Vinyasa", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { id: "t1", time: "06:30 AM", className: "Endurance Spin & Erg", category: "Cardio", instructor: "Elena Rostova", room: "Cycle Arena", duration: "45m" },
      { id: "t2", time: "08:00 AM", className: "Infrared Power Vinyasa", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
      { id: "t3", time: "01:00 PM", className: "Core & Mobility Flow", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "45m" },
      { id: "t4", time: "06:00 PM", className: "Heavy Bag Boxing", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Combat Room", duration: "50m" },
      { id: "t5", time: "07:30 PM", className: "Vortex HIIT Shred", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "45m" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { id: "w1", time: "06:00 AM", className: "Powerlifting Mechanics", category: "Strength", instructor: "Marcus Vance", room: "Barbell Zone", duration: "60m" },
      { id: "w2", time: "07:30 AM", className: "Vortex HIIT & Metcon", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "45m" },
      { id: "w3", time: "12:30 PM", className: "Endurance Spin & Erg", category: "Cardio", instructor: "Elena Rostova", room: "Cycle Arena", duration: "45m" },
      { id: "w4", time: "05:30 PM", className: "Tactical Boxing Drills", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Combat Room", duration: "60m" },
      { id: "w5", time: "07:00 PM", className: "Restorative Yoga & Sound", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { id: "th1", time: "06:30 AM", className: "Heavy Bag Boxing", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Combat Room", duration: "50m" },
      { id: "th2", time: "08:00 AM", className: "Infrared Power Vinyasa", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
      { id: "th3", time: "01:00 PM", className: "Vortex HIIT Express", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "30m" },
      { id: "th4", time: "06:00 PM", className: "Powerlifting Mechanics", category: "Strength", instructor: "Marcus Vance", room: "Barbell Zone", duration: "60m" },
      { id: "th5", time: "07:15 PM", className: "Endurance Spin & Erg", category: "Cardio", instructor: "Elena Rostova", room: "Cycle Arena", duration: "45m" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { id: "f1", time: "06:00 AM", className: "Vortex HIIT & Metcon", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "45m" },
      { id: "f2", time: "07:30 AM", className: "Olympic Snatch & Clean", category: "Strength", instructor: "Marcus Vance", room: "Platform 1-4", duration: "75m" },
      { id: "f3", time: "12:00 PM", className: "Endurance Spin & Erg", category: "Cardio", instructor: "Elena Rostova", room: "Cycle Arena", duration: "45m" },
      { id: "f4", time: "05:00 PM", className: "Friday Night Heavy Bag Boxing", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Combat Room", duration: "60m" },
      { id: "f5", time: "06:30 PM", className: "Candlelight Yoga Flow", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
    ],
  },
  {
    day: "Saturday",
    slots: [
      { id: "sa1", time: "08:00 AM", className: "Weekend Warrior HIIT", category: "HIIT", instructor: "Elena Rostova", room: "Main Gym Floor", duration: "60m" },
      { id: "sa2", time: "09:30 AM", className: "Barbell Club Open Session", category: "Strength", instructor: "Marcus Vance", room: "Barbell Zone", duration: "90m" },
      { id: "sa3", time: "11:00 AM", className: "Boxing Sparring & Pads", category: "Boxing & Combat", instructor: "Tariq Lawson", room: "Ring Arena", duration: "60m" },
      { id: "sa4", time: "01:00 PM", className: "Recovery & Flexibility Lab", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "45m" },
    ],
  },
  {
    day: "Sunday",
    slots: [
      { id: "su1", time: "09:00 AM", className: "Sunday Detox Vinyasa", category: "Yoga & Mobility", instructor: "Sophia Lin", room: "Zenith Studio", duration: "60m" },
      { id: "su2", time: "10:30 AM", className: "Full Body Metcon Circuit", category: "HIIT", instructor: "Elena Rostova", room: "Studio A", duration: "60m" },
      { id: "su3", time: "12:00 PM", className: "Cardio Cycling Marathon", category: "Cardio", instructor: "Elena Rostova", room: "Cycle Arena", duration: "60m" },
    ],
  },
];
