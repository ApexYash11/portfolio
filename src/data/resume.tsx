import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { SiDocker, SiFastapi, SiGithub, SiGit, SiLangchain, SiLanggraph, SiNumpy, SiPandas, SiScikitlearn, SiSupabase, SiTensorflow } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaProjectDiagram } from "react-icons/fa";
import { FaBrain, FaChartBar, FaChartLine, FaComments, FaFlag, FaLanguage, FaPuzzlePiece, FaUsers } from "react-icons/fa6";

export const DATA = {
  name: "Yash Maheshwari",
  initials: "YM",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "INDIA / Open to Remote",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "AI/ML Engineer building agentic AI systems, backend infrastructure, and production-ready RAG workflows.",
  summary:
    "I build agentic AI systems that plan, reason, and execute reliably in real workflows. My focus is AI infrastructure: scalable backend services, orchestration pipelines, and production-ready RAG systems built for speed, reliability, and growth.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Python", icon: Python, color: "#3776AB" },
    { name: "Java", icon: Java, color: "#F89820" },
    { name: "C", icon: Csharp, color: "#A179DC" },
    { name: "SQL", icon: Postgresql, color: "#336791" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
    { name: "VS Code", icon: VscVscode, color: "#007ACC" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Pandas", icon: SiPandas, color: "#150458" },
    { name: "NumPy", icon: SiNumpy, color: "#4D77CF" },
    { name: "RAG", icon: FaProjectDiagram, color: "#F97373" },
    { name: "LLMs", icon: FaBrain, color: "#A78BFA" },
    { name: "NLP", icon: FaLanguage, color: "#5EEAD4" },
    { name: "Matplotlib", icon: FaChartLine, color: "#11557C" },
    { name: "LangChain", icon: SiLangchain, color: "#1C3C5A" },
    { name: "LangGraph", icon: SiLanggraph, color: "#F59E0B" },
    { name: "MCP", icon: FaProjectDiagram, color: "#38BDF8" },
    { name: "Leadership", icon: FaFlag, color: "#FB7185" },
    { name: "Collaboration", icon: FaUsers, color: "#60A5FA" },
    { name: "Communication", icon: FaComments, color: "#FDE68A" },
    { name: "Problem Solving", icon: FaPuzzlePiece, color: "#2DD4BF" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "yashmaheshwari8983@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ApexYash11",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yash-maheshwari-3b891a307",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/YashMah11",
        icon: Icons.x,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/yash_maheshwari_11",
        icon: Icons.globe,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:yashmaheshwari8983@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Orydle",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Backend Engineer (Intern)",
      logoUrl: "/ordyle image.jpg",
      start: "Jan 2026",
      description:
        "Building a next-generation AI-powered cloud IDE, focusing on high-performance backend systems and intelligent code assistance. • Building an AI-powered cloud IDE by integrating intelligent code completion, contextual suggestions, and semantic search using RAG and vector indexing. • Architected async backend systems for real-time code analysis, indexing, and retrieval using FastAPI and PostgreSQL. • Implemented distributed workflow execution with checkpointing and WebSocket streaming for enhanced collaboration. • Improved backend reliability and throughput by 30% through optimized async design patterns and modular architecture.",
    },
    {
      company: "devx AI labs",
      href: "#",
      badges: [],
      location: "",
      title: "AI/ML Intern",
      logoUrl: "",
      start: "Dec 2025",
      end: "Jan 2026",
      description:
        "Spearheaded the development of a demand forecasting engine, bridging the gap between theoretical ML models and production-grade backend logic. • Engineered a hybrid forecasting system (Time-Series + Heuristic) for D2C inventory, boosting accuracy by ~70%. • Implemented probabilistic inference (P10/P50/P90) to handle supply chain uncertainty and safety stock optimization. • Deployed FastAPI inference endpoints, enabling real-time model serving with sub-100ms latency.",
    },
  ],
  education: [],
  projects: [
    {
      title: "CLAIMWISE",
      href: "https://github.com/ApexYash11/Claimwise",
      dates: "",
      active: false,
      description:
        "An end-to-end automated platform for insurance claim processing using advanced NLP and computer vision. Reduces manual verification time by 80% through intelligent document analysis and fraud detection algorithms.",
      technologies: ["Python", "FastAPI", "TensorFlow", "React", "AWS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/Claimwise",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/claimwise.jpeg",
    },
    {
      title: "WEALTHIFY",
      href: "https://github.com/ApexYash11/Wealthify",
      dates: "",
      active: false,
      description:
        "Wealthify is a personal finance management tool that uses machine learning to categorize expenses and provide personalized saving recommendations. It features seamless bank integration and multi-currency support.",
      technologies: ["Node.js", "MongoDB", "React Native", "Plaid API"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/Wealthify",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/wealthify.png",
    },
    {
      title: "JASPER FINANCE",
      href: "https://github.com/ApexYash11/jasper",
      dates: "",
      active: false,
      description:
        "Jasper is an intelligent CLI tool that revolutionizes software development planning. It analyzes your entire codebase, understands project architecture, and generates detailed implementation plans using advanced AI models via OpenRouter. Features include automatic framework detection, security audits (OWASP Top 10), real-time web search integration with Exa AI, and Model Context Protocol (MCP) for accessing up-to-date library documentation.",
      technologies: ["Python", "LangChain", "OpenAI", "yfinance"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/jasper",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/old-site/project-info.html",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "/jasper.png",
    },
    {
      title: "STOCKIQ",
      href: "https://github.com/ApexYash11/StockIQ",
      dates: "",
      active: false,
      description:
        "StockIQ is a production-ready intelligence system that transforms raw operational data (orders, inventory events, vendors, campaigns) into probabilistic demand forecasts, optimized multi-warehouse inventory decisions, and constraint-aware reorder recommendations. The system goes beyond traditional demand forecasting—it converts uncertainty into deterministic, explainable business actions: exactly how much to reorder, where to place inventory, and whether to allow Cash-on-Delivery (COD) based on Return-to-Origin (RTO) risk assessment.",
      technologies: ["Python", "Pandas", "NumPy", "Statsmodels", "FastAPI", "Streamlit"],
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/StockIQ",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/old-site/stockiq-case-study.html",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "/stock_IQ.png",
    },
  ],
  hackathons: [],
} as const;
