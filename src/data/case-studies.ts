export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface CaseStudy {
  title: string;
  summary: string;
  problem: string;
  techStack: string[];
  features: string[];
  challenges: Challenge[];
  outcome: string;
}

const caseStudies: Record<string, CaseStudy> = {
  gatewise: {
    title: "Gatewise",
    summary:
      "Decision infrastructure for autonomous software engineering — a typed System-1 decision model (Jev) gates every agent action, so every decision is a real, auditable model output instead of a heuristic guess.",
    problem:
      "Coding agents act on untrusted text. Pull request titles, descriptions, and diffs are attacker-controlled, and most automation answers them with keyword rules or a free-form LLM verdict. Both fail the same way: a heuristic fallback is indistinguishable from a real judgement at the call site, so a visible failure quietly becomes an unauditable wrong answer. There was no layer where a decision could fail loudly instead of defaulting to `safe = true`.",
    techStack: [
      "Python 3.12",
      "FastAPI",
      "Jev (TypeSafe AI)",
      "OpenRouter",
      "SQLAlchemy",
      "SQLite",
      "pytest",
      "GitHub Apps",
    ],
    features: [
      "Six versioned typed questions (category, risk, breaking change, additional testing, maintainer review, security review) batched into a single Jev call and stored as `name@version` artifacts",
      "A `DecisionProvider` abstraction so Jev is swappable and every layer above it stays provider-independent",
      "A hard untrusted-input boundary: pull request text is isolated structurally from decision instructions, with adversarial prompt-injection tests in the suite",
      "Verified, deduplicated GitHub webhook ingestion feeding a context builder that keeps untrusted text in its own compartment",
      "A deterministic action router that plans actions on every path, while execution stays a separate, explicit, token-gated step",
      "An audit store persisting every run, decision, and planned action, with a dashboard to filter by decision and expand the full decision path",
      "An evaluation harness scoring a provider against labelled pull requests on accuracy, precision/recall, F1, Brier score, latency, tokens, and cost",
    ],
    challenges: [
      {
        title: "Refusing to ship a fallback",
        problem:
          "Every practical instinct says wrap the model call in a try/except and default to low risk when it is unreachable. That one convenience would have made the entire decision layer unauditable.",
        solution:
          "Turned it into a repository rule instead of a convention: no heuristic stand-in may exist, provider failure is recorded as a failed run with a non-zero smoke-test exit code, and a missing decision surfaces as an error rather than `risk = 0`.",
      },
      {
        title: "Treating PR text as hostile input",
        problem:
          "Pull request content is fully attacker-controlled, so anything that concatenates it into instructions lets a pull request rewrite the decision it is being judged by.",
        solution:
          "Isolated untrusted text at the context-builder boundary so it can never be read as instruction, then covered that boundary with an adversarial suite asserting injected directives are ignored rather than obeyed.",
      },
      {
        title: "Keeping decisions comparable over time",
        problem:
          "Editing a risk rubric in place silently invalidates every historical run, because those answers were produced under different criteria.",
        solution:
          "Versioned the question registry so each decision is stored with the question version it was asked under, and required contributors to bump the version whenever a rubric changes.",
      },
      {
        title: "Staying reviewable without a paid key",
        problem:
          "A decision system that only runs with a live model credential is impossible to test, review, or contribute to.",
        solution:
          "Wrote 248 tests that stub only the HTTP transport and never model judgement, so the suite runs with no API key and no network access while still covering schemas, webhook security, deduplication, persistence, metrics, and the pipeline.",
      },
      {
        title: "Separating deciding from acting",
        problem:
          "An agent that evaluates a pull request and acts on it in one step can mutate a repository off a single untrusted click.",
        solution:
          "Split the paths: every route plans actions deterministically, and applying them requires an explicit token-gated step, so the browser review form can never write to GitHub.",
      },
    ],
    outcome:
      "Gatewise is a working decision layer with 248 passing tests, a live dashboard, and real Jev calls stored alongside the question version each was asked under. The research question — whether a fast typed System-1 model is reliable enough to gate autonomous software engineering — is measured rather than asserted: the harness and seed dataset exist, and no accuracy or cost claim is made until it is scored against a human-labelled dataset.",
  },
  jasper: {
    title: "Jasper Finance",
    summary:
      "Autonomous financial research agent built on LangGraph — orchestrates multi-step web research, synthesis, and report generation.",
    problem:
      "Financial research traditionally requires analysts to manually sift through multiple data sources, earnings calls, news feeds, and market reports — a time-intensive process that is prone to information gaps and delayed decision-making.",
    techStack: ["Python", "LangChain", "OpenAI", "yfinance"],
    features: [
      "Multi-step web research orchestration via LangGraph with deterministic validation at each step",
      "Real-time market data aggregation including prices, news, and earnings call transcripts",
      "Sentiment extraction and analysis from earnings calls and financial news",
      "Automated report generation with structured, exportable PDF outputs and cited sources",
    ],
    challenges: [
      {
        title: "Planning Engine",
        problem:
          "Decomposing complex research queries into executable sub-tasks required careful graph design to maintain context across steps.",
        solution:
          "Implemented a hierarchical planning system in LangGraph with deterministic validation at each node, ensuring the agent stays on track and produces coherent intermediate results.",
      },
      {
        title: "Context Window Management",
        problem:
          "Financial documents are lengthy — earnings transcripts and regulatory filings easily exceed standard context limits.",
        solution:
          "Designed a chunking and retrieval strategy that preserves semantic coherence across segments while supporting 100K to 2M+ token contexts through dynamic windowing.",
      },
      {
        title: "Tool Integration",
        problem:
          "Coordinating multiple AI tool calls (market data APIs, web search, document parsing) with real-time feedback required robust error handling.",
        solution:
          "Built an orchestration layer with retry logic, fallback tool chains, and streaming progress updates so the user sees intermediate results as they are produced.",
      },
      {
        title: "Terminal User Experience",
        problem:
          "Multi-step research workflows needed clear visual feedback in a terminal environment — standard logging was insufficient.",
        solution:
          "Used the Rich library to build a live-updating terminal UI with progress bars, collapsible sections, and color-coded status indicators for each research step.",
      },
    ],
    outcome:
      "Jasper transforms hours of manual financial research into seconds of automated execution, delivering structured reports with cited sources directly in the terminal — enabling faster, data-driven investment decisions.",
  },

  stockiq: {
    title: "StockIQ",
    summary:
      "Demand forecasting system using SARIMAX — converts raw inventory and order data into reorder recommendations and multi-warehouse decisions.",
    problem:
      "D2C businesses face persistent uncertainty in demand forecasting, multi-warehouse inventory allocation, and reorder decisions. Without a systematic approach, teams rely on intuition and spreadsheets, leading to stockouts, overstocking, and missed revenue opportunities.",
    techStack: ["Python", "Pandas", "NumPy", "Statsmodels", "FastAPI", "Streamlit"],
    features: [
      "Probabilistic demand forecasting (P10/P50/P90) using SARIMAX time-series models with configurable horizons",
      "Multi-warehouse inventory optimization with stable allocation shares and configurable risk floors",
      "MOQ-aware reorder logic accounting for minimum order quantities, lead times, and safety stock targets",
      "COD and RTO intelligence providing explainable cash-on-delivery eligibility decisions based on historical patterns",
    ],
    challenges: [
      {
        title: "Probabilistic Forecasting",
        problem:
          "Raw historical order data is noisy and seasonal — point forecasts alone are insufficient for inventory decisions with asymmetric costs.",
        solution:
          "Implemented SARIMAX models that output P10/P50/P90 probability distributions, allowing stakeholders to make risk-informed decisions based on their tolerance for stockouts vs. overstocking.",
      },
      {
        title: "Multi-Warehouse Allocation",
        problem:
          "Distributing inventory across warehouses while minimizing risk and maximizing fill rates is a constrained optimization problem with competing objectives.",
        solution:
          "Built an allocation engine that computes stable shares using historical demand patterns per SKU, with configurable risk floors to prevent any single warehouse from being understocked.",
      },
      {
        title: "Constraint-Aware Reordering",
        problem:
          "Real-world constraints — minimum order quantities, variable lead times, and safety stock targets — interact non-linearly and are often violated by naive reorder points.",
        solution:
          "Developed an iterative reorder algorithm that respects all constraints simultaneously, computing the exact quantity and timing for each SKU-warehouse combination.",
      },
      {
        title: "COD Decision Intelligence",
        problem:
          "Cash-on-delivery orders carry return-to-origin (RTO) risk, but blanket restrictions hurt revenue. A transparent, explainable decision was needed.",
        solution:
          "Built a rule-based decision system with transparent feature contributions — each COD eligibility decision includes an audit trail showing which factors drove the outcome.",
      },
    ],
    outcome:
      "StockIQ converts raw operational data into deterministic, explainable business actions: exactly how much to reorder, where to place inventory, and whether to allow COD — reducing guesswork and improving inventory turnover across warehouses.",
  },

  claimwise: {
    title: "ClaimWise",
    summary:
      "AI-powered insurance policy analysis platform — upload a policy, get a structured coverage breakdown, compare policies side by side, and ask questions with RAG document chat.",
    problem:
      "Insurance policies are long, dense documents full of exclusions, sub-limits and conditions that people rarely read through. Comparing two policies means manually aligning coverage sections, and asking a simple question like \"is this treatment covered?\" means scrolling through pages of PDF text. ClaimWise was built to make a policy understandable, comparable and queryable in minutes instead of hours.",
    techStack: ["Next.js", "TypeScript", "FastAPI", "Supabase", "Groq", "Gemini", "OpenAI"],
    features: [
      "Policy document upload with Tesseract OCR and pdf2image preprocessing, so scanned PDFs and photos of forms still yield structured text",
      "Structured AI analysis that extracts policy type, provider, premium, coverage amount, deductibles and key features, plus coverage-gap and cost-optimization insights",
      "RAG document chat that retrieves the relevant chunks of an uploaded policy and answers questions with citations back to the source text",
      "Side-by-side multi-policy comparison with coverage gap analysis across aligned sections",
      "Multi-LLM provider layer across Groq, Gemini and OpenAI behind a single interface, with JWT auth, per-user data isolation, caching and rate limiting",
    ],
    challenges: [
      {
        title: "Grounding answers in the actual policy",
        problem:
          "A general LLM asked \"is this covered?\" will confidently invent coverage terms that are not in the document, which is worse than no answer for an insurance product.",
        solution:
          "Built a retrieval pipeline that chunks the extracted policy text, retrieves the passages relevant to a question and forces the model to answer from that context, so replies trace back to the uploaded document instead of model priors.",
      },
      {
        title: "Making messy document uploads usable",
        problem:
          "Users upload scanned PDFs, photographed forms and provider-specific layouts; naive extraction produces garbled text that then poisons analysis and retrieval.",
        solution:
          "Preprocessed uploads with pdf2image and Tesseract OCR before parsing, and kept extraction, analysis and chat as separate stages so a failed stage surfaces a clear error instead of a silently wrong answer.",
      },
      {
        title: "Comparing policies that do not share a structure",
        problem:
          "Two policies from different providers organize coverage differently — the same benefit appears in different sections, under different wording, with different sub-limits.",
        solution:
          "Normalised each policy into a shared typed schema first, then compared the normalised fields, so the comparison aligns semantics rather than raw section text.",
      },
      {
        title: "Multi-provider LLM cost and reliability",
        problem:
          "Depending on a single model provider creates a single point of failure and locks the feature set to one vendor's rate limits and pricing.",
        solution:
          "Introduced a provider abstraction over Groq, Gemini and OpenAI so analysis and chat calls can be routed by availability and cost, with JWT-protected async FastAPI endpoints, caching and rate limiting in front.",
      },
    ],
    outcome:
      "ClaimWise is deployed end to end — Next.js on Vercel talking to an async FastAPI backend on Render with Supabase for auth and storage. A user can upload a policy, get a structured analysis, compare it against another policy and ask follow-up questions with source-grounded answers, all in one session.",
  },

  wealthify: {
    title: "Wealthify",
    summary:
      "Personal finance app with ML-powered transaction categorization, spending insights, and bank integration.",
    problem:
      "Managing personal finances is fragmented — people use separate tools for budgeting, expense tracking, and investment monitoring. Most solutions lack intelligent categorization, making it hard to understand true spending patterns and get actionable advice.",
    techStack: ["Next.js", "FastAPI", "Supabase"],
    features: [
      "ML-powered transaction categorization that automatically classifies expenses into categories like groceries, utilities, and dining using a trained text classification model",
      "Spending insights and trends surfacing patterns, anomalies, and personalized saving recommendations based on historical spending data",
      "Bank integration via financial APIs for automatic transaction sync with deduplication and reconciliation",
      "Multi-currency support handling expenses and conversions across currencies with live exchange rates",
    ],
    challenges: [
      {
        title: "Transaction Categorization Accuracy",
        problem:
          "Raw bank transaction descriptions are messy and inconsistent — the same merchant may appear under multiple names, making rule-only categorization unreliable.",
        solution:
          "Built a hybrid pipeline combining regex-based pattern matching with a lightweight ML model (TF-IDF with logistic regression) that improves categorization accuracy as more transactions are labeled.",
      },
      {
        title: "Real-Time Sync and Reconciliation",
        problem:
          "Keeping transaction data in sync across multiple bank connections required handling webhooks, rate limits, and duplicate transactions from overlapping sync periods.",
        solution:
          "Implemented a reconciliation system with idempotent ingestion keys, webhook event processing, and daily reconciliation jobs that detect and merge duplicate entries.",
      },
      {
        title: "Privacy and Data Security",
        problem:
          "Handling sensitive financial data requires robust security without compromising user experience or feature velocity.",
        solution:
          "Enforced encryption at rest and in transit, implemented row-level security policies via Supabase, and designed an API surface that minimizes exposed financial data to the frontend.",
      },
      {
        title: "Generating Actionable Insights",
        problem:
          "Static charts and tables do not drive behavioral change — users need contextual, personalized recommendations to act on their spending patterns.",
        solution:
          "Built a rule engine that detects spending anomalies (e.g., spending 2x the normal amount on dining) and surfaces them as contextual recommendations within the dashboard, linked to specific transactions.",
      },
    ],
    outcome:
      "Wealthify gives users a unified view of their finances with intelligent categorization that improves over time, helping them understand spending patterns, detect anomalies early, and save more effectively.",
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}

export function getAllCaseStudies(): [string, CaseStudy][] {
  return Object.entries(caseStudies);
}
