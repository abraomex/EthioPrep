import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useLanguage } from '../../lib/i18n';

interface LessonContentProps {
  content: string;
  language?: 'en' | 'am';
  className?: string;
}

export function LessonContent({ content, language: propLang, className = '' }: LessonContentProps) {
  const { language: contextLang } = useLanguage();
  const currentLang = propLang || contextLang;

  return (
    <div
      className={`
        prose max-w-none text-text-primary leading-relaxed
        ${currentLang === 'am' ? 'font-ethiopic leading-loose' : ''}
        ${className}
      `.trim()}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy mt-8 mb-4 border-b border-border pb-2 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy mt-5 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-body text-text-secondary leading-relaxed my-3">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 text-body text-text-secondary my-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 text-body text-text-secondary my-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-5 p-4 rounded-r-card bg-brand-bg-alt/70 border-l-4 border-brand-teal text-text-secondary italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-card border border-border shadow-sm">
              <table className="w-full text-left text-body-sm divide-y divide-border">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-muted font-bold text-brand-navy">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border bg-surface">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-brand-bg/60 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-3 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="p-3 text-text-secondary">{children}</td>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-brand-navy">{children}</strong>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const isInline = !codeClassName;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-brand-bg text-brand-navy font-mono text-body-sm border border-border"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-4 p-4 rounded-card bg-brand-navy-dark text-white font-mono text-body-sm overflow-x-auto">
                <code className={codeClassName} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

