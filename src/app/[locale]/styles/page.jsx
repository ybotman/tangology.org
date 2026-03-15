"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors, fonts, globalStyles } from "@/lib/theme";

// Style-specific colors
const STYLE_COLORS = {
  "villa-urquiza": colors.accent.gold,
  "milonguero": colors.accent.red,
  "nuevo": colors.era.guardiaNueva,
  "salon": colors.era.guardiaVieja,
  "fantasia": colors.era.decadencia,
  "orillero": colors.text.mid,
  "canyengue": colors.era.decadencia,
  "stage": colors.era.guardiaNueva,
};

function StyleCard({ style, locale }) {
  const [expanded, setExpanded] = useState(false);

  const styleColor = STYLE_COLORS[style.id] || colors.accent.gold;

  return (
    <div
      className="rounded-lg transition-all duration-300"
      style={{
        backgroundColor: expanded ? "#1A1714" : colors.bg.card,
        border: expanded
          ? `1px solid ${colors.overlay.goldBorderStrong}`
          : `1px solid ${colors.overlay.goldLight}`,
        borderTop: `4px solid ${styleColor}`,
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              style={{
                fontFamily: fonts.serif,
                color: colors.text.light,
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              {style.displayName}
            </h3>
            {style.aliases?.[0] && (
              <p
                className="mt-0.5"
                style={{
                  fontFamily: fonts.sans,
                  color: styleColor,
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                }}
              >
                {style.aliases[0]}
              </p>
            )}
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

        <p
          className="mt-3"
          style={{
            fontFamily: fonts.sans,
            color: colors.text.mid,
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          {style.summary}
        </p>
      </button>

      {expanded && (
        <div
          className="px-5 sm:px-6 pb-6"
          style={{ borderTop: `1px solid ${colors.overlay.goldLight}` }}
        >
          <p
            className="pt-4 mb-4"
            style={{
              fontFamily: fonts.sans,
              color: colors.text.mid,
              fontSize: "0.95rem",
              lineHeight: 1.75,
            }}
          >
            {style.definition}
          </p>

          {/* Key characteristics */}
          {style.meta?.characteristics && (
            <div className="mb-4">
              <h4
                className="mb-2"
                style={{
                  fontFamily: fonts.sans,
                  color: colors.accent.gold,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Characteristics
              </h4>
              <ul className="space-y-1.5">
                {style.meta.characteristics.map((char, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.text.mid,
                      fontSize: "0.88rem",
                    }}
                  >
                    <span style={{ color: styleColor }}>•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key practitioners */}
          {style.relatedTerms && style.relatedTerms.length > 0 && (
            <div
              className="pt-3"
              style={{ borderTop: `1px solid ${colors.overlay.goldSubtle}` }}
            >
              <span
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
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
                {style.relatedTerms.slice(0, 4).join(", ")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StylesPage() {
  const params = useParams();
  const locale = params.locale || "en";

  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load styles data
  useEffect(() => {
    async function loadStyles() {
      try {
        const response = await fetch("/tango-papers/index/glossary/05-styles.json");
        const data = await response.json();
        setStyles(data.entities || []);
      } catch (error) {
        console.error("Failed to load styles:", error);
      }
      setLoading(false);
    }
    loadStyles();
  }, []);

  // Main styles vs others
  const mainStyles = useMemo(() => {
    const mainIds = ["villa-urquiza", "milonguero", "nuevo", "salon"];
    return styles.filter((s) => mainIds.includes(s.id));
  }, [styles]);

  const otherStyles = useMemo(() => {
    const mainIds = ["villa-urquiza", "milonguero", "nuevo", "salon"];
    return styles.filter((s) => !mainIds.includes(s.id));
  }, [styles]);

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
                Styles
              </h1>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1.05rem",
                }}
              >
                From Milonguero to Nuevo — How the Dance Evolved
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                {styles.length} styles
              </p>
            </div>

            {/* Intro text */}
            <div
              className="mb-10 p-6 rounded-lg text-center"
              style={{
                backgroundColor: colors.bg.card,
                border: `1px solid ${colors.overlay.goldBorder}`,
              }}
            >
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  maxWidth: "36rem",
                  margin: "0 auto",
                }}
              >
                Tango styles are not rigid categories but fluid approaches that evolved over
                decades. Dancers often blend elements from multiple styles. What matters
                is the connection with your partner and the music.
              </p>
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

            {/* Main styles */}
            {!loading && mainStyles.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    style={{
                      fontFamily: fonts.serif,
                      color: colors.text.light,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                    }}
                  >
                    Major Styles
                  </h2>
                  <div className="flex-1 h-px" style={{ backgroundColor: colors.overlay.goldBorderMedium }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mainStyles.map((style) => (
                    <StyleCard key={style.id} style={style} locale={locale} />
                  ))}
                </div>
              </section>
            )}

            {/* Other styles */}
            {!loading && otherStyles.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    style={{
                      fontFamily: fonts.serif,
                      color: colors.text.light,
                      fontSize: "1.4rem",
                      fontWeight: 700,
                    }}
                  >
                    Other Styles & Influences
                  </h2>
                  <div className="flex-1 h-px" style={{ backgroundColor: colors.overlay.goldBorderMedium }} />
                </div>
                <div className="space-y-4">
                  {otherStyles.map((style) => (
                    <StyleCard key={style.id} style={style} locale={locale} />
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {!loading && styles.length === 0 && (
              <div className="text-center py-12">
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "1rem",
                  }}
                >
                  No styles found.
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
