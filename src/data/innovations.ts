export interface Innovation {
  id: number;
  name: string;
  description: string;
  categories: string[];
  region: "National" | "International";
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
    region: "International",
    technology: "Software",
    event: "Magdeburg 2025",
  },
  {
    id: 2,
    name: "VR Learning Lab",
    description:
      "Immersive virtual reality environments for hands-on learning experiences in science, history, and engineering. Enables students to explore complex concepts in 3D space with interactive simulations.",
    categories: ["VR", "Content Creation"],
    region: "National",
    technology: "Hardware",
    event: "Erfurt 2025",
  },
  {
    id: 3,
    name: "TeacherTools Pro",
    description:
      "Comprehensive classroom management software with automated grading, attendance tracking, and parent communication features. Streamlines administrative tasks to give teachers more time for teaching.",
    categories: ["Management", "Assessment"],
    region: "National",
    technology: "Platform",
    event: "Magdeburg 2025",
  },
  {
    id: 4,
    name: "CodeCamp Junior",
    description:
      "Gamified coding education platform designed for children aged 8-14, teaching programming fundamentals through interactive storytelling and visual block-based coding.",
    categories: ["Content Creation", "AI"],
    region: "International",
    technology: "Software",
    event: "Berlin 2025",
  },
  {
    id: 5,
    name: "SmartBoard Connect",
    description:
      "Next-generation interactive whiteboard technology with cloud synchronization, collaborative tools, and seamless integration with popular learning management systems.",
    categories: ["Hardware", "Management"],
    region: "International",
    technology: "Hardware",
    event: "Erfurt 2025",
  },
  {
    id: 6,
    name: "Assessment Analytics",
    description:
      "Advanced data analytics platform that transforms test results and student performance data into actionable insights, helping educators identify learning gaps and optimize curriculum.",
    categories: ["Assessment", "AI"],
    region: "National",
    technology: "Platform",
    event: "Magdeburg 2025",
  },
];
