"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors, fonts, globalStyles } from "@/lib/theme";

// Venue type labels
const TYPES = {
  active: { label: "Active", color: colors.era.guardiaVieja },
  historic: { label: "Historic", color: colors.era.decadencia },
  closed: { label: "Closed", color: colors.text.muted },
};

function VenueCard({ venue, locale }) {
  const [hovered, setHovered] = useState(false);

  const isActive = venue.categories?.includes("active") || venue.status === "active";

  return (
    <div
      className="transition-all duration-300"
      style={{
        backgroundColor: hovered ? colors.bg.cardHover : colors.bg.card,
        borderRadius: "8px",
        border: `1px solid ${colors.overlay.goldLight}`,
        borderLeft: isActive
          ? `3px solid ${colors.era.guardiaVieja}`
          : `3px solid ${colors.text.muted}`,
        padding: "1.25rem 1.5rem",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3
          style={{
            fontFamily: fonts.serif,
            color: colors.text.light,
            fontSize: "1.15rem",
            fontWeight: 700,
          }}
        >
          {venue.displayName}
        </h3>
        <span
          className="px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor: isActive ? colors.overlay.goldSubtle : "rgba(107,101,96,0.1)",
            fontFamily: fonts.sans,
            color: isActive ? colors.era.guardiaVieja : colors.text.muted,
            fontSize: "0.7rem",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          {isActive ? "Active" : "Historic"}
        </span>
      </div>

      <p
        className="mb-2"
        style={{
          fontFamily: fonts.sans,
          color: colors.text.mid,
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        {venue.summary || venue.definition?.slice(0, 150) + "..."}
      </p>

      {venue.meta?.neighborhood && (
        <p
          className="mt-3 flex items-center gap-1.5"
          style={{
            fontFamily: fonts.sans,
            color: colors.text.muted,
            fontSize: "0.8rem",
          }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {venue.meta.neighborhood}
        </p>
      )}

      {venue.categories && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {venue.categories
            .filter((cat) => cat !== "venue" && cat !== "active" && cat !== "historic")
            .slice(0, 2)
            .map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: colors.overlay.goldSubtle,
                  border: `1px solid ${colors.overlay.goldBorder}`,
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.72rem",
                }}
              >
                {cat.replace(/-/g, " ")}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

export default function VenuesPage() {
  const params = useParams();
  const locale = params.locale || "en";

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showActive, setShowActive] = useState("all"); // all, active, historic

  // Load venues data
  useEffect(() => {
    async function loadVenues() {
      try {
        const response = await fetch("/tango-papers/index/glossary/04-venues.json");
        const data = await response.json();
        setVenues(data.entities || []);
      } catch (error) {
        console.error("Failed to load venues:", error);
      }
      setLoading(false);
    }
    loadVenues();
  }, []);

  // Filter venues
  const filteredVenues = useMemo(() => {
    if (showActive === "all") return venues;
    const isActive = showActive === "active";
    return venues.filter((v) => {
      const venueIsActive = v.categories?.includes("active") || v.status === "active";
      return isActive ? venueIsActive : !venueIsActive;
    });
  }, [venues, showActive]);

  // Group by neighborhood if available
  const groupedVenues = useMemo(() => {
    const groups = { ungrouped: [] };
    filteredVenues.forEach((venue) => {
      const neighborhood = venue.meta?.neighborhood || "Buenos Aires";
      if (!groups[neighborhood]) groups[neighborhood] = [];
      groups[neighborhood].push(venue);
    });
    return groups;
  }, [filteredVenues]);

  const neighborhoods = Object.keys(groupedVenues).filter((n) => n !== "ungrouped").sort();

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
                Venues
              </h1>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1.05rem",
                }}
              >
                Buenos Aires Milongas — Historic and Living
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                {venues.length} venues
              </p>
            </div>

            {/* Active/Historic toggle */}
            <div className="mb-8 flex justify-center gap-2">
              {["all", "active", "historic"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setShowActive(filter)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200 capitalize"
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: 500,
                    backgroundColor: showActive === filter ? colors.overlay.goldMedium : "transparent",
                    color: showActive === filter ? colors.accent.gold : colors.text.muted,
                    border: showActive === filter
                      ? `1px solid ${colors.overlay.goldBorderActive}`
                      : `1px solid ${colors.overlay.goldBorder}`,
                  }}
                >
                  {filter === "all" ? "All Venues" : filter}
                </button>
              ))}
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
                Showing {filteredVenues.length} of {venues.length} venues
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

            {/* Venues grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} locale={locale} />
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "1rem",
                  }}
                >
                  No venues found.
                </p>
              </div>
            )}

            {/* Map placeholder */}
            <div
              className="mt-12 p-8 rounded-lg text-center"
              style={{
                backgroundColor: colors.bg.card,
                border: `1px dashed ${colors.overlay.goldBorderMedium}`,
              }}
            >
              <svg
                width="48"
                height="48"
                fill="none"
                stroke={colors.text.muted}
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="mx-auto mb-4"
                style={{ opacity: 0.5 }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.95rem",
                }}
              >
                Interactive map coming soon
              </p>
            </div>
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
