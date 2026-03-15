"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { colors, fonts } from "@/lib/theme";

/**
 * EntityCard - Reusable card for people, orchestras, venues, etc.
 * @param {object} entity - Entity data
 * @param {string} entity.id - Entity ID (for links)
 * @param {string} entity.displayName - Display name
 * @param {string} entity.type - Entity type (person, orchestra, venue, etc.)
 * @param {string} entity.summary - Short description
 * @param {string} entity.status - Content status (populated, partial, placeholder)
 * @param {string[]} entity.aliases - Alternative names
 * @param {string[]} entity.categories - Categories/tags
 * @param {object} entity.meta - Additional metadata
 * @param {string} href - Link destination
 * @param {string} locale - Current locale
 * @param {boolean} showStatus - Whether to show status badge
 */
export function EntityCard({
  entity,
  href,
  locale = "en",
  showStatus = true,
}) {
  const [hovered, setHovered] = useState(false);

  const getLocalizedHref = (path) => `/${locale}${path}`;
  const linkHref = href || getLocalizedHref(`/people/${entity.id}`);

  // Extract useful display info
  const subtitle = entity.aliases?.[0] || entity.meta?.activeYears || "";
  const typeLabel = entity.type?.charAt(0).toUpperCase() + entity.type?.slice(1) || "";

  return (
    <Link
      href={linkHref}
      className="block no-underline transition-all duration-300"
      style={{
        backgroundColor: hovered ? colors.bg.cardHover : colors.bg.card,
        borderRadius: "8px",
        border: `1px solid ${colors.overlay.goldLight}`,
        borderLeft: hovered
          ? `3px solid ${colors.accent.gold}`
          : `3px solid ${colors.overlay.goldBorderStrong}`,
        padding: "1.25rem 1.5rem",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3
            className="truncate"
            style={{
              fontFamily: fonts.serif,
              color: colors.text.light,
              fontSize: "1.15rem",
              fontWeight: 700,
            }}
          >
            {entity.displayName}
          </h3>
          {subtitle && (
            <p
              style={{
                fontFamily: fonts.sans,
                color: colors.accent.gold,
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {typeLabel && (
            <span
              style={{
                fontFamily: fonts.sans,
                color: colors.text.muted,
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {typeLabel}
            </span>
          )}
          {showStatus && entity.status && <StatusBadge status={entity.status === "complete" ? "populated" : entity.status} />}
        </div>
      </div>

      {entity.summary && (
        <p
          className="line-clamp-2"
          style={{
            fontFamily: fonts.sans,
            color: colors.text.mid,
            fontSize: "0.88rem",
            lineHeight: 1.5,
          }}
        >
          {entity.summary}
        </p>
      )}

      {entity.categories && entity.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entity.categories.slice(0, 3).map((cat) => (
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
    </Link>
  );
}

/**
 * EntityCardGrid - Grid layout for entity cards
 * @param {React.ReactNode} children - EntityCard components
 */
export function EntityCardGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
