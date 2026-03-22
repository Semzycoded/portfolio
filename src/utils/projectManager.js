// Project Manager - Store and retrieve editable projects

import foodWebsiteImage from "../assets/images/food-website.png";
import solvexAppImage from "../assets/images/solvex-app.png";

const PLACEHOLDER_URLS = {
  food: "https://via.placeholder.com/300x200?text=Food+Recipe",
  solvex: "https://via.placeholder.com/300x200?text=Solvex",
};

const normalizeProjectImage = (project) => {
  if (!project) return project;

  const title = (project.title || "").toLowerCase();
  const imageUrl = project.imageUrl || "";

  if (title.includes("food recipe") || imageUrl === PLACEHOLDER_URLS.food) {
    return { ...project, imageUrl: foodWebsiteImage };
  }

  if (title.includes("solvex") || imageUrl === PLACEHOLDER_URLS.solvex) {
    return { ...project, imageUrl: solvexAppImage };
  }

  return project;
};

const DEFAULT_PROJECTS = [
  {
    id: "1",
    title: "CoinPay Mobile App",
    description:
      "CoinPay is a mobile app for seamless, secure cryptocurrency payments and transfers. Manage, send, and receive crypto instantly with an intuitive interface.",
    technologies: ["React", "Bootstrap", "Custom CSS"],
    imageUrl:
      "https://cdn.dribbble.com/userupload/4274903/file/original-1171193ce6dc31fddb0a3c879155978e.jpg?resize=752x",
    githubUrl: "https://github.com/Semzycoded/Coinpay-Mobile-App",
    liveDemoUrl: "https://coinpay-mobile-app.vercel.app/",
  },
  {
    id: "2",
    title: "Food Recipe Website",
    description:
      "A dynamic recipe web application that fetches real-time data from a public API, allowing users to explore and filter meals.",
    technologies: ["React", "Tailwind CSS"],
    imageUrl: foodWebsiteImage,
    githubUrl: "https://github.com/Semzycoded/food-recipe-website",
    liveDemoUrl: "https://food-recipe-website-one.vercel.app",
  },
  {
    id: "3",
    title: "Solvex Website",
    description:
      "A platform that connects students and graduates to get academic advice and guidance for passing courses.",
    technologies: ["React", "Tailwind CSS", "Firebase"],
    imageUrl: solvexAppImage,
    githubUrl: "https://github.com/Semzycoded/solvex1",
    liveDemoUrl: "https://solvex1.vercel.app",
  },
  {
    id: "4",
    title: "Crypto Dashboard",
    description:
      "A modern crypto dashboard built with Next.js (App Router) and TypeScript that displays live cryptocurrency data, interactive price charts, search & filter functionality, and dark mode support. This project demonstrates server-side data fetching, dynamic routing, and clean UI architecture using real-world APIs.",
    technologies: [
      "Next.js 16+ (App Router)",
      "TypeScript",
      "Tailwind CSS 4",
      "Recharts",
      "CoinGecko REST API",
      "React",
    ],
    imageUrl:
      "https://image.thum.io/get/width/1200/https://crypto-dashboard-sigma-one.vercel.app",
    githubUrl: "https://github.com/Semzycoded/crypto-dashboard",
    liveDemoUrl: "https://crypto-dashboard-sigma-one.vercel.app",
  },
];

export const getAllProjects = () => {
  try {
    const stored = localStorage.getItem("portfolioProjects");
    if (!stored) {
      return DEFAULT_PROJECTS;
    }

    const parsedProjects = JSON.parse(stored);
    const normalizedProjects = parsedProjects.map(normalizeProjectImage);

    // Persist once if we repaired any legacy placeholder URLs.
    if (JSON.stringify(parsedProjects) !== JSON.stringify(normalizedProjects)) {
      localStorage.setItem(
        "portfolioProjects",
        JSON.stringify(normalizedProjects),
      );
    }

    return normalizedProjects;
  } catch (err) {
    return DEFAULT_PROJECTS;
  }
};

export const addProject = (project) => {
  try {
    const projects = getAllProjects();
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    projects.push(newProject);
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
    return newProject;
  } catch (err) {
    return null;
  }
};

export const updateProject = (id, updatedProject) => {
  try {
    const projects = getAllProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index > -1) {
      projects[index] = { ...projects[index], ...updatedProject };
      localStorage.setItem("portfolioProjects", JSON.stringify(projects));
      return projects[index];
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const deleteProject = (id) => {
  try {
    const projects = getAllProjects();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem("portfolioProjects", JSON.stringify(filtered));
    return true;
  } catch (err) {
    return false;
  }
};

export const resetProjectsToDefaults = () => {
  try {
    localStorage.removeItem("portfolioProjects");
    return true;
  } catch (err) {
    return false;
  }
};

export const createEmptyProject = () => {
  return {
    title: "",
    description: "",
    technologies: [],
    imageUrl: "",
    githubUrl: "",
    liveDemoUrl: "",
  };
};
