"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors, fonts, globalStyles } from "@/lib/theme";

// Category display names and colors
const CATEGORIES = {
  "dance-movement": { label: "Dance Movement", color: colors.accent.gold },
  "fundamental": { label: "Fundamental", color: colors.era.epocaDeOro },
  "intermediate": { label: "Intermediate", color: colors.era.guardiaNueva },
  "advanced": { label: "Advanced", color: colors.accent.red },
  "embellishment": { label: "Embellishment", color: colors.era.decadencia },
  "connection": { label: "Connection", color: colors.era.guardiaVieja },
  "technique": { label: "Technique", color: colors.era.guardiaNueva },
  "navigation": { label: "Navigation", color: colors.text.mid },
  "milonga-culture": { label: "Milonga Culture", color: colors.accent.red },
  "codigos": { label: "Códigos", color: colors.accent.red },
  "music": { label: "Music", color: colors.era.guardiaVieja },
  "historical": { label: "Historical", color: colors.era.decadencia },
  "culture": { label: "Culture", color: colors.accent.gold },
  "roles": { label: "Roles", color: colors.text.mid },
  "event": { label: "Event", color: colors.era.guardiaNueva },
  "era": { label: "Era", color: colors.era.epocaDeOro },
  "dance-style": { label: "Dance Style", color: colors.era.guardiaVieja },
};

// Alphabet for quick navigation
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function TermCard({ term, locale }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg transition-all duration-300"
      style={{
        backgroundColor: expanded ? "#1A1714" : colors.bg.card,
        border: expanded
          ? `1px solid ${colors.overlay.goldBorderStrong}`
          : `1px solid ${colors.overlay.goldLight}`,
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3
                style={{
                  fontFamily: fonts.serif,
                  color: colors.text.light,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                }}
              >
                {term.displayName}
              </h3>
              {term.spanish && term.spanish !== term.displayName && (
                <span
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  ({term.spanish})
                </span>
              )}
            </div>
            <p
              className="mt-1 line-clamp-2"
              style={{
                fontFamily: fonts.sans,
                color: colors.text.mid,
                fontSize: "0.9rem",
              }}
            >
              {term.summary}
            </p>
          </div>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke={colors.text.muted}
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
              flexShrink: 0,
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div
          className="px-4 sm:px-5 pb-5"
          style={{ borderTop: `1px solid ${colors.overlay.goldLight}` }}
        >
          <p
            className="pt-4 mb-4"
            style={{
              fontFamily: fonts.sans,
              color: colors.text.mid,
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            {term.definition}
          </p>

          {/* Aliases */}
          {term.aliases && term.aliases.length > 0 && (
            <div className="mb-3">
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                Also known as:{" "}
              </span>
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "0.85rem",
                }}
              >
                {term.aliases.join(", ")}
              </span>
            </div>
          )}

          {/* Categories */}
          {term.categories && term.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {term.categories.map((cat) => {
                const config = CATEGORIES[cat] || { label: cat, color: colors.text.muted };
                return (
                  <span
                    key={cat}
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: colors.overlay.goldSubtle,
                      border: `1px solid ${colors.overlay.goldBorder}`,
                      fontFamily: fonts.sans,
                      color: config.color,
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    {config.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Related terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${colors.overlay.goldSubtle}` }}>
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Related:{" "}
              </span>
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.accent.gold,
                  fontSize: "0.85rem",
                }}
              >
                {term.relatedTerms.slice(0, 5).join(", ")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  const params = useParams();
  const locale = params.locale || "en";

  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Load glossary data
  useEffect(() => {
    async function loadGlossary() {
      try {
        const response = await fetch("/tango-papers/index/glossary/01-tango-terms.json");
        const data = await response.json();
        setTerms(data.entities || []);
      } catch (error) {
        console.error("Failed to load glossary:", error);
      }
      setLoading(false);
    }
    loadGlossary();
  }, []);

  // Get unique categories
  const allCategories = useMemo(() => {
    const cats = new Set();
    terms.forEach((term) => {
      term.categories?.forEach((cat) => cats.add(cat));
    });
    return Array.from(cats).sort();
  }, [terms]);

  // Filter terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          term.displayName.toLowerCase().includes(query) ||
          term.spanish?.toLowerCase().includes(query) ||
          term.summary.toLowerCase().includes(query) ||
          term.aliases?.some((a) => a.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (!term.categories?.includes(selectedCategory)) return false;
      }

      // Letter filter
      if (selectedLetter) {
        const firstLetter = term.displayName[0].toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }

      return true;
    });
  }, [terms, searchQuery, selectedCategory, selectedLetter]);

  // Group by first letter
  const groupedTerms = useMemo(() => {
    const groups = {};
    filteredTerms.forEach((term) => {
      const letter = term.displayName[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const availableLetters = Object.keys(groupedTerms).sort();

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
        <SimpleHeader locale={locale} backHref="/" backLabel="Home" />

        <main className="py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-8">
              <h1
                className="mb-2"
                style={{
                  fontFamily: fonts.serif,
                  color: colors.accent.gold,
                  fontSize: "2.25rem",
                  fontWeight: 700,
                }}
              >
                Glossary
              </h1>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1.05rem",
                }}
              >
                Essential Tango Vocabulary
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                {terms.length} terms
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div
                className="relative"
                style={{
                  border: `1px solid ${colors.overlay.goldBorderMedium}`,
                  borderRadius: "9999px",
                  backgroundColor: colors.bg.card,
                }}
              >
                <div className="flex items-center px-4 py-3">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke={colors.text.muted}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none ml-3"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.text.light,
                      fontSize: "0.95rem",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      style={{ color: colors.text.muted }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Alphabet navigation */}
            <div className="mb-6 overflow-x-auto -mx-4 px-4">
              <div className="flex gap-1 min-w-max justify-center">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-2 py-1 rounded transition-colors duration-200"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: !selectedLetter ? colors.overlay.goldMedium : "transparent",
                    color: !selectedLetter ? colors.accent.gold : colors.text.muted,
                  }}
                >
                  All
                </button>
                {ALPHABET.map((letter) => {
                  const hasTerms = availableLetters.includes(letter);
                  return (
                    <button
                      key={letter}
                      onClick={() => hasTerms && setSelectedLetter(letter)}
                      disabled={!hasTerms}
                      className="px-2 py-1 rounded transition-colors duration-200"
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: selectedLetter === letter ? colors.overlay.goldMedium : "transparent",
                        color: selectedLetter === letter
                          ? colors.accent.gold
                          : hasTerms
                          ? colors.text.muted
                          : colors.text.darkest,
                        cursor: hasTerms ? "pointer" : "default",
                        opacity: hasTerms ? 1 : 0.4,
                      }}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category filters */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-3 py-1.5 rounded-full text-sm transition-all duration-200"
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  backgroundColor: selectedCategory === "all" ? colors.overlay.goldMedium : "transparent",
                  color: selectedCategory === "all" ? colors.accent.gold : colors.text.muted,
                  border: selectedCategory === "all"
                    ? `1px solid ${colors.overlay.goldBorderActive}`
                    : `1px solid ${colors.overlay.goldBorder}`,
                }}
              >
                All
              </button>
              {allCategories.slice(0, 8).map((cat) => {
                const config = CATEGORIES[cat] || { label: cat };
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3 py-1.5 rounded-full text-sm transition-all duration-200"
                    style={{
                      fontFamily: fonts.sans,
                      fontWeight: 500,
                      backgroundColor: selectedCategory === cat ? colors.overlay.goldMedium : "transparent",
                      color: selectedCategory === cat ? colors.accent.gold : colors.text.muted,
                      border: selectedCategory === cat
                        ? `1px solid ${colors.overlay.goldBorderActive}`
                        : `1px solid ${colors.overlay.goldBorder}`,
                    }}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            <div
              className="text-center mb-6 pb-4"
              style={{ borderBottom: `1px solid ${colors.overlay.goldSubtle}` }}
            >
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                Showing {filteredTerms.length} of {terms.length} terms
              </span>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="text-center py-20">
                <div
                  className="inline-block w-8 h-8 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: colors.overlay.goldBorderMedium,
                    borderTopColor: colors.accent.gold,
                  }}
                />
              </div>
            )}

            {/* Terms list grouped by letter */}
            {!loading && (
              <div className="space-y-8">
                {Object.keys(groupedTerms)
                  .sort()
                  .map((letter) => (
                    <section key={letter}>
                      <h2
                        className="mb-4 pb-2"
                        style={{
                          fontFamily: fonts.serif,
                          color: colors.accent.gold,
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          borderBottom: `1px solid ${colors.overlay.goldBorderMedium}`,
                        }}
                      >
                        {letter}
                      </h2>
                      <div className="space-y-3">
                        {groupedTerms[letter].map((term) => (
                          <TermCard key={term.id} term={term} locale={locale} />
                        ))}
                      </div>
                    </section>
                  ))}
              </div>
            )}

            {/* No results */}
            {!loading && filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "1rem",
                  }}
                >
                  No terms found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedLetter(null);
                  }}
                  className="mt-4 px-4 py-2 rounded-full transition-colors duration-200"
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.accent.gold,
                    backgroundColor: colors.overlay.goldLight,
                    border: `1px solid ${colors.overlay.goldBorderMedium}`,
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
