# Image Generation Prompts for Gemini Pro - MCP Blog

Use these prompts in Gemini to generate professional images for your Model Context Protocol blog.

---

## Image 1: Hero/Cover Image (REQUIRED)

**Filename:** `mcp-hero.png`

**Prompt for Gemini:**

```
Create a wide banner image (1200x630px) for a technical blog post about Model Context Protocol.

Design concept:
- Split composition with vertical divide in the middle
- Modern tech aesthetic with depth and gradients
- Professional quality, suitable for LinkedIn sharing

LEFT SIDE - "Without MCP":
- 3 AI app icons on the left
- 4 service icons on the right (GitHub, Drive, Database, Slack)
- Tangled spaghetti lines connecting everything
- Red/orange color scheme (#EF4444)
- Chaotic, messy feeling
- Label: "N×M Problem"

RIGHT SIDE - "With MCP":
- Same AI app icons at top
- Single "MCP" layer in the middle (blue/purple)
- Same service icons at bottom
- Clean parallel lines through MCP layer
- Green/blue color scheme (#10B981)
- Organized, calm feeling
- Label: "N+M Solution"

Overall:
- Dark background (#0F172A)
- Subtle grid pattern
- Professional tech illustration style
- No text overlays needed
- Clean, modern
```

---

## Image 2: Three-Layer Architecture Visualization

**Filename:** `mcp-architecture.png`

**Prompt for Gemini:**

```
Create a technical diagram (1000x700px) showing three stacked layers.

TOP LAYER - "Host":
- Blue color (#3B82F6)
- 2-3 app icons (chat, IDE, robot)
- Label: "Host"

MIDDLE LAYER - "Client":
- Purple color (#A855F7)
- Multiple connection nodes
- Show 1:1 relationship to servers
- Label: "MCP Client (1:1)"

BOTTOM LAYER - "Server":
- Orange/Green (#F97316 to #10B981)
- 4-5 service icons (folder, database, GitHub)
- Label: "Server"

Connections:
- Arrows flowing Host → Client → Server
- Glowing connection lines

Style:
- Dark background (#0F172A)
- Clean spacing between layers
- Modern tech diagram
- Professional look
```

---

## Image 3: Protocol Lifecycle Flowchart

**Filename:** `mcp-lifecycle.png`

**Prompt for Gemini:**

```
Create a horizontal flowchart (1000x600px) showing three phases.

PHASE 1 - "Initialization" (Left):
- Yellow color (#F59E0B)
- Handshake icon
- 3 arrows showing init sequence
- Status: 🔴 → ✅

PHASE 2 - "Operation" (Center - Largest):
- Green color (#10B981)
- Gear icon
- Circular arrows showing ongoing work
- tools/list, tools/call operations
- Status: ✅ Active

PHASE 3 - "Shutdown" (Right):
- Red color (#EF4444)
- Power off icon
- Connection close
- Status: ❌ Ended

Connections:
- Arrows Phase 1 → 2 → 3

Style:
- Dark background (#0F172A)
- Color-coded phases
- Modern flowchart style
- Clean design
```

---

## Image 4: STDIO vs HTTP Transport Comparison

**Filename:** `mcp-transports.png`

**Prompt for Gemini:**

```
Create a side-by-side comparison (1000x500px).

LEFT SIDE - "STDIO (Local)":
- Computer icon
- Two boxes connected by pipe: "Host" ↔ "Server"
- Both inside computer outline
- Speed: "< 1ms"
- Blue color (#3B82F6)
- Icons: Lock, Lightning

RIGHT SIDE - "HTTP (Remote)":
- Laptop and cloud icons
- Network connection between them
- HTTP/SSE arrows
- Speed: "20-100ms"
- Orange/Purple (#F97316)
- Icons: Globe, Users

Style:
- Dark background (#0F172A)
- Clean diagram style
- Color-coded
```

---

## Image 5: N×M Problem Visualization

**Filename:** `mcp-nxm-problem.png`

**Prompt for Gemini:**

```
Create a comparison diagram (1000x700px).

TOP HALF - "Without MCP":
- Left: 3 AI app icons
- Right: 4 service icons
- Between: Tangled web of 12 lines
- Red/orange color (#EF4444)
- Label: "3×4 = 12 integrations"
- Chaotic feeling

BOTTOM HALF - "With MCP":
- Left: Same 3 AI apps
- Center: "MCP" layer
- Right: Same 4 services
- Clean connections: 3 + 4 = 7 lines
- Green/blue color (#10B981)
- Label: "3+4 = 7 implementations"
- Clean, organized

Arrow between: "12 → 7"

Style:
- Dark background (#0F172A)
- Top messy, bottom clean
- Professional diagram
```

---

## Image 6: Tools vs Resources Comparison

**Filename:** `mcp-tools-resources.png`

**Prompt for Gemini:**

```
Create a side-by-side comparison (1000x500px).

LEFT SIDE - "Tools":
- Hammer icon
- Orange color (#F97316)
- Icons showing:
  * Pencil (modifies)
  * No-cache symbol
- Examples:
  * send_email
  * create_file
  * add_expense
- Badge: "⚠️ Changes things"

RIGHT SIDE - "Resources":
- Document icon
- Blue color (#3B82F6)
- Icons showing:
  * Eye (read-only)
  * Cache symbol
- Examples:
  * read_file
  * get_profile
  * list_data
- Badge: "✅ Safe to repeat"

Style:
- Dark background (#0F172A)
- Clear visual split
- Color-coded
- Professional design
```

---

## Image 7: Real-World Architecture Example (OPTIONAL)

**Filename:** `mcp-expense-tracker.png`

**Prompt for Gemini:**

```
Create a layered architecture diagram (1000x600px).

Four layers top to bottom:

LAYER 1 - "Users":
- 3 interface icons (desktop, mobile, custom)
- Light blue (#60A5FA)
- Speech bubbles with natural language

LAYER 2 - "MCP Clients":
- 3 client nodes
- Purple (#A855F7)
- 1:1 connections to interfaces

LAYER 3 - "MCP Server":
- Single server box
- Orange (#F97316)
- Tools listed (add_expense, list_expenses)

LAYER 4 - "Data":
- Database and cache icons
- Green (#10B981)

Style:
- Dark background (#0F172A)
- Clean layer separation
- Arrows showing flow
- Professional diagram
```

---

## Image 8: USB-C Analogy (OPTIONAL)

**Filename:** `mcp-usbc-analogy.png`

**Prompt for Gemini:**

```
Create a simple analogy illustration (900x500px).

LEFT SIDE - "Before":
- Laptop with many different ports
- Tangled cables
- Red/orange (#EF4444)
- Label: "Different connector for everything"

RIGHT SIDE - "After":
- Same laptop with USB-C ports
- One universal cable
- Multiple devices connected
- Green/blue (#10B981)
- Label: "One standard for everything"

Center:
- Equals sign or comparison
- "USB-C : Devices :: MCP : AI Data"

Style:
- Clean, simple illustration
- Minimalist design
- Easy to understand metaphor
```

---

## How to Use with Gemini:

1. **Go to Gemini** (gemini.google.com)
2. **Switch to image generation mode** (if needed)
3. **Paste one prompt**
4. **Generate image**
5. **Download as PNG**
6. **Rename to suggested filename**
7. **Place in `assets/blog/` folder**
8. **Repeat for 3-6 images**

---

## Priority Order:

**Must Have:**

1. Hero/Cover Image (for social sharing)

**Highly Recommended:** 2. Three-Layer Architecture 3. N×M Problem Visualization

**Nice to Have:** 4. Tools vs Resources 5. Lifecycle Flowchart 6. Transport Comparison 7. Expense Tracker Example 8. USB-C Analogy

---

## Tips for Best Results:

- **Be specific** about dimensions and colors
- **Request "professional tech diagram"** style
- **Mention dark backgrounds** for modern look
- **If result isn't perfect**, refine the prompt and regenerate
- **Download high resolution** (1000px+ width)

---

## Alternative Free Option:

If you don't want to use Gemini Pro, you can:

- Use **Bing Image Creator** (free, powered by DALL-E)
- Use **Leonardo.ai** (free tier available)
- Use **Ideogram** (free, good for tech diagrams)

Just use the same prompts!
