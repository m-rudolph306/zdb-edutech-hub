export const BUNDESLAENDER = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
] as const;

export type Bundesland = typeof BUNDESLAENDER[number];

export interface Innovation {
  id: number;
  name: string;
  description: string;
  categories: string[];
  region: Bundesland;
  technology: string;
  event: string;
}

export const innovations: Innovation[] = [
  {
    id: 1,
    name: "EduAI Platform",
    description:
      "An intelligent AI-powered learning platform that adapts to individual student needs, providing personalized learning paths and real-time feedback. Revolutionizing how educators track and support student progress.",
    categories: ["AI", "Assessment"],
    region: "Bayern",
    technology: "Software",
    event: "Magdeburg 2025",
  },
  {
    id: 2,
    name: "VR Learning Lab",
    description:
      "Immersive virtual reality environments for hands-on learning experiences in science, history, and engineering. Enables students to explore complex concepts in 3D space with interactive simulations.",
    categories: ["VR", "Content Creation"],
    region: "Thüringen",
    technology: "Hardware",
    event: "Erfurt 2025",
  },
  {
    id: 3,
    name: "TeacherTools Pro",
    description:
      "Comprehensive classroom management software with automated grading, attendance tracking, and parent communication features. Streamlines administrative tasks to give teachers more time for teaching.",
    categories: ["Management", "Assessment"],
    region: "Sachsen-Anhalt",
    technology: "Platform",
    event: "Magdeburg 2025",
  },
  {
    id: 4,
    name: "CodeCamp Junior",
    description:
      "Gamified coding education platform designed for children aged 8-14, teaching programming fundamentals through interactive storytelling and visual block-based coding.",
    categories: ["Content Creation", "AI"],
    region: "Berlin",
    technology: "Software",
    event: "Berlin 2025",
  },
  {
    id: 5,
    name: "SmartBoard Connect",
    description:
      "Next-generation interactive whiteboard technology with cloud synchronization, collaborative tools, and seamless integration with popular learning management systems.",
    categories: ["Hardware", "Management"],
    region: "Nordrhein-Westfalen",
    technology: "Hardware",
    event: "Erfurt 2025",
  },
  {
    id: 6,
    name: "Assessment Analytics",
    description:
      "Advanced data analytics platform that transforms test results and student performance data into actionable insights, helping educators identify learning gaps and optimize curriculum.",
    categories: ["Assessment", "AI"],
    region: "Baden-Württemberg",
    technology: "Platform",
    event: "Magdeburg 2025",
  },
  {
    id: 7,
    name: "LanguageBridge AI",
    description:
      "Multilingual learning assistant that provides real-time translation and language support for international classrooms. Breaks down language barriers and enables inclusive education for diverse student populations.",
    categories: ["AI", "Content Creation"],
    region: "Hamburg",
    technology: "Software",
    event: "Berlin 2025",
  },
  {
    id: 8,
    name: "ClassroomVR Explorer",
    description:
      "Virtual field trips platform offering immersive experiences to historical sites, museums, and natural wonders worldwide. Students can explore ancient civilizations and distant planets without leaving the classroom.",
    categories: ["VR", "Content Creation"],
    region: "Hessen",
    technology: "Hardware",
    event: "Erfurt 2025",
  },
  {
    id: 9,
    name: "StudyFlow Manager",
    description:
      "Intelligent scheduling and productivity tool designed specifically for students and teachers. Optimizes study time, tracks assignments, and provides smart reminders to improve academic performance.",
    categories: ["Management", "AI"],
    region: "Niedersachsen",
    technology: "Platform",
    event: "Magdeburg 2025",
  },
  {
    id: 10,
    name: "QuizMaster Pro",
    description:
      "Interactive assessment creation tool with automatic question generation, peer review features, and instant feedback mechanisms. Supports multiple question types and adaptive difficulty levels.",
    categories: ["Assessment", "Content Creation"],
    region: "Sachsen",
    technology: "Software",
    event: "Berlin 2025",
  },
  {
    id: 11,
    name: "RoboTeach Assistant",
    description:
      "Physical classroom robot that assists teachers with demonstrations, student engagement activities, and personalized tutoring. Equipped with AI to answer student questions and provide supplementary explanations.",
    categories: ["Hardware", "AI"],
    region: "Brandenburg",
    technology: "Hardware",
    event: "Magdeburg 2025",
  },
  {
    id: 12,
    name: "CollabSpace Platform",
    description:
      "Digital collaboration workspace designed for group projects and peer learning. Features real-time editing, video conferencing, resource sharing, and integrated project management tools for student teams.",
    categories: ["Management", "Content Creation"],
    region: "Schleswig-Holstein",
    technology: "Platform",
    event: "Erfurt 2025",
  },
];
