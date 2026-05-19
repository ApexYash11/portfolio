# IMAGE GENERATION PROMPTS FOR RAG LANGSMITH BLOG

## Overview

These are detailed, professional image generation prompts for the RAG LangSmith blog. Use with DALL-E 3, Midjourney, Ideogram, or similar AI image generators.

**Color Palette Reference:**

- Dark background: `#0a0a0a`
- Cyan accent: `#00d9ff`
- Orange accent: `#ff9500`
- Green accent: `#50c878`
- Blue accent: `#4a90e2`
- Red accent: `#e74c3c`
- Yellow accent: `#f39c12`

---

## 1. HERO/COVER IMAGE ✅

**Location:** Line 91 (after intro, before "RAG 101" section)  
**Filename:** `cover.png`  
**Resolution:** 1200×800px (16:9)

### Prompt:

```
Create a professional technical hero illustration for a blog about RAG (Retrieval-Augmented Generation)
systems and LangSmith optimization. Show a complete RAG pipeline flow:

- Left side: User query entering the system (speech bubble or query icon)
- Center: Three concurrent processes in boxes (Embedding → Vector Search → LLM)
- Right side: Answer output with confidence indicators
- Visual flow arrows connecting each stage from left to right

Color scheme:
- Dark background (#0a0a0a)
- Cyan (#00d9ff) for inputs
- Orange (#ff9500) for processing
- Green (#50c878) for outputs

Additional details:
- Subtle LangSmith monitoring traces overlaid as glowing connected lines
- Professional, minimalist but information-rich
- 16:9 aspect ratio, high resolution
- Include small icons: magnifying glass for search, brain for LLM, checkmark for success
```

---

## 2. TRACE ANATOMY BREAKDOWN

**Location:** After line 390 (after "Understanding Traces: The Anatomy" heading)  
**Filename:** `trace-anatomy.png`  
**Resolution:** 1000×700px

### Prompt:

```
Create a visual representation of a nested trace tree structure showing RAG execution hierarchy:

Root Node (top):
- "rag_query" | 2,347ms duration | $0.0234 cost | Success status
- Highlight in cyan box with glowing border

Three Child Branches (below root):

Branch 1 - Embedding:
- Label: "embedding_query" | 45ms
- Component: OpenAIEmbeddings.embed_query
- Model: text-embedding-3-small
- Metrics: 8 tokens, [768-dim vector output]
- Color: Blue (#4a90e2)
- Icon: Vector/cube icon

Branch 2 - Similarity Search:
- Label: "similarity_search" | 12ms
- Component: FAISS vector search
- Retrieved: 5 documents
- Similarity scores: [0.89, 0.87, 0.85, 0.82, 0.79]
- Color: Purple/Violet
- Icon: Search/magnifying glass icon

Branch 3 - LLM Invocation:
- Label: "llm_invoke" | 2,290ms
- Component: ChatOpenAI.invoke
- Model: gpt-4
- Metrics: 1,234 input tokens, 89 output tokens
- Response preview: first 50 chars
- Color: Orange (#ff9500)
- Icon: Brain/bulb icon

Visual Structure:
- Vertical lines connecting parent to children
- Indented layout for hierarchy clarity
- Use nesting with box frames
- Each node shows: operation name, duration, tokens, cost
- Small component-specific icons for quick visual scanning

Style:
- Technical, clean typography
- Dark background (#0a0a0a)
- Glowing text elements for emphasis
- White/cyan text on dark background
- Small subtle shadows for depth
```

---

## 3. EVALUATION RESULTS HEATMAP

**Location:** After line 566 (after "Running Evaluations" section, before code example)  
**Filename:** `evaluation-heatmap.png`  
**Resolution:** 1000×600px

### Prompt:

```
Create a professional heatmap matrix visualization showing evaluation progression across metrics:

Grid Structure:
- 5 rows × 4 columns
- Rows (top to bottom):
  * Baseline (Initial evaluation)
  * After 1st Check (First round of checks)
  * After 2nd Check (Second iteration)
  * After Tuning (Parameter optimization)
  * Final (Latest results)

- Columns (left to right):
  * Correctness
  * Relevance
  * Groundedness
  * Retrieval Quality

Cell Data:
- Show numerical scores from 0.0 to 1.0
- Example scores: 0.45, 0.62, 0.78, 0.89, 0.95
- Increasing scores suggest progression/improvement

Color Coding:
- Red: Low scores (<0.5) - represents poor performance
- Yellow: Medium scores (0.5-0.8) - represents acceptable performance
- Green: High scores (0.8-1.0) - represents excellent performance
- Use smooth gradient transition between colors

Visual Elements:
- Include numeric values inside each cell (white text for readability)
- Add row and column headers with clear labels
- Title at top: "Evaluation Progression: From Baseline to Final"
- Legend box showing: Red = Poor (0-0.5), Yellow = Fair (0.5-0.8), Green = Good (0.8-1.0)
- Subtle white grid lines separating cells

Style:
- Dark professional background (#0a0a0a)
- Clean grid layout, no clutter
- Color gradient from red → yellow → green
- Professional font, easy to read
- Minimal padding between cells
```

---

## 4. OPTIMIZATION ITERATIONS PROGRESS

**Location:** After line 687 (after "Optimization: From 40% to 95% Accuracy" heading)  
**Filename:** `optimization-progress.png`  
**Resolution:** 1100×700px

### Prompt:

```
Create an optimization progress chart showing 5 iterations improving accuracy from 75% to 95%.

Choose Layout (Recommend: Staircase for clarity):

OPTION A - Vertical Staircase (Left to Right):
Five ascending steps, each containing:
- Step position (1-5)
- Iteration name
- Accuracy percentage with large font
- Percentage gain from previous step
- Key change implemented

OPTION B - Vertical Spiral Progression:
Five connected circles arranged in upward spiral pattern

Iterations (Top to Bottom or Left to Right):

Iteration 1 - Baseline:
- Accuracy: 75%
- Gain: +0% (baseline)
- Config: chunk_size=512, k=5, no reranking
- Color: Red/Orange (#e74c3c)
- Metrics: Latency 2.3s, Cost $0.023/query

Iteration 2 - Increase K:
- Accuracy: 78% (+3%)
- Change: k increased from 5 to 10
- Rationale: More docs = better coverage
- Color: Orange (#ff9500)
- Impact: Cost +15% (more tokens to LLM)

Iteration 3 - Add Reranking:
- Accuracy: 85% (+7%)
- Change: Reranker model added
- Latency: Increase ~300ms
- Color: Yellow (#f39c12)

Iteration 4 - Optimize Chunks:
- Accuracy: 92% (+7%)
- Change: chunk_size optimized
- Retrieval Quality: Significant improvement
- Color: Light Green (#2ecc71)

Iteration 5 - Hybrid Search:
- Accuracy: 95% (+3%)
- Change: Semantic + keyword search hybrid
- Final metrics: Optimal balance
- Color: Green (#50c878)

Visual Elements:
- Gradient color progression: Red (75%) → Green (95%)
- Upward arrows between iterations showing progression
- Show accuracy gains as percentage badges (green badges)
- Include secondary metrics as subtle background elements:
  * Latency improvement timeline
  * Cost evolution line chart
  * Retrieval quality progression

Style:
- Dark professional background (#0a0a0a)
- Clean ascending layout
- Bold accuracy percentages
- Smaller supporting text
- Professional technical design
- No clutter or unnecessary elements
```

---

## 5. METADATA FILTERING IMPACT

**Location:** After line 791 (after "Metadata Filtering: The Underrated Optimization" heading)  
**Filename:** `metadata-filtering.png`  
**Resolution:** 1100×500px

### Prompt:

```
Create a before/after comparison diagram showing metadata filtering impact on search space:

LEFT SIDE - BEFORE FILTERING:
- Visualize 10,000 documents as large dense cloud of scattered colored dots
- Chaotic, unfocused arrangement
- Color: Red/Orange gradient (#e74c3c to #ff9500)
- Label: "10,000 Documents (Inefficient)"
- Visual cues: Scattered, overlapping, hard to navigate

CENTER - FILTERING PROCESS:
- Show vertical funnel or cone shape
- Filtering criteria icons flowing through:
  * Calendar icon (date range filtering)
  * Tag/Folder icon (category filtering)
  * Document icon (document type filtering)
  * Checkmark icon (status filtering)
- Arrows flowing downward through funnel showing reduction
- Dynamic flow indication with curved paths

RIGHT SIDE - AFTER FILTERING:
- Visualize 50 documents as clean, organized cluster
- Well-organized arrangement
- Color: Green gradient (#2ecc71 to #50c878)
- Label: "50 Documents (Optimized)"
- Visual cues: Organized, accessible, clear

KEY METRICS - Displayed as colored badges:
1. "99.5% reduction in search space" - Green badge
2. "Query latency: 650ms → 120ms (-82%)" - Orange badge
3. "Retrieval accuracy: +18%" - Blue badge

Additional Details:
- Include metric improvement arrows showing directionality
- Before metrics: 300 search operations, high latency, 40% accuracy
- After metrics: 20 search operations, low latency, 58% accuracy
- Subtle connection curves showing the filtering pipeline

Style:
- Dark professional background (#0a0a0a)
- Clear visual contrast between before/after
- Large impact numbers for emphasis
- Professional icons, no cartoonish elements
- Clean layout with defined spatial separation
- Minimalist but data-rich design
```

---

## Placement Summary Table

### ✅ GENERATE THESE 5 IMAGES (CORE)

| #   | Image Name            | Section ID              | File Name                 | Resolution | Line Reference |
| --- | --------------------- | ----------------------- | ------------------------- | ---------- | -------------- |
| 1   | Hero/Cover            | RAG Gap                 | cover.png                 | 1200×800   | Line 91        |
| 2   | Trace Anatomy         | Understanding Traces    | trace-anatomy.png         | 1000×700   | After Line 390 |
| 3   | Evaluation Heatmap    | Running Evaluations     | evaluation-heatmap.png    | 1000×600   | After Line 566 |
| 4   | Optimization Progress | Optimization Iterations | optimization-progress.png | 1100×700   | After Line 687 |
| 5   | Metadata Filtering    | Metadata Filtering      | metadata-filtering.png    | 1100×500   | After Line 791 |

### ❌ SKIP THIS IMAGE (Conflicts with mermaid)

- **LangSmith Architecture Layers** - **REASON:** Conflicts with mermaid diagram at lines 288-323. The mermaid diagram already shows the 3-layer architecture clearly—no need for a duplicate image.

### ⚠️ OPTIONAL (Not Recommended)

- **Failure Modes** - Creates extra visual clutter. Include only if you want more variety and can justify additional blog length.

---

## Usage Instructions

### Step 1: Generate 5 Images

1. **Copy each prompt** from Sections 1-5 in this file
2. **Paste into your AI image generator:**
   - DALL-E 3
   - Midjourney (add aspect ratio: `--ar 16:9` etc.)
   - Ideogram
   - Adobe Firefly

3. **Save images** to: `./assets/images-rag-langsmith/` (relative to project root)

4. **File naming:** Use exact filenames from the summary table above

### Step 2: Quality Check

Ensure each generated image matches:

- Dark theme (#0a0a0a) with specified accent colors
- Technical professional style (no cartoonish AI artifacts)
- Clean, readable text/labels (if present)
- Proper resolution for web use
- No overlapping with existing mermaid diagrams

### Step 3: Skip These

- ❌ **Do NOT generate:** Architecture Layers image (conflicts with mermaid diagram)
- ⚠️ **Optional only:** Failure Modes image (extra polish, not critical)

---

## Color Reference for Regeneration

If an image needs adjustment, use these exact colors:

```
Dark background:  #0a0a0a
Cyan accent:      #00d9ff
Blue accent:      #4a90e2
Orange accent:    #ff9500
Green accent:     #50c878
Red (errors):     #e74c3c
Yellow (warning): #f39c12
```

---

**Last Updated:** February 13, 2026  
**Blog:** RAG Systems in Production with LangSmith  
**Author:** Yash Maheshwari  
**Status:** Ready for image generation (5 images to create)
