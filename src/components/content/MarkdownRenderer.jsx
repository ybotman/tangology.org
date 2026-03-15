"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { colors, fonts } from "@/lib/theme";

/**
 * MarkdownRenderer - Styled markdown rendering for paper content
 * @param {string} content - Markdown content
 */
export function MarkdownRenderer({ content }) {
  return (
    <article
      className="prose prose-invert max-w-none"
      style={{
        fontFamily: fonts.sans,
        color: colors.text.mid,
        lineHeight: 1.7,
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontFamily: fonts.serif,
                color: colors.accent.gold,
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "1rem",
                marginTop: "2rem",
                borderBottom: `1px solid ${colors.overlay.goldBorderMedium}`,
                paddingBottom: "0.5rem",
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontFamily: fonts.serif,
                color: colors.text.light,
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                marginTop: "2rem",
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontFamily: fonts.serif,
                color: colors.text.light,
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              style={{
                fontFamily: fonts.sans,
                color: colors.accent.gold,
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                marginTop: "1.25rem",
              }}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p
              style={{
                fontFamily: fonts.sans,
                color: colors.text.mid,
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              style={{
                color: colors.accent.gold,
                textDecoration: "none",
                borderBottom: `1px solid ${colors.overlay.goldBorderMedium}`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.overlay.goldBorderMedium;
              }}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong style={{ color: colors.text.light, fontWeight: 600 }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em style={{ color: colors.text.light, fontStyle: "italic" }}>
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: `3px solid ${colors.accent.gold}`,
                paddingLeft: "1.25rem",
                marginLeft: 0,
                marginRight: 0,
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
                fontStyle: "italic",
                color: colors.text.mid,
              }}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                marginBottom: "1rem",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                listStyleType: "decimal",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: colors.text.mid,
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              style={{
                marginBottom: "0.5rem",
                paddingLeft: "1.25rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  color: colors.accent.gold,
                }}
              >
                —
              </span>
              {children}
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto -mx-4 px-4 my-6">
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead
              style={{
                borderBottom: `2px solid ${colors.overlay.goldBorderStrong}`,
              }}
            >
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th
              style={{
                fontFamily: fonts.sans,
                color: colors.accent.gold,
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                textAlign: "left",
                padding: "0.75rem 1rem",
                whiteSpace: "nowrap",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                fontFamily: fonts.sans,
                color: colors.text.mid,
                padding: "0.75rem 1rem",
                borderBottom: `1px solid ${colors.overlay.goldBorder}`,
              }}
            >
              {children}
            </td>
          ),
          code: ({ inline, children }) =>
            inline ? (
              <code
                style={{
                  fontFamily: fonts.mono,
                  backgroundColor: colors.overlay.goldSubtle,
                  color: colors.accent.gold,
                  padding: "0.15rem 0.4rem",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                }}
              >
                {children}
              </code>
            ) : (
              <code
                style={{
                  fontFamily: fonts.mono,
                  display: "block",
                  backgroundColor: colors.bg.card,
                  padding: "1rem",
                  borderRadius: "8px",
                  overflowX: "auto",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  color: colors.text.mid,
                }}
              >
                {children}
              </code>
            ),
          pre: ({ children }) => (
            <pre
              style={{
                backgroundColor: colors.bg.card,
                borderRadius: "8px",
                padding: "1rem",
                overflowX: "auto",
                marginBottom: "1.5rem",
                border: `1px solid ${colors.overlay.goldBorder}`,
              }}
            >
              {children}
            </pre>
          ),
          hr: () => (
            <hr
              style={{
                border: "none",
                height: "1px",
                backgroundColor: colors.overlay.goldBorderMedium,
                margin: "2rem 0",
              }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
