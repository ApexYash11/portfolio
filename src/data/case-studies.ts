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
      "Insurance claim automation platform using NLP and computer vision — cuts manual verification time by 80%.",
    problem:
      "Insurance claim processing remains manual, slow, and inconsistent. Adjusters must review documents, verify damage, cross-reference policy details, and detect fraud — a process that takes days per claim and produces uneven results across cases.",
    techStack: ["Python", "FastAPI", "TensorFlow", "React", "AWS"],
    features: [
      "OCR document parsing that extracts structured data from claim forms, invoices, and medical reports using NLP models",
      "Fraud detection engine that computes risk scores using ML models trained on historical claims data",
      "Automated underwriting that applies business rules and ML predictions to make coverage determinations",
      "Real-time dashboard providing claims processors a centralized view of claim status, risk scores, and actionable tasks",
    ],
    challenges: [
      {
        title: "Document Understanding at Scale",
        problem:
          "Insurance documents arrive in diverse formats — scanned PDFs, photos of forms, digital files — with unstructured layouts that vary by provider.",
        solution:
          "Combined OCR preprocessing with fine-tuned BERT-based NLP models to extract relevant fields (policy numbers, dates, amounts) with high accuracy across document types.",
      },
      {
        title: "Computer Vision for Damage Assessment",
        problem:
          "Analyzing vehicle and property damage from user-uploaded photos required accurate classification despite varying lighting, angles, and image quality.",
        solution:
          "Trained custom CNN models on labeled damage datasets with aggressive data augmentation to handle real-world variability, achieving consistent classification across lighting conditions.",
      },
      {
        title: "Fraud Detection Sensitivity",
        problem:
          "Fraud detection systems often face a trade-off between catching fraudulent claims and flagging legitimate ones, eroding trust with false positives.",
        solution:
          "Implemented an ensemble approach combining rule-based signals with gradient-boosted tree models, using calibrated probability thresholds adjustable by claim value tier.",
      },
      {
        title: "End-to-End Pipeline Latency",
        problem:
          "Processing a claim from document upload to decision output needed to complete in seconds to maintain real-time workflow usability.",
        solution:
          "Architected an async FastAPI backend with AWS SQS for task queuing, parallel processing of independent checks, and incremental result streaming to the dashboard.",
      },
    ],
    outcome:
      "ClaimWise reduces manual verification time by 80%, enabling claims processors to handle five times more claims per day while maintaining consistent, auditable decision quality and reducing fraud losses.",
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
