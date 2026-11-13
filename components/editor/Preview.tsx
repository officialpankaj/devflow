import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

// Only let authors select a small, reviewed set of fast grammars; everything else
// (including backtracking-prone csharp/apex) renders as plain text.
const ALLOWED_LANGS = new Set([
  "text",
  "txt",
  "js",
  "jsx",
  "json",
  "html",
  "css",
  "bash",
  "shell",
  "python",
  "py",
  "go",
  "sql",
  "yaml",
  "md",
]);

const safeLang = (className?: string) => {
  const m = /language-([\w#+-]+)/.exec(className ?? "");
  const lang = (m?.[1] ?? "text").toLowerCase();
  return ALLOWED_LANGS.has(lang) ? className : undefined; // undefined -> bright treats as plain text
};

const Preview = ({ content = "" }: { content: string }) => {
  const formattedContent = content.replace(/\\(?!<)/g, "").replace(/&#x20;/g, "");

  return (
    <section className="markdown prose break-word grid">
      <MDXRemote
        source={formattedContent}
        components={{
          pre: (props) => {
            const child = props?.children;
            const className = safeLang(child?.props?.className);
            const next =
              className === undefined && child?.props
                ? { ...props, children: { ...child, props: { ...child.props, className: undefined } } }
                : props;
            return <Code {...next} lineNumbers={true} className="shadow-light-200 dark:shadow-dark-200" />;
          },
        }}
      />
    </section>
  );
};
export default Preview;
