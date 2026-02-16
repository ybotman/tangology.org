"use client";

import { useState } from "react";
import Link from "next/link";
import { timelineCategories } from "@/app/data/tangoTimelineData";

// Elegant status indicators - no bright colors
const STATUS_CONFIG = {
  populated: {
    icon: "●",
    label: "Complete",
    color: "#C8A96E",
    bgColor: "rgba(200,169,110,0.08)"
  },
  partial: {
    icon: "◐",
    label: "In Progress",
    color: "#A89F94",
    bgColor: "rgba(168,159,148,0.08)"
  },
  placeholder: {
    icon: "○",
    label: "Coming Soon",
    color: "#6B6560",
    bgColor: "rgba(107,101,96,0.08)"
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.placeholder;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: config.bgColor,
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 500,
        color: config.color,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ fontSize: "0.6rem" }}>{config.icon}</span>
      {config.label}
    </span>
  );
}

function EraCard({ era }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: expanded ? "#1A1714" : "#1E1B18",
        border: expanded ? "1px solid rgba(200,169,110,0.2)" : "1px solid rgba(200,169,110,0.08)",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header - always visible */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          {/* Title block - centered on mobile */}
          <div className="text-center sm:text-left">
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#F5F0E8",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              {era.title}
            </h3>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "#A89F94",
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              {era.subtitle}
            </p>
          </div>

          {/* Meta info - centered on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#C8A96E",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              {era.yearStart}–{era.yearEnd}
            </span>
            <StatusBadge status={era.status} />
          </div>
        </div>

        {/* Expand hint */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-4">
          <svg
            width="14"
            height="14"
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
              fontSize: "0.8rem",
            }}
          >
            {expanded ? "Hide details" : "View details"}
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-5 sm:px-6 pb-6"
          style={{ borderTop: "1px solid rgba(200,169,110,0.08)" }}
        >
          {/* Summary */}
          {era.summary && era.summary.length > 0 && (
            <div className="pt-5 mb-5">
              <h4
                className="mb-3 text-center sm:text-left"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#C8A96E",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Overview
              </h4>
              <ul className="space-y-2.5">
                {era.summary.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: "#A89F94",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#C8A96E", flexShrink: 0 }}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Figures */}
          {era.keyFigures && era.keyFigures.length > 0 && (
            <div className="mb-5">
              <h4
                className="mb-3 text-center sm:text-left"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#C8A96E",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Key Figures
              </h4>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {era.keyFigures.map((figure, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor: "rgba(200,169,110,0.06)",
                      border: "1px solid rgba(200,169,110,0.12)",
                      fontFamily: "'Source Sans 3', sans-serif",
                      color: "#F5F0E8",
                      fontSize: "0.85rem",
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
            <div
              className="pt-4 text-center sm:text-left"
              style={{ borderTop: "1px solid rgba(200,169,110,0.06)" }}
            >
              <a
                href={era.paperPath}
                className="inline-flex items-center gap-2 no-underline transition-all duration-200 px-4 py-2 rounded-full"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#C8A96E",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  backgroundColor: "rgba(200,169,110,0.08)",
                  border: "1px solid rgba(200,169,110,0.15)",
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.15)";
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.08)";
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.15)";
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Read Full Paper
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({ category }) {
  return (
    <section className="mb-14">
      {/* Category header - centered */}
      <div className="text-center mb-6">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#F5F0E8",
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.25rem",
          }}
        >
          {category.categoryTitle}
        </h2>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "#6B6560",
            fontSize: "0.9rem",
          }}
        >
          {category.categorySubtitle}
        </p>
        <div
          className="mx-auto mt-3"
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "rgba(200,169,110,0.3)",
          }}
        />
      </div>

      {/* Era cards */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {category.eras.map((era) => (
          <EraCard key={era.id} era={era} />
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
            borderBottom: "1px solid rgba(200,169,110,0.1)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href="/"
              className="no-underline"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#C8A96E",
                letterSpacing: "0.15em",
                fontSize: "0.95rem",
                fontWeight: 700,
              }}
            >
              TANGOLOGY
            </Link>
            <Link
              href="/"
              className="no-underline flex items-center gap-1.5"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "#A89F94",
                fontSize: "0.85rem",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Home
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page title - centered */}
            <div className="text-center mb-10">
              <h1
                className="mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#C8A96E",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                }}
              >
                Timeline
              </h1>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "1.05rem",
                }}
              >
                140 years of Argentine tango history
              </p>
            </div>

            {/* Filter tabs - centered, mobile-friendly */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveFilter("all")}
                className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 500,
                  backgroundColor: activeFilter === "all" ? "rgba(200,169,110,0.12)" : "transparent",
                  color: activeFilter === "all" ? "#C8A96E" : "#6B6560",
                  border: activeFilter === "all" ? "1px solid rgba(200,169,110,0.25)" : "1px solid rgba(200,169,110,0.1)",
                }}
              >
                All Eras
              </button>
              {timelineCategories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => setActiveFilter(cat.categoryId)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 500,
                    backgroundColor: activeFilter === cat.categoryId ? "rgba(200,169,110,0.12)" : "transparent",
                    color: activeFilter === cat.categoryId ? "#C8A96E" : "#6B6560",
                    border: activeFilter === cat.categoryId ? "1px solid rgba(200,169,110,0.25)" : "1px solid rgba(200,169,110,0.1)",
                  }}
                >
                  {cat.categoryTitle.replace("Tango ", "").replace("Dancers & Couples", "Dancers")}
                </button>
              ))}
            </div>

            {/* Status legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 pb-6" style={{ borderBottom: "1px solid rgba(200,169,110,0.08)" }}>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <span style={{ color: config.color, fontSize: "0.7rem" }}>{config.icon}</span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.8rem" }}>
                    {config.label}
                  </span>
                </div>
              ))}
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
