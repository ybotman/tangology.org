"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors, fonts, globalStyles } from "@/lib/theme";

// Big Four orchestras - special highlight
const BIG_FOUR = ["juan-darienzo", "carlos-di-sarli", "anibal-troilo", "osvaldo-pugliese"];

// Category labels
const CATEGORIES = {
  "big-four": { label: "The Big Four", color: colors.accent.gold },
  "epoca-de-oro": { label: "Golden Age", color: colors.era.epocaDeOro },
  "guardia-vieja": { label: "Old Guard", color: colors.era.guardiaVieja },
  "guardia-nueva": { label: "New Guard", color: colors.era.guardiaNueva },
  "post-golden": { label: "Post-Golden", color: colors.era.decadencia },
  "revival": { label: "Revival", color: colors.accent.red },
};

function OrchestraCard({ orchestra, locale, featured = false }) {
  const [hovered, setHovered] = useState(false);

  const isBigFour = orchestra.categories?.includes("big-four");

  return (
    <Link
      href={`/${locale}/papers/people/${orchestra.id}`}
      className="block no-underline transition-all duration-300"
      style={{
        backgroundColor: hovered ? colors.bg.cardHover : colors.bg.card,
        borderRadius: "10px",
        border: isBigFour
          ? `2px solid ${colors.accent.gold}`
          : `1px solid ${colors.overlay.goldLight}`,
        padding: featured ? "1.5rem 1.75rem" : "1.25rem 1.5rem",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.35)"
          : isBigFour
          ? "0 4px 16px rgba(200,169,110,0.15)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              style={{
                fontFamily: fonts.serif,
                color: colors.text.light,
                fontSize: featured ? "1.35rem" : "1.15rem",
                fontWeight: 700,
              }}
            >
              {orchestra.displayName}
            </h3>
            {isBigFour && (
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: colors.overlay.goldMedium,
                  fontFamily: fonts.sans,
                  color: colors.accent.gold,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Big Four
              </span>
            )}
          </div>
          {orchestra.aliases?.[0] && (
            <p
              className="mt-0.5"
              style={{
                fontFamily: fonts.sans,
                color: colors.accent.gold,
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              "{orchestra.aliases[0]}"
            </p>
          )}
        </div>
        {orchestra.status && (
          <StatusBadge status={orchestra.status === "complete" ? "populated" : "partial"} />
        )}
      </div>

      <p
        className="mb-3"
        style={{
          fontFamily: fonts.sans,
          color: colors.text.mid,
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        {orchestra.summary}
      </p>

      {/* Meta info */}
      {orchestra.meta && (
        <div
          className="pt-3 mt-3"
          style={{ borderTop: `1px solid ${colors.overlay.goldSubtle}` }}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            {orchestra.meta.activeYears && (
              <div>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  Active
                </span>
                <p
                  style={{
                    fontFamily: fonts.mono,
                    color: colors.text.mid,
                    fontSize: "0.8rem",
                  }}
                >
                  {orchestra.meta.activeYears}
                </p>
              </div>
            )}
            {orchestra.meta.instrument && (
              <div>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  Instrument
                </span>
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.mid,
                    fontSize: "0.8rem",
                  }}
                >
                  {orchestra.meta.instrument}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      {orchestra.categories && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {orchestra.categories
            .filter((cat) => cat !== "orchestra" && cat !== "big-four")
            .slice(0, 2)
            .map((cat) => {
              const config = CATEGORIES[cat] || { label: cat, color: colors.text.muted };
              return (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: colors.overlay.goldSubtle,
                    border: `1px solid ${colors.overlay.goldBorder}`,
                    fontFamily: fonts.sans,
                    color: config.color,
                    fontSize: "0.72rem",
                  }}
                >
                  {config.label}
                </span>
              );
            })}
        </div>
      )}
    </Link>
  );
}

export default function OrchestrasPage() {
  const params = useParams();
  const locale = params.locale || "en";

  const [orchestras, setOrchestras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Load orchestras data
  useEffect(() => {
    async function loadOrchestras() {
      try {
        const response = await fetch("/tango-papers/index/glossary/02-orchestras.json");
        const data = await response.json();
        setOrchestras(data.entities || []);
      } catch (error) {
        console.error("Failed to load orchestras:", error);
      }
      setLoading(false);
    }
    loadOrchestras();
  }, []);

  // Separate Big Four from others
  const bigFour = useMemo(() => {
    return orchestras.filter((o) => BIG_FOUR.includes(o.id));
  }, [orchestras]);

  const otherOrchestras = useMemo(() => {
    return orchestras.filter((o) => !BIG_FOUR.includes(o.id));
  }, [orchestras]);

  // Filter orchestras
  const filteredOrchestras = useMemo(() => {
    if (selectedCategory === "all") return otherOrchestras;
    if (selectedCategory === "big-four") return bigFour;
    return otherOrchestras.filter((o) => o.categories?.includes(selectedCategory));
  }, [otherOrchestras, bigFour, selectedCategory]);

  // Get available categories
  const availableCategories = useMemo(() => {
    const cats = new Set();
    orchestras.forEach((o) => {
      o.categories?.forEach((cat) => {
        if (cat !== "orchestra") cats.add(cat);
      });
    });
    return Array.from(cats);
  }, [orchestras]);

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
          <div className="max-w-5xl mx-auto">
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
                Orchestras
              </h1>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1.05rem",
                }}
              >
                The Golden Age Ensembles That Built Tango
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                {orchestras.length} orchestras
              </p>
            </div>

            {/* Big Four featured section */}
            {selectedCategory === "all" && bigFour.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    style={{
                      fontFamily: fonts.serif,
                      color: colors.text.light,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                    }}
                  >
                    The Big Four
                  </h2>
                  <div className="flex-1 h-px" style={{ backgroundColor: colors.overlay.goldBorderMedium }} />
                </div>
                <p
                  className="mb-6"
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.mid,
                    fontSize: "0.95rem",
                    maxWidth: "48rem",
                  }}
                >
                  The four orchestras that define Golden Age tango. Their recordings dominate
                  milonga playlists worldwide: D'Arienzo's driving rhythm, Di Sarli's elegant
                  piano, Troilo's soulful bandoneón, and Pugliese's dramatic intensity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bigFour.map((orchestra) => (
                    <OrchestraCard
                      key={orchestra.id}
                      orchestra={orchestra}
                      locale={locale}
                      featured
                    />
                  ))}
                </div>
              </section>
            )}

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
              {availableCategories.map((cat) => {
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

            {/* Other orchestras section */}
            {!loading && (
              <section>
                {selectedCategory === "all" && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2
                      style={{
                        fontFamily: fonts.serif,
                        color: colors.text.light,
                        fontSize: "1.4rem",
                        fontWeight: 700,
                      }}
                    >
                      More Orchestras
                    </h2>
                    <div className="flex-1 h-px" style={{ backgroundColor: colors.overlay.goldBorderMedium }} />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredOrchestras.map((orchestra) => (
                    <OrchestraCard
                      key={orchestra.id}
                      orchestra={orchestra}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {!loading && filteredOrchestras.length === 0 && selectedCategory !== "all" && (
              <div className="text-center py-12">
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "1rem",
                  }}
                >
                  No orchestras found in this category.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
