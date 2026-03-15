"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { timelineCategories } from "@/app/data/tangoTimelineData";

// Timeline configuration
const TIMELINE_START = 1880;
const TIMELINE_END = 2030;
const PIXELS_PER_YEAR = 4;
const HEADER_HEIGHT = 50;

// Generate decade markers
const decades = [];
for (let year = 1880; year <= 2030; year += 10) {
  decades.push(year);
}

// Get position and height for an era
const getEraPosition = (yearStart, yearEnd) => {
  const top = (yearStart - TIMELINE_START) * PIXELS_PER_YEAR;
  const height = Math.max((yearEnd - yearStart) * PIXELS_PER_YEAR, 28);
  return { top, height };
};

const getYearPosition = (year) => {
  return (year - TIMELINE_START) * PIXELS_PER_YEAR;
};

// Calculate lanes for overlapping eras within a category
const calculateEraLanes = (eras) => {
  const laneMap = {};
  const sortedEras = [...eras].sort((a, b) => a.yearStart - b.yearStart);
  const lanes = [];

  sortedEras.forEach((era) => {
    let assignedLane = -1;
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i].endYear <= era.yearStart) {
        assignedLane = i;
        lanes[i] = { endYear: era.yearEnd, eraId: era.id };
        break;
      }
    }
    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push({ endYear: era.yearEnd, eraId: era.id });
    }
    laneMap[era.id] = { lane: assignedLane };
  });

  sortedEras.forEach((era) => {
    let maxConcurrent = 1;
    sortedEras.forEach((other) => {
      if (other.id !== era.id) {
        if (era.yearStart < other.yearEnd && era.yearEnd > other.yearStart) {
          maxConcurrent = Math.max(
            maxConcurrent,
            Math.max(laneMap[era.id].lane, laneMap[other.id].lane) + 1
          );
        }
      }
    });
    laneMap[era.id].totalLanes = maxConcurrent;
  });

  return laneMap;
};

// Pre-calculate lanes for all categories
const categoryLanes = {};
timelineCategories.forEach((category) => {
  categoryLanes[category.categoryId] = calculateEraLanes(category.eras);
});

// Display order for timeline columns
const categoryOrder = ["argentina", "orchestras", "dancers", "europe", "usa"];

// Category colors - tangology gold palette
const CATEGORY_COLORS = {
  argentina: "#8B6914",
  orchestras: "#6B4423",
  dancers: "#8B2E3B",
  europe: "#2E5B8B",
  usa: "#4A6741",
};

// Status colors - tangology style
const STATUS_CONFIG = {
  populated: { bg: "rgba(200,169,110,0.15)", border: "#C8A96E" },
  partial: { bg: "rgba(168,159,148,0.15)", border: "#A89F94" },
  placeholder: { bg: "rgba(107,101,96,0.1)", border: "#4A4540" },
};

function EraTooltip({ era, visible, position }) {
  if (!visible) return null;

  return (
    <div
      className="fixed z-50 p-4 rounded-lg shadow-xl pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        backgroundColor: "#1E1B18",
        border: "1px solid rgba(200,169,110,0.2)",
        maxWidth: 280,
        transform: "translateY(-50%)",
      }}
    >
      <h4
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#F5F0E8",
          fontSize: "1rem",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {era.title}
      </h4>
      <p
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          color: "#A89F94",
          fontSize: "0.85rem",
          fontStyle: "italic",
          marginBottom: 8,
        }}
      >
        {era.subtitle}
      </p>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#C8A96E",
          fontSize: "0.75rem",
        }}
      >
        {era.yearStart}–{era.yearEnd} ({era.yearEnd - era.yearStart} years)
      </p>
      {era.summary && era.summary[0] !== "Content coming soon" && (
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "#A89F94",
            fontSize: "0.8rem",
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {era.summary[0]}
        </p>
      )}
    </div>
  );
}

export default function TimelinePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || "en";

  const [hoveredEra, setHoveredEra] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState("visual"); // "visual" or "list"

  const timelineHeight = (TIMELINE_END - TIMELINE_START) * PIXELS_PER_YEAR;

  const handleEraClick = (categoryId, eraId) => {
    router.push(`/${locale}/papers/${categoryId}/${eraId}`);
  };

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        .timeline-scroll::-webkit-scrollbar { height: 8px; }
        .timeline-scroll::-webkit-scrollbar-track { background: #1E1B18; border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.3); border-radius: 4px; }
        .timeline-scroll::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.5); }
      `}</style>

      <div
        style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "#F5F0E8" }}
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-40"
          style={{
            backgroundColor: "rgba(13,13,13,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(200,169,110,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href={`/${locale}`}
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
            <div className="flex items-center gap-4">
              {/* View toggle */}
              <div className="flex rounded-full overflow-hidden" style={{ border: "1px solid rgba(200,169,110,0.2)" }}>
                <button
                  onClick={() => setViewMode("visual")}
                  className="px-3 py-1.5 text-xs transition-colors"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    backgroundColor: viewMode === "visual" ? "rgba(200,169,110,0.15)" : "transparent",
                    color: viewMode === "visual" ? "#C8A96E" : "#6B6560",
                  }}
                >
                  Visual
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="px-3 py-1.5 text-xs transition-colors"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    backgroundColor: viewMode === "list" ? "rgba(200,169,110,0.15)" : "transparent",
                    color: viewMode === "list" ? "#C8A96E" : "#6B6560",
                  }}
                >
                  List
                </button>
              </div>
              <Link
                href={`/${locale}`}
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
          </div>
        </header>

        <main className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-8">
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
                  fontSize: "1rem",
                }}
              >
                140 years of Argentine tango history
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.8rem" }}>
                Status:
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: STATUS_CONFIG.populated.border }}
                />
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.8rem" }}>
                  Complete
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: STATUS_CONFIG.partial.border }}
                />
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.8rem" }}>
                  Partial
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: STATUS_CONFIG.placeholder.border }}
                />
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.8rem" }}>
                  Coming Soon
                </span>
              </div>
            </div>

            {viewMode === "visual" ? (
              /* Visual Timeline */
              <div
                className="rounded-lg p-4 sm:p-6 overflow-hidden"
                style={{
                  backgroundColor: "#1A1714",
                  border: "1px solid rgba(200,169,110,0.1)",
                }}
              >
                <p
                  className="text-center mb-4"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "#6B6560",
                    fontSize: "0.8rem",
                  }}
                >
                  ← Scroll horizontally to see all timelines →
                </p>

                <div
                  className="timeline-scroll flex overflow-x-auto overflow-y-hidden"
                  style={{ maxHeight: timelineHeight + HEADER_HEIGHT + 20 }}
                >
                  {/* Year Scale Column */}
                  <div
                    className="flex-shrink-0 sticky left-0 z-20"
                    style={{
                      width: 60,
                      backgroundColor: "#1A1714",
                      borderRight: "2px solid rgba(200,169,110,0.2)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{ height: HEADER_HEIGHT }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "#C8A96E",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      >
                        YEAR
                      </span>
                    </div>
                    <div className="relative" style={{ height: timelineHeight }}>
                      {decades.map((year) => {
                        const top = getYearPosition(year);
                        const isMajor = year % 50 === 0;
                        return (
                          <div
                            key={year}
                            className="absolute right-0 left-0 flex items-center justify-end pr-1"
                            style={{ top }}
                          >
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: isMajor ? 600 : 400,
                                fontSize: isMajor ? "0.7rem" : "0.6rem",
                                color: isMajor ? "#C8A96E" : "#6B6560",
                              }}
                            >
                              {year}
                            </span>
                            <div
                              className="ml-1"
                              style={{
                                width: isMajor ? 10 : 5,
                                height: 2,
                                backgroundColor: isMajor ? "#C8A96E" : "#4A4540",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Columns */}
                  {categoryOrder
                    .map((catId) => timelineCategories.find((c) => c.categoryId === catId))
                    .filter(Boolean)
                    .map((category) => {
                      const catColor = CATEGORY_COLORS[category.categoryId] || "#8B6914";

                      return (
                        <div
                          key={category.categoryId}
                          className="flex-1"
                          style={{
                            minWidth: 140,
                            borderLeft: "1px solid rgba(200,169,110,0.1)",
                          }}
                        >
                          {/* Category header */}
                          <div
                            className="flex flex-col items-center justify-center px-2 cursor-pointer transition-opacity hover:opacity-90"
                            style={{
                              height: HEADER_HEIGHT,
                              backgroundColor: catColor,
                            }}
                            onClick={() => router.push(`/${locale}/papers/${category.categoryId}`)}
                          >
                            <span
                              style={{
                                fontFamily: "'Source Sans 3', sans-serif",
                                color: "#F5F0E8",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {category.categoryTitle.replace("Tango in ", "").replace("Tango ", "")}
                            </span>
                          </div>

                          {/* Era bands */}
                          <div className="relative" style={{ height: timelineHeight }}>
                            {/* Grid lines */}
                            {decades.map((year) => {
                              const top = getYearPosition(year);
                              return (
                                <div
                                  key={`grid-${year}`}
                                  className="absolute left-0 right-0"
                                  style={{
                                    top,
                                    height: 1,
                                    backgroundColor:
                                      year % 50 === 0
                                        ? "rgba(200,169,110,0.15)"
                                        : "rgba(200,169,110,0.05)",
                                  }}
                                />
                              );
                            })}

                            {/* Era bands */}
                            {category.eras.map((era) => {
                              const { top, height } = getEraPosition(era.yearStart, era.yearEnd);
                              const statusConfig = STATUS_CONFIG[era.status] || STATUS_CONFIG.placeholder;
                              const isHovered = hoveredEra === `${category.categoryId}-${era.id}`;

                              const laneInfo = categoryLanes[category.categoryId]?.[era.id] || {
                                lane: 0,
                                totalLanes: 1,
                              };
                              const { lane, totalLanes } = laneInfo;
                              const laneLeft = totalLanes > 1 ? `${(lane / totalLanes) * 100}%` : "3px";
                              const laneRight =
                                totalLanes > 1 ? `${((totalLanes - lane - 1) / totalLanes) * 100}%` : "3px";

                              return (
                                <div
                                  key={era.id}
                                  className="absolute rounded cursor-pointer transition-all duration-200"
                                  style={{
                                    top,
                                    left: laneLeft,
                                    right: laneRight,
                                    height,
                                    backgroundColor: isHovered ? catColor : statusConfig.bg,
                                    border: `2px solid ${isHovered ? catColor : statusConfig.border}`,
                                    zIndex: isHovered ? 10 : 1,
                                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                                    boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: "2px 6px",
                                    overflow: "hidden",
                                  }}
                                  onClick={() => handleEraClick(category.categoryId, era.id)}
                                  onMouseEnter={() =>
                                    setHoveredEra(`${category.categoryId}-${era.id}`)
                                  }
                                  onMouseLeave={() => setHoveredEra(null)}
                                >
                                  <span
                                    className="truncate"
                                    style={{
                                      fontFamily: "'Source Sans 3', sans-serif",
                                      fontWeight: 600,
                                      fontSize: height < 35 ? "0.55rem" : "0.65rem",
                                      lineHeight: 1.2,
                                      color: isHovered ? "#F5F0E8" : "#F5F0E8",
                                    }}
                                  >
                                    {era.title}
                                  </span>
                                  {height >= 45 && era.subtitle && (
                                    <span
                                      className="truncate"
                                      style={{
                                        fontFamily: "'Source Sans 3', sans-serif",
                                        fontSize: "0.5rem",
                                        fontStyle: "italic",
                                        color: isHovered ? "rgba(255,255,255,0.8)" : "#A89F94",
                                        lineHeight: 1.1,
                                      }}
                                    >
                                      {era.subtitle}
                                    </span>
                                  )}
                                  {height >= 60 && (
                                    <span
                                      className="truncate"
                                      style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "0.45rem",
                                        color: isHovered ? "rgba(255,255,255,0.7)" : "#6B6560",
                                        lineHeight: 1.1,
                                      }}
                                    >
                                      {era.yearStart}–{era.yearEnd}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-8 max-w-3xl mx-auto">
                {timelineCategories.map((category) => (
                  <div key={category.categoryId}>
                    <h2
                      className="mb-4 text-center"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#F5F0E8",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                      }}
                    >
                      {category.categoryTitle}
                    </h2>
                    <div className="space-y-2">
                      {category.eras.map((era) => {
                        const statusConfig = STATUS_CONFIG[era.status] || STATUS_CONFIG.placeholder;
                        return (
                          <div
                            key={era.id}
                            className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                            style={{
                              backgroundColor: "#1E1B18",
                              border: `1px solid ${statusConfig.border}`,
                              borderLeft: `4px solid ${CATEGORY_COLORS[category.categoryId] || "#8B6914"}`,
                            }}
                            onClick={() => handleEraClick(category.categoryId, era.id)}
                          >
                            <div className="flex items-start justify-between">
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
                                    color: "#A89F94",
                                    fontSize: "0.85rem",
                                    fontStyle: "italic",
                                  }}
                                >
                                  {era.subtitle}
                                </p>
                              </div>
                              <span
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  color: "#C8A96E",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {era.yearStart}–{era.yearEnd}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div
              className="mt-8 p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(200,169,110,0.05)",
                borderLeft: "4px solid #C8A96E",
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#C8A96E" }}>Disclaimer:</strong> This timeline was researched
                and compiled using AI assistance. Errors may exist — corrections and contributions from
                the tango community are welcome.
              </p>
            </div>
          </div>
        </main>

        {/* Tooltip */}
        {hoveredEra && (
          <EraTooltip
            era={
              timelineCategories
                .flatMap((c) => c.eras.map((e) => ({ ...e, categoryId: c.categoryId })))
                .find((e) => `${e.categoryId}-${e.id}` === hoveredEra) || {}
            }
            visible={true}
            position={tooltipPos}
          />
        )}
      </div>
    </>
  );
}
