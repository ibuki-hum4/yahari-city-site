import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-yahari-navy prose-a:text-yahari-navy">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
