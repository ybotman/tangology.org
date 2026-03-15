"use client";

import { STATUS_CONFIG, fonts } from "@/lib/theme";

/**
 * StatusBadge - Displays content completion status
 * @param {string} status - "populated" | "partial" | "placeholder"
 */
export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.placeholder;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: config.bgColor,
        fontFamily: fonts.sans,
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
