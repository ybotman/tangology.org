"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { loadPaper } from "@/lib/papers/loadPaper";
import { colors, fonts, globalStyles } from "@/lib/theme";

/**
 * Dynamic paper page - renders markdown papers from /public/tango-papers/
 * Route: /[locale]/papers/[category]/[slug]
 * Example: /en/papers/argentina/epoca-de-oro
 */
export default function PaperPage() {
  const params = useParams();
  const locale = params.locale || "en";
  const slugParts = params.slug || [];

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse slug: /papers/argentina/epoca-de-oro -> category: argentina, slug: epoca-de-oro
  const category = slugParts[0] || "";
  const paperSlug = slugParts.slice(1).join("/") || "";

  useEffect(() => {
    async function fetchPaper() {
      if (!category || !paperSlug) {
        setError("Invalid paper path");
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await loadPaper(category, paperSlug);

      if (result.error) {
        setError(result.error);
      } else {
        setPaper(result);
      }
      setLoading(false);
    }

    fetchPaper();
  }, [category, paperSlug]);

  // Extract title from frontmatter or first heading
  const title = paper?.frontmatter?.title ||
                paper?.frontmatter?.name ||
                paperSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const status = paper?.frontmatter?.status || "partial";

  // Determine back link based on category
  const getBackLink = () => {
    const categoryMap = {
      argentina: { href: "/timeline", label: "Timeline" },
      dancers: { href: "/timeline", label: "Timeline" },
      europe: { href: "/timeline", label: "Timeline" },
      usa: { href: "/timeline", label: "Timeline" },
      orchestras: { href: "/orchestras", label: "Orchestras" },
      people: { href: "/people", label: "People" },
      events: { href: "/timeline", label: "Timeline" },
      glossary: { href: "/glossary", label: "Glossary" },
    };
    return categoryMap[category] || { href: "/", label: "Home" };
  };

  const backLink = getBackLink();

  return (
    <>
      <style>{globalStyles}</style>
      <div
        style={{
          backgroundColor: colors.bg.dark,
          minHeight: "100vh",
          color: colors.text.light,
        }}
      >
        <SimpleHeader locale={locale} backHref={backLink.href} backLabel={backLink.label} />

        <main className="py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {loading && (
              <div className="text-center py-20">
                <div
                  className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: colors.overlay.goldBorderMedium,
                    borderTopColor: colors.accent.gold,
                  }}
                />
                <p
                  className="mt-4"
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                  }}
                >
                  Loading paper...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: colors.overlay.goldLight }}
                >
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke={colors.text.muted}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h1
                  style={{
                    fontFamily: fonts.serif,
                    color: colors.text.light,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  Paper Not Found
                </h1>
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    marginBottom: "1.5rem",
                  }}
                >
                  {error}
                </p>
                <Link
                  href={`/${locale}${backLink.href}`}
                  className="inline-flex items-center gap-2 no-underline px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.accent.gold,
                    backgroundColor: colors.overlay.goldLight,
                    border: `1px solid ${colors.overlay.goldBorderMedium}`,
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to {backLink.label}
                </Link>
              </div>
            )}

            {paper && !error && (
              <>
                {/* Paper header */}
                <header className="mb-8 pb-6" style={{ borderBottom: `1px solid ${colors.overlay.goldBorder}` }}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: colors.overlay.goldSubtle,
                        fontFamily: fonts.sans,
                        color: colors.text.muted,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {category}
                    </span>
                    <StatusBadge status={status === "complete" ? "populated" : status} />
                  </div>

                  <h1
                    style={{
                      fontFamily: fonts.serif,
                      color: colors.accent.gold,
                      fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {title}
                  </h1>

                  {paper.frontmatter?.aliases && paper.frontmatter.aliases.length > 0 && (
                    <p
                      style={{
                        fontFamily: fonts.sans,
                        color: colors.text.mid,
                        fontSize: "1.1rem",
                        fontStyle: "italic",
                      }}
                    >
                      "{paper.frontmatter.aliases[0]}"
                    </p>
                  )}

                  {/* Meta info */}
                  {(paper.frontmatter?.born || paper.frontmatter?.activeYears) && (
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: fonts.mono,
                        color: colors.text.muted,
                        fontSize: "0.85rem",
                      }}
                    >
                      {paper.frontmatter.born && paper.frontmatter.died
                        ? `${paper.frontmatter.born} – ${paper.frontmatter.died}`
                        : paper.frontmatter.activeYears}
                    </p>
                  )}

                  {/* Tags */}
                  {paper.frontmatter?.tags && paper.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {paper.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: colors.overlay.goldSubtle,
                            border: `1px solid ${colors.overlay.goldBorder}`,
                            fontFamily: fonts.sans,
                            color: colors.text.muted,
                            fontSize: "0.75rem",
                          }}
                        >
                          {tag.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                {/* Paper content */}
                <MarkdownRenderer content={paper.content} />

                {/* Footer navigation */}
                <footer
                  className="mt-12 pt-6 flex justify-between items-center"
                  style={{ borderTop: `1px solid ${colors.overlay.goldBorder}` }}
                >
                  <Link
                    href={`/${locale}${backLink.href}`}
                    className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.text.muted,
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent.gold)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.muted)}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to {backLink.label}
                  </Link>

                  <a
                    href={paper.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.text.muted,
                      fontSize: "0.85rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent.gold)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.muted)}
                  >
                    View source
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </footer>
              </>
            )}
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
