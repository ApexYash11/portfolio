# Mermaid Diagrams for MCP Blog

Use these Mermaid definitions to generate technical diagrams for the Model Context Protocol blog.

---

## Diagram 1: N×M Problem (Before & After)

```mermaid
graph TB
    subgraph Before ["❌ Without MCP: N×M Problem"]
        direction LR
        A1[AI App 1]
        A2[AI App 2]
        A3[AI App 3]

        S1[GitHub]
        S2[Drive]
        S3[Database]
        S4[Slack]

        A1 --> S1
        A1 --> S2
        A1 --> S3
        A1 --> S4

        A2 --> S1
        A2 --> S2
        A2 --> S3
        A2 --> S4

        A3 --> S1
        A3 --> S2
        A3 --> S3
        A3 --> S4

        style Before fill:#1a1a1a,stroke:#EF4444,stroke-width:3px,color:#fff
        style A1 fill:#3B82F6,stroke:#fff,color:#fff
        style A2 fill:#3B82F6,stroke:#fff,color:#fff
        style A3 fill:#3B82F6,stroke:#fff,color:#fff
        style S1 fill:#EF4444,stroke:#fff,color:#fff
        style S2 fill:#EF4444,stroke:#fff,color:#fff
        style S3 fill:#EF4444,stroke:#fff,color:#fff
        style S4 fill:#EF4444,stroke:#fff,color:#fff
    end

    subgraph After ["✅ With MCP: N+M Solution"]
        direction LR
        B1[AI App 1]
        B2[AI App 2]
        B3[AI App 3]

        MCP[🔗 MCP Layer]

        B1S1[GitHub]
        B1S2[Drive]
        B1S3[Database]
        B1S4[Slack]

        B1 --> MCP
        B2 --> MCP
        B3 --> MCP

        MCP --> B1S1
        MCP --> B1S2
        MCP --> B1S3
        MCP --> B1S4

        style After fill:#1a1a1a,stroke:#10B981,stroke-width:3px,color:#fff
        style B1 fill:#3B82F6,stroke:#fff,color:#fff
        style B2 fill:#3B82F6,stroke:#fff,color:#fff
        style B3 fill:#3B82F6,stroke:#fff,color:#fff
        style MCP fill:#A855F7,stroke:#fff,stroke-width:2px,color:#fff
        style B1S1 fill:#10B981,stroke:#fff,color:#fff
        style B1S2 fill:#10B981,stroke:#fff,color:#fff
        style B1S3 fill:#10B981,stroke:#fff,color:#fff
        style B1S4 fill:#10B981,stroke:#fff,color:#fff
    end
```

---

## Diagram 2: Three-Layer Architecture

```mermaid
graph TD
    subgraph Host ["🖥️ HOST LAYER (Applications)"]
        H1[Chat App]
        H2[IDE]
        H3[Custom App]
        style Host fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#fff
        style H1 fill:#3B82F6,stroke:#fff,color:#fff
        style H2 fill:#3B82F6,stroke:#fff,color:#fff
        style H3 fill:#3B82F6,stroke:#fff,color:#fff
    end

    subgraph Client ["📡 CLIENT LAYER (MCP Clients)"]
        C1[Client 1]
        C2[Client 2]
        C3[Client 3]
        style Client fill:#0F172A,stroke:#A855F7,stroke-width:2px,color:#fff
        style C1 fill:#A855F7,stroke:#fff,color:#fff
        style C2 fill:#A855F7,stroke:#fff,color:#fff
        style C3 fill:#A855F7,stroke:#fff,color:#fff
    end

    subgraph Server ["⚙️ SERVER LAYER (Services)"]
        S1["🗂️ Folder Server"]
        S2["🗄️ Database Server"]
        S3["🔧 GitHub Server"]
        S4["💬 Slack Server"]
        style Server fill:#0F172A,stroke:#F97316,stroke-width:2px,color:#fff
        style S1 fill:#10B981,stroke:#fff,color:#fff
        style S2 fill:#10B981,stroke:#fff,color:#fff
        style S3 fill:#10B981,stroke:#fff,color:#fff
        style S4 fill:#10B981,stroke:#fff,color:#fff
    end

    Host -->|Requests| Client
    Client -->|1:1 Connection| Server
```

---

## Diagram 3: MCP Protocol Lifecycle

```mermaid
graph LR
    subgraph Init ["🟨 Phase 1: Initialization"]
        direction TB
        I1["🤝 Handshake"]
        I2["📋 Declare Capabilities"]
        I3["✅ Ready"]
        I1 --> I2 --> I3
        style Init fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#fff
        style I1 fill:#F59E0B,stroke:#fff,color:#000
        style I2 fill:#F59E0B,stroke:#fff,color:#000
        style I3 fill:#F59E0B,stroke:#fff,color:#000
    end

    subgraph Ops ["🟩 Phase 2: Operation"]
        direction TB
        O1["🔄 Tool List"]
        O2["⚙️ Tool Call"]
        O3["📤 Response"]
        O1 --> O2 --> O3 --> O1
        style Ops fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#fff
        style O1 fill:#10B981,stroke:#fff,color:#000
        style O2 fill:#10B981,stroke:#fff,color:#000
        style O3 fill:#10B981,stroke:#fff,color:#000
    end

    subgraph Close ["🟥 Phase 3: Shutdown"]
        direction TB
        C1["⚠️ Close Connection"]
        C2["🛑 Cleanup"]
        C3["❌ Terminated"]
        C1 --> C2 --> C3
        style Close fill:#0F172A,stroke:#EF4444,stroke-width:2px,color:#fff
        style C1 fill:#EF4444,stroke:#fff,color:#fff
        style C2 fill:#EF4444,stroke:#fff,color:#fff
        style C3 fill:#EF4444,stroke:#fff,color:#fff
    end

    Init --> Ops --> Close
```

---

## Diagram 4: STDIO vs HTTP Transport Comparison

```mermaid
graph LR
    subgraph STDIO ["🟦 STDIO (Local)"]
        direction TB
        S1["💻 Host"]
        S2["⚡ Pipe Connection"]
        S3["⚙️ Server"]
        S1 <--> S2 <--> S3
        Speed1["⚡ &lt;1ms"]
        style STDIO fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#fff
        style S1 fill:#3B82F6,stroke:#fff,color:#fff
        style S2 fill:#3B82F6,stroke:#fff,color:#fff
        style S3 fill:#3B82F6,stroke:#fff,color:#fff
        style Speed1 fill:#0EA5E9,stroke:#fff,color:#000
    end

    subgraph HTTP ["🟧 HTTP (Remote)"]
        direction TB
        H1["💻 Host"]
        H2["🌐 Network/SSE"]
        H3["☁️ Remote Server"]
        H1 <-->|HTTP| H2 <-->|SSE| H3
        Speed2["🐌 20-100ms"]
        style HTTP fill:#0F172A,stroke:#F97316,stroke-width:2px,color:#fff
        style H1 fill:#F97316,stroke:#fff,color:#fff
        style H2 fill:#F97316,stroke:#fff,color:#fff
        style H3 fill:#F97316,stroke:#fff,color:#fff
        style Speed2 fill:#FB923C,stroke:#fff,color:#000
    end
```

---

## Diagram 5: Tools vs Resources Comparison

```mermaid
graph LR
    subgraph Tools ["🔨 Tools (Actions)"]
        direction TB
        T1["⚠️ Modifies State"]
        T2["❌ Not Safe to Repeat"]
        T3["Examples:"]
        T4["📧 send_email"]
        T5["✏️ create_file"]
        T6["💰 add_expense"]
        T3 --> T4 & T5 & T6
        style Tools fill:#0F172A,stroke:#F97316,stroke-width:2px,color:#fff
        style T1 fill:#F97316,stroke:#fff,color:#fff
        style T2 fill:#EF4444,stroke:#fff,color:#fff
        style T3 fill:#FB923C,stroke:#fff,color:#000
        style T4 fill:#FB923C,stroke:#fff,color:#000
        style T5 fill:#FB923C,stroke:#fff,color:#000
        style T6 fill:#FB923C,stroke:#fff,color:#000
    end

    subgraph Resources ["📖 Resources (Read-Only)"]
        direction TB
        R1["✅ Safe to Repeat"]
        R2["👁️ No Side Effects"]
        R3["Examples:"]
        R4["📄 read_file"]
        R5["👤 get_profile"]
        R6["📊 list_data"]
        R3 --> R4 & R5 & R6
        style Resources fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#fff
        style R1 fill:#10B981,stroke:#fff,color:#fff
        style R2 fill:#10B981,stroke:#fff,color:#fff
        style R3 fill:#60A5FA,stroke:#fff,color:#000
        style R4 fill:#60A5FA,stroke:#fff,color:#000
        style R5 fill:#60A5FA,stroke:#fff,color:#000
        style R6 fill:#60A5FA,stroke:#fff,color:#000
    end
```

---

## Diagram 6: Real-World MCP Expense Tracker Architecture

```mermaid
graph TD
    subgraph Users ["👥 Users (Interfaces)"]
        U1["🖥️ Desktop"]
        U2["📱 Mobile"]
        U3["🎙️ Voice"]
        style Users fill:#0F172A,stroke:#60A5FA,stroke-width:2px,color:#fff
    end

    subgraph Clients ["📡 MCP Clients (1:1)"]
        C1[Client 1]
        C2[Client 2]
        C3[Client 3]
        style Clients fill:#0F172A,stroke:#A855F7,stroke-width:2px,color:#fff
    end

    subgraph Server ["⚙️ MCP Server (Single)"]
        S["Expense Tracker Server"]
        T1["➕ add_expense"]
        T2["📋 list_expenses"]
        T3["📊 get_summary"]
        S --> T1 & T2 & T3
        style Server fill:#0F172A,stroke:#F97316,stroke-width:2px,color:#fff
        style S fill:#F97316,stroke:#fff,color:#fff
    end

    subgraph Data ["💾 Data Layer"]
        D1[("🗄️ Database")]
        D2[("💾 Cache")]
        style Data fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#fff
    end

    U1 & U2 & U3 --> C1 & C2 & C3
    C1 & C2 & C3 -->|1:1| S
    S --> D1 & D2
```

---

## Diagram 7: MCP USB-C Analogy

```mermaid
graph LR
    subgraph Before ["🔴 Before: Fragmented"]
        direction TB
        L1["💻 Laptop"]
        P1["HDMI"]
        P2["USB-A"]
        P3["USB-C"]
        P4["Thunderbolt"]
        P5["Proprietary"]
        L1 -.-> P1 & P2 & P3 & P4 & P5
        style Before fill:#1a1a1a,stroke:#EF4444,stroke-width:2px,color:#fff
        style L1 fill:#DC2626,stroke:#fff,color:#fff
        style P1 fill:#991B1B,stroke:#999
        style P2 fill:#991B1B,stroke:#999
        style P3 fill:#991B1B,stroke:#999
        style P4 fill:#991B1B,stroke:#999
        style P5 fill:#991B1B,stroke:#999
    end

    Arrow["➡️ MCP = USB-C<br/>for AI!"]

    subgraph After ["🟢 After: Unified"]
        direction TB
        L2["💻 Laptop"]
        P6["USB-C"]
        P7["USB-C"]
        P8["USB-C"]
        L2 -.-> P6 & P7 & P8
        style After fill:#1a1a1a,stroke:#10B981,stroke-width:2px,color:#fff
        style L2 fill:#059669,stroke:#fff,color:#fff
        style P6 fill:#047857,stroke:#10B981,stroke-width:2px
        style P7 fill:#047857,stroke:#10B981,stroke-width:2px
        style P8 fill:#047857,stroke:#10B981,stroke-width:2px
    end

    style Arrow fill:#0F172A,stroke:#A855F7,stroke-width:2px,color:#fff,text-align:center
```

---

## Diagram 8: Client-Server Communication Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant App as 🖥️ Application
    participant Client as 📡 MCP Client
    participant Server as ⚙️ MCP Server
    participant Service as 🌐 External Service

    User->>App: "List my expenses"
    App->>Client: Initialize Connection
    Client->>Server: Handshake + Declare Capabilities
    Server->>Client: Acknowledge + Available Tools

    App->>Client: Call list_expenses Tool
    Client->>Server: Execute Tool Request
    Server->>Service: Query Database
    Service-->>Server: Return Data
    Server-->>Client: Tool Result
    Client-->>App: Response
    App-->>User: Display Expenses

    Note over Client,Server: Keep connection alive for next request

    App->>Client: Call add_expense Tool
    Client->>Server: Execute Tool Request
    Server->>Service: Store Data
    Service-->>Server: Confirmation
    Server-->>Client: Tool Result
    Client-->>App: Response
    App-->>User: "Expense added!"
```

---

## How to Use These Diagrams

1. **Copy any diagram code** (between the ` ``` ` markers)
2. **Paste into Mermaid editor** at [mermaid.live](https://mermaid.live)
3. **Download as SVG/PNG** or embed directly in your blog
4. **Or render directly in your blog** if using Markdown processor with Mermaid support

## Corresponding Image Prompts

| Diagram            | Image Prompt              | Use Case               |
| ------------------ | ------------------------- | ---------------------- |
| N×M Problem        | `mcp-nxm-problem.png`     | Article hero/header    |
| Architecture       | `mcp-architecture.png`    | Technical overview     |
| Lifecycle          | `mcp-lifecycle.png`       | Protocol explanation   |
| Transports         | `mcp-transports.png`      | Performance comparison |
| Tools vs Resources | `mcp-tools-resources.png` | Concept clarification  |
| Expense Tracker    | `mcp-expense-tracker.png` | Real-world example     |
| USB-C Analogy      | `mcp-usbc-analogy.png`    | Intuitive explanation  |
| Communication      | (Sequence)                | Deep technical dive    |
