"use client";

import { useState } from "react";
import Link from "next/link";
import { timelineCategories } from "@/app/data/tangoTimelineData";

const CATEGORY_COLORS = {
  argentina: { bg: "rgba(25, 118, 210, 0.1)", border: "#1976d2", text: "#64b5f6" },
  dancers: { bg: "rgba(156, 39, 176, 0.1)", border: "#9c27b0", text: "#ce93d8" },
  europe: { bg: "rgba(76, 175, 80, 0.1)", border: "#4caf50", text: "#81c784" },
  usa: { bg: "rgba(255, 152, 0, 0.1)", border: "#ff9800", text: "#ffb74d" },
  orchestras: { bg: "rgba(244, 67, 54, 0.1)", border: "#f44336", text: "#e57373" },
  events: { bg: "rgba(200, 169, 110, 0.1)", border: "#C8A96E", text: "#C8A96E" },
};

const STATUS_STYLES = {
  populated: { bg: "rgba(76, 175, 80, 0.2)", text: "#81c784", label: "Complete" },
  partial: { bg: "rgba(255, 193, 7, 0.2)", text: "#ffd54f", label: "Partial" },
  placeholder: { bg: "rgba(107, 101, 96, 0.2)", text: "#6B6560", label: "Coming Soon" },
};

function EraCard({ era, categoryId }) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[categoryId] || CATEGORY_COLORS.events;
  const status = STATUS_STYLES[era.status] || STATUS_STYLES.placeholder;

  return (
    <div
      className="rounded-lg transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "#1E1B18",
        border: `1px solid ${expanded ? colors.border : "rgba(200,169,110,0.1)"}`,
        borderLeft: `3px solid ${colors.border}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#F5F0E8",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              {era.title}
            </h3>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "#6B6560",
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              {era.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: status.bg,
                color: status.text,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {status.label}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: colors.text,
                fontSize: "0.75rem",
              }}
            >
              {era.yearStart}–{era.yearEnd}
            </span>
          </div>
        </div>

        {/* Expand/Collapse indicator */}
        <div className="flex items-center gap-1 mt-2">
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="#6B6560"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#6B6560",
              fontSize: "0.75rem",
            }}
          >
            {expanded ? "Hide details" : "Show details"}
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-4 pb-4 pt-2"
          style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }}
        >
          {/* Summary */}
          {era.summary && era.summary.length > 0 && (
            <div className="mb-4">
              <h4
                className="mb-2"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Summary
              </h4>
              <ul className="space-y-1.5">
                {era.summary.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: "#A89F94",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: colors.text }}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Figures */}
          {era.keyFigures && era.keyFigures.length > 0 && (
            <div>
              <h4
                className="mb-2"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Key Figures
              </h4>
              <div className="flex flex-wrap gap-2">
                {era.keyFigures.map((figure, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}33`,
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: "#F5F0E8",
                      fontSize: "0.8rem",
                    }}
                    title={figure.role}
                  >
                    {figure.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Paper link */}
          {era.paperPath && (
            <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(200,169,110,0.08)" }}>
              <a
                href={era.paperPath}
                className="inline-flex items-center gap-1.5 no-underline transition-colors duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#C8A96E",
                  fontSize: "0.85rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Read full paper
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({ category }) {
  const colors = CATEGORY_COLORS[category.categoryId] || CATEGORY_COLORS.events;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: colors.border }}
        />
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#F5F0E8",
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            {category.categoryTitle}
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#6B6560",
              fontSize: "0.85rem",
            }}
          >
            {category.categorySubtitle}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {category.eras.map((era) => (
          <EraCard key={era.id} era={era} categoryId={category.categoryId} />
        ))}
      </div>
    </section>
  );
}

export default function TimelinePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCategories =
    activeFilter === "all"
      ? timelineCategories
      : timelineCategories.filter((c) => c.categoryId === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>
      <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "#F5F0E8" }}>
        {/* Header */}
        <header
          className="sticky top-0 z-50"
          style={{
            backgroundColor: "rgba(13,13,13,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(200,169,110,0.12)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href="/"
              className="no-underline"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#C8A96E",
                letterSpacing: "0.18em",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              TANGOLOGY
            </Link>
            <Link
              href="/"
              className="no-underline flex items-center gap-1"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "#A89F94",
                fontSize: "0.85rem",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="pt-8 pb-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-8">
              <h1
                className="mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#C8A96E",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                Timeline
              </h1>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "1rem",
                }}
              >
                140 years of tango history
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveFilter("all")}
                className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  backgroundColor: activeFilter === "all" ? "rgba(200,169,110,0.15)" : "transparent",
                  color: activeFilter === "all" ? "#C8A96E" : "#6B6560",
                  border: activeFilter === "all" ? "1px solid rgba(200,169,110,0.3)" : "1px solid rgba(200,169,110,0.1)",
                }}
              >
                All
              </button>
              {timelineCategories.map((cat) => {
                const colors = CATEGORY_COLORS[cat.categoryId] || CATEGORY_COLORS.events;
                return (
                  <button
                    key={cat.categoryId}
                    onClick={() => setActiveFilter(cat.categoryId)}
                    className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      backgroundColor: activeFilter === cat.categoryId ? colors.bg : "transparent",
                      color: activeFilter === cat.categoryId ? colors.text : "#6B6560",
                      border: activeFilter === cat.categoryId ? `1px solid ${colors.border}66` : "1px solid rgba(200,169,110,0.1)",
                    }}
                  >
                    {cat.categoryTitle.replace("Tango ", "")}
                  </button>
                );
              })}
            </div>

            {/* Categories */}
            {filteredCategories.map((category) => (
              <CategorySection key={category.categoryId} category={category} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
