import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/mdx/code-block";
import { stripFrontmatter } from "@/lib/article-markdown";

type MarkdownRendererProps = {
  markdown: string;
};

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const body = stripFrontmatter(markdown);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        pre: (props) => <CodeBlock {...props} />,
      }}
    >
      {body}
    </ReactMarkdown>
  );
}