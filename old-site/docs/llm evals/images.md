# Image Generation Prompts for Gemini Pro - LLM Evals Blog

Use these prompts in Gemini to generate professional images for your LLM Evaluation blog post.

---

## Image 1: Hero/Cover Image (REQUIRED)

**Filename:** `llm-evals-hero.png`

**Prompt for Gemini:**
```
Create a wide banner image (1200x630px) for a technical blog post about LLM evaluation.

Design concept:
- Split composition with vertical divide
- Modern tech aesthetic with depth and gradients
- Professional quality, suitable for LinkedIn sharing

LEFT SIDE - "What It Looks Like":
- Multiple floating checkmark badges (green) over code snippets
- A "Tests Pass" banner with green checkmark
- Simple dashboard showing 100% pass rate
- Clean, polished appearance
- Cool blue/green color scheme (#3B82F6 / #10B981)
- Represents the confident testing phase

RIGHT SIDE - "What It Actually Means":
- A magnifying glass revealing hidden cracks beneath the surface
- Faint question marks and edge cases floating around
- Real users represented as abstract silhouettes
- A feedback loop icon (circular arrows)
- Warm orange/red color scheme (#F97316 / #EF4444)
- Depth perception — things are more complex than they appear

Overall:
- Dark background (#0F172A)
- Subtle grid pattern
- Professional tech illustration style
- Text overlay: "Your AI Looks Great in Testing"
- Clean, modern, editorial quality
```

---

## Image 2: Three Levels Pyramid (REQUIRED)

**Filename:** `evals-pyramid.png`

**Prompt for Gemini:**
```
Create a 3-level pyramid infographic for an LLM evaluation framework.

Design concept:
- 3-tier pyramid structure
- Dark background (#0F172A)
- Clean, minimal tech illustration style

BOTTOM TIER (largest, green):
- Label: "Level 1: Unit Tests"
- Subtext: "Every commit · Milliseconds"
- Color: Green (#065F46 → #34D399)

MIDDLE TIER (medium, blue):
- Label: "Level 2: Human + LLM-as-Judge"
- Subtext: "Weekly · Sampled Traces"
- Color: Blue (#1E40AF → #60A5FA)

TOP TIER (smallest, red):
- Label: "Level 3: A/B Testing"
- Subtext: "Major Releases · Real Users"
- Color: Red (#991B1B → #F87171)

Arrows point upward showing increasing cost/accuracy.
Clean, professional infographic style.
No extra text or decorations.
```

---

## Image 3: The Improvement Loop

**Filename:** `eval-loop.png`

**Prompt for Gemini:**
```
Create a circular flow diagram with 3 nodes arranged in a cycle.

Design concept:
- Dark background (#0F172A)
- 3 circular nodes connected by arrows forming a cycle

NODE 1 (left, blue #2563EB): "Evaluate"
NODE 2 (bottom-right, orange #EA580C): "Debug"
NODE 3 (top-right, green #16A34A): "Improve"

Arrows connect: Evaluate → Debug → Improve → (back to) Evaluate
Clean, minimal diagram style with subtle glow effects.
Suitable for embedding in a technical blog post.
```

---

## Image 4: LLM Evaluation Challenges

**Filename:** `llm-challenges.png`

**Prompt for Gemini:**
```
Create a conceptual illustration showing 4 challenges of evaluating LLMs.

Layout: 4 cards/panels arranged in a 2x2 grid on dark background (#0F172A).

CARD 1 (top-left, red): "Non-determinism"
- Abstract: Same input pipe splitting into different output paths
- Icon: Fork in the road / branching paths

CARD 2 (top-right, yellow): "Multiple Valid Answers"
- Abstract: One question, many different correct-looking answer bubbles
- Icon: Thought bubbles with checkmarks

CARD 3 (bottom-left, red): "Correct but Useless"  
- Abstract: A technically correct answer that misses the user's intent
- Icon: Target with arrow hitting outside the bullseye

CARD 4 (bottom-right, purple): "The Vibes Problem"
- Abstract: A response that passes all checks but still feels wrong
- Icon: A gauge/meter that shows green but has a warning symbol

Clean tech illustration style, professional, editorial quality.
No text needed - the visuals should convey the concepts.
```

---

## Image 5: Criteria Drift Visualization

**Filename:** `criteria-drift.png`

**Prompt for Gemini:**
```
Create a diagram showing a circular/chicken-and-egg problem about evaluation criteria.

Design concept:
- Dark background (#0F172A)
- Two curved arrows forming a circle

LEFT SIDE (blue #3B82F6): "Need criteria to grade outputs"
RIGHT SIDE (red #EF4444): "But grading outputs helps define criteria"

Between them in the center (subtle, gray): A question mark
Below the circle: Small text or visual showing "Emergent criteria from real data"

Clean, minimal tech illustration style.
Suitable for a blog post about the challenges of building LLM eval systems.
```
