"use client";

import { useState, useRef, useEffect, isValidElement, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

function getCodeDetails(children: React.ReactNode) {
  const child = Array.isArray(children) ? children[0] : children;
  if (!isValidElement(child)) {
    return { text: "", language: "plaintext", className: "", title: null as string | null };
  }

  const propsObject = child.props as { className?: string; "data-title"?: string; children?: React.ReactNode };
  const className = propsObject.className || "";
  const title = propsObject["data-title"] ?? null;
  const rawChildren = propsObject.children;
  const text = Array.isArray(rawChildren) ? rawChildren.join("") : String(rawChildren ?? "");

  return {
    text,
    language: extractLanguage(className),
    className,
    title,
  };
}

async function ensureMermaid() {
  if (typeof window === "undefined") return null;

  const existing = (window as typeof window & { mermaid?: any }).mermaid;
  if (existing) return existing;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Mermaid"));
    document.head.appendChild(script);
  });

  return (window as typeof window & { mermaid?: any }).mermaid ?? null;
}

type MermaidStatus = "loading" | "ready" | "error";

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mermaidStatus, setMermaidStatus] = useState<MermaidStatus>("loading");
  const [mermaidHtml, setMermaidHtml] = useState("");
  const [renderState, setRenderState] = useState<{
    html: string;
    className: string;
    title: string | null;
  }>({ html: "", className: "", title: null });
  const { html, className: codeClassName, title: codeTitle } = renderState;
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeDetails = getCodeDetails(children);
  const { text: codeText, language: lang, title: nextTitle, className: nextClassName } = codeDetails;

  useEffect(() => {
    if (lang === "mermaid") {
      setMermaidStatus("loading");
      setMermaidHtml("");

      timeoutRef.current = setTimeout(() => {
        setMermaidStatus("error");
      }, 5000);

      void ensureMermaid()
        .then((mermaid) => {
          if (!mermaid) throw new Error("Mermaid not available");
          mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
          return mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, codeText);
        })
        .then(({ svg }: { svg: string }) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setMermaidHtml(svg);
          setMermaidStatus("ready");
        })
        .catch(() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setMermaidStatus("error");
        });

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    setMermaidStatus("loading");
    setMermaidHtml("");

    void codeToHtml(codeText, {
      lang: lang as any,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        setRenderState({
          html: doc.querySelector("code")?.innerHTML ?? "",
          className: nextClassName,
          title: nextTitle,
        });
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setRenderState({ html: "", className: nextClassName, title: nextTitle });
      });
  }, [codeText, lang, nextTitle, nextClassName]);

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-border">
      {codeDetails.language === "mermaid" ? (
        <div className="relative bg-background">
          {codeTitle && (
            <div className="p-3 text-xs font-medium border-b border-border rounded-t-xl bg-muted/50 text-foreground">
              {codeTitle}
            </div>
          )}
          {mermaidStatus === "ready" ? (
            <div
              className="p-4 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: mermaidHtml }}
            />
          ) : mermaidStatus === "error" ? (
            <div className="p-4 text-sm text-muted-foreground">
              Diagram unavailable
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              Loading diagram...
            </div>
          )}
        </div>
      ) : (
        <pre
          ref={preRef}
          {...props}
          className={cn("p-0! m-0! overflow-x-auto", props.className)}
        >
          {codeTitle && (
            <div className="p-3 text-xs font-medium border-b border-border rounded-t-xl bg-muted/50 text-foreground">
              {codeTitle}
            </div>
          )}

          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className={cn(
              "absolute size-8 text-primary cursor-pointer right-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity rounded-md border border-border shadow-none",
              codeTitle ? "top-13" : "top-3",
              props.className
            )}
            aria-label="Copy code"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
          {html && (
            <div className="p-3">
              <code
                className={`shiki ${codeClassName}`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          )}

          {!html && <div className="p-4">{children}</div>}
        </pre>
      )}
    </div >
  );
}

