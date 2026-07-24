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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashmaheshwari.is-a.dev",
  location: "INDIA / Open to Remote",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "AI/ML Engineer building agentic AI systems, backend infrastructure, and production-ready RAG workflows.",
  summary:
    "I build agentic AI systems that plan, reason, and execute reliably in real workflows. My focus is AI infrastructure: scalable backend services, orchestration pipelines, and production-ready RAG systems built for speed, reliability, and growth.",
  avatarUrl: "/profile-pic-new.jpg",
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
      title: "Software Engineer Intern",
      logoUrl: "/ordyle image.jpg",
      start: "Jan 2026",
      end:"Apr 2026",
      description:
        "Built backend systems for an AI-powered cloud IDE focused on speed and developer productivity. • Integrated intelligent code completion, contextual suggestions, and semantic retrieval with RAG pipelines. • Architected asynchronous services for indexing, code analysis, and low-latency query handling with FastAPI and PostgreSQL. • Implemented distributed workflow execution with checkpointing and WebSocket streaming for real-time collaboration. • Improved backend reliability and throughput by 30% through async optimization and modular service design.",
    },
    {
      company: "devx AI labs",
      href: "#",
      badges: [],
      location: "",
      title: "AI/ML Intern",
      logoUrl: "/devx.jpg",
      start: "Dec 2025",
      end: "Jan 2026",
      description:
        "Built a production-ready demand forecasting engine connecting ML models with scalable backend APIs. • Engineered a hybrid forecasting approach (time-series plus heuristic modeling) for D2C inventory planning. • Improved forecast accuracy by around 70% with better feature design and model calibration. • Implemented probabilistic inference (P10/P50/P90) for safer inventory decisions under uncertainty. • Deployed FastAPI inference endpoints for real-time predictions with sub-100ms latency.",
    },
    {
      company: "Traceroot AI",
      href: "https://github.com/traceroot-ai/traceroot/pull/1152",
      badges: [],
      location: "Remote",
      title: "Open Source Contributor",
      logoUrl: "/traceroot-ai.png",
      start: "2026",
      end: "2026",
      description:
        "Merged PR #1152 to traceroot-ai/traceroot, shipping a version badge feature. • Reviewed and approved by project maintainers before merge.",
    },
    {
      company: "TracerCloud",
      href: "https://github.com/Tracer-Cloud/opensre/pull/2761",
      badges: [],
      location: "Remote",
      title: "Open Source Contributor",
      logoUrl: "/tracercloud.png",
      start: "2026",
      end: "2026",
      description:
        "Merged PR #2761 to Tracer-Cloud/opensre, adding types-PyYAML stubs to dev dependencies. • Removed type: ignore[import-untyped] suppressions from YAML imports. • Enabled full mypy type-checking of PyYAML usage with no runtime changes.",
    },
    {
      company: "AgentWrapper",
      href: "https://github.com/AgentWrapper/agent-orchestrator/commits/main/",
      badges: [],
      location: "Remote",
      title: "Open Source Contributor",
      logoUrl: "/agentwrapper.svg",
      start: "2026",
      end: "2026",
      description:
        "Reviewer Binary Preflight Check (#2092, #2767) • Added a preflight validation step in the review trigger that checks the reviewer binary is on PATH before creating review runs. • Built a ReviewerPreflighter interface supporting Codex and Claude Code adapters. • Prevents silent failed/0-findings outcomes when the binary is missing. Prompt Byte Metrics (#2839) • Surfaced assembled prompt and system prompt byte lengths during agent spawn. • Threaded promptBytes and systemPromptBytes through the spawn response and CLI output. • Regenerated the OpenAPI spec and added test coverage for the new metrics.",
    },
  ],
  education: [
    {
      school: "Manipal University Jaipur",
      href: "https://jaipur.manipal.edu",
      degree: "Bachelor of Technology (B.Tech), Computer Science",
      logoUrl: "/muj.jpg",
      start: "Aug 2023",
      end: "Aug 2027",
    },
    {
      school: "Narayana Institute",
      href: "https://www.narayanagroup.com",
      degree: "Class 12 – Integrated PCM",
      logoUrl: "/narayana.jpg",
      start: "Apr 2021",
      end: "Jun 2023",
    },
    {
      school: "Maheshwari Vidhya Peeth",
      href: "",
      degree: "Class 10",
      logoUrl: "/mvp.jpg",
      start: "Apr 2010",
      end: "Apr 2021",
    },
  ] as Array<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>,
  projects: [
    {
      title: "JASPER FINANCE",
      href: "https://github.com/ApexYash11/jasper",
      dates: "",
      active: false,
      description:
        "Autonomous financial research agent built on LangGraph — orchestrates multi-step web research, synthesis, and report generation.",
      technologies: ["Python", "LangChain", "LangGraph", "OpenAI", "yfinance", "Agentic AI"],
      video: "/jasper-demo.mp4",
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/jasper",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/case-study/jasper",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "/jasper.png",
      mediaAspectRatio: "17 / 8",
    },
    {
      title: "STOCKIQ",
      href: "https://github.com/ApexYash11/StockIQ",
      dates: "",
      active: false,
      description:
        "Demand forecasting system using SARIMAX — converts raw inventory and order data into reorder recommendations and multi-warehouse decisions.",
      technologies: ["Python", "Pandas", "NumPy", "Statsmodels", "FastAPI", "Streamlit"],
      video: "/stock-iq.mp4",
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/StockIQ",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/case-study/stockiq",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "/stock_IQ.png",
      mediaAspectRatio: "16 / 9",
    },
    {
      title: "CLAIMWISE",
      href: "https://github.com/ApexYash11/Claimwise",
      dates: "",
      active: false,
      description:
        "Insurance claim automation platform using NLP and computer vision — cuts manual verification time by 80%.",
      technologies: ["Python", "FastAPI", "TensorFlow", "React", "AWS"],
      video: undefined,
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/Claimwise",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/case-study/claimwise",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "",
      mediaAspectRatio: "16 / 9",
    },
    {
      title: "WEALTHIFY",
      href: "https://github.com/ApexYash11/Wealthify",
      dates: "",
      active: false,
      description:
        "Personal finance app with ML-powered transaction categorization, spending insights, and bank integration.",
      technologies: ["Next.js", "FastAPI", "Supabase"],
      video: undefined,
      links: [
        {
          type: "Source",
          href: "https://github.com/ApexYash11/Wealthify",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Case Study",
          href: "/case-study/wealthify",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "/wealthify.png",
      mediaAspectRatio: "16 / 9",
    },
  ],
  hackathons: [],
} as const;
