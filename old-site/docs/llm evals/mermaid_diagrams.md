# Mermaid Diagrams for LLM Evals Blog

Use these Mermaid definitions to generate diagrams or visualize the concepts described in the blog post.

---

## Diagram 1: The Three Levels of Evals (Pyramid)

```mermaid
graph TD
    classDef base fill:#065f46,stroke:#34d399,color:#fff,rx:8
    classDef middle fill:#1e40af,stroke:#60a5fa,color:#fff,rx:8
    classDef top fill:#991b1b,stroke:#f87171,color:#fff,rx:8

    Level1["Level 1: Unit Tests<br/>Every commit · milliseconds<br/>Automated assertions"]
    Level2["Level 2: Human + LLM-as-Judge<br/>Weekly · sampled traces<br/>Quality and subtlety checks"]
    Level3["Level 3: A/B Testing<br/>Major releases · real users<br/>Business outcome metrics"]

    Level1 --> Level2 --> Level3

    class Level1 base
    class Level2 middle
    class Level3 top
```

---

## Diagram 2: The Evaluate → Debug → Improve Loop

```mermaid
graph LR
    E["Evaluate"] --> D["Debug"]
    D --> I["Improve"]
    I --> E

    style E fill:#2563eb,stroke:#fff,color:#fff
    style D fill:#ea580c,stroke:#fff,color:#fff
    style I fill:#16a34a,stroke:#fff,color:#fff
```

---

## Diagram 3: LLM-as-Judge Validation Workflow

```mermaid
graph LR
    T["Sample<br/>50 Traces"] --> H["Human Labels<br/>Good / Bad + Why"]
    T --> J["LLM Judge<br/>Evaluates Same<br/>Traces"]
    H --> C{"Compare<br/>Agreement?"}
    J --> C
    C -->|"Low<br/>Revise"| R["Rewrite Judge<br/>Prompt"]
    R --> J
    C -->|"High >80%"| D["Deploy Judge<br/>at Scale"]

    style T fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style H fill:#065f46,stroke:#34d399,color:#fff
    style J fill:#5f1e1e,stroke:#f87171,color:#fff
    style C fill:#854d0e,stroke:#fbbf24,color:#fff
    style R fill:#6b21a8,stroke:#a78bfa,color:#fff
    style D fill:#065f46,stroke:#34d399,color:#fff
```

---

## Diagram 4: Criteria Drift

```mermaid
graph TB
    Start["Start with<br/>rough rubric"] --> Label["Label 50 traces<br/>Good / Bad + Why"]
    Label --> Read["Read 'why' column<br/>Discover new criteria"]
    Read --> Revise["Update rubric<br/>with new criteria"]
    Revise --> Label

    Note["You can not fully define good<br/>before seeing enough outputs"] -.- Start

    style Start fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style Label fill:#065f46,stroke:#34d399,color:#fff
    style Read fill:#854d0e,stroke:#fbbf24,color:#fff
    style Revise fill:#5f1e1e,stroke:#f87171,color:#fff
    style Note fill:#333,stroke:#666,color:#aaa
```

---

## Diagram 5: Judge Prompt Refinement Rounds

```mermaid
graph LR
    R1["Round 1<br/>58% Agreement"] --> R2["Round 2<br/>71% Agreement<br/>+ tone examples"]
    R2 --> R3["Round 3<br/>79% Agreement<br/>+ accuracy edge cases"]
    R3 --> R4["Round 4<br/>83% Agreement<br/>+ split helpfulness"]

    style R1 fill:#5f1e1e,stroke:#f87171,color:#fff
    style R2 fill:#854d0e,stroke:#fbbf24,color:#fff
    style R3 fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style R4 fill:#065f46,stroke:#34d399,color:#fff
```

---

## Diagram 6: A/B Testing Flow

```mermaid
graph LR
    Users["Real Users"] --> Split{"50/50 Split"}
    Split -->|"Version A<br/>Current System"| A["Track Metrics<br/>Completion Rate<br/>Satisfaction<br/>Escalation Rate"]
    Split -->|"Version B<br/>Proposed Change"| B["Track Same<br/>Metrics"]
    A --> Compare{"Compare<br/>Outcomes"}
    B --> Compare
    Compare -->|"B Wins"| Deploy["Ship Version B"]
    Compare -->|"No Difference"| Iterate["Iterate on B"]

    style Users fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style Split fill:#854d0e,stroke:#fbbf24,color:#fff
    style A fill:#065f46,stroke:#34d399,color:#fff
    style B fill:#5f1e1e,stroke:#f87171,color:#fff
    style Compare fill:#6b21a8,stroke:#a78bfa,color:#fff
    style Deploy fill:#065f46,stroke:#34d399,color:#fff
    style Iterate fill:#5f1e1e,stroke:#f87171,color:#fff
```

---

## Diagram 7: LLM Evaluation Challenges

```mermaid
graph TB
    Center["Why LLMs Are Hard to Evaluate"] --> ND["Non-determinism<br/>Same prompt → different outputs"]
    Center --> MV["Multiple Valid Answers<br/>No single ground truth"]
    Center --> CU["Correct but Useless<br/>Technically right, wrong context"]
    Center --> VP["The Vibes Problem<br/>Feels wrong but passes all checks"]

    style Center fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style ND fill:#5f1e1e,stroke:#f87171,color:#fff
    style MV fill:#854d0e,stroke:#fbbf24,color:#fff
    style CU fill:#5f1e1e,stroke:#f87171,color:#fff
    style VP fill:#6b21a8,stroke:#a78bfa,color:#fff
```
