"use client";

import { useState } from "react";
import { fonts, colors, overlay } from "@/lib/theme";

/**
 * LanguageSwitcher - Dropdown to switch between en/es locales
 */
export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  // Get current locale from URL
  const currentLocale =
    typeof window !== "undefined"
      ? window.location.pathname.startsWith("/es")
        ? "es"
        : "en"
      : "en";
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/^\/(en|es)/, "") || "/"
      : "/";

  const switchLocale = (locale) => {
    const newPath = locale === "en" ? `/en${currentPath}` : `/${locale}${currentPath}`;
    window.location.href = newPath;
  };

  return (
    <div className="relative ml-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200"
        style={{
          fontFamily: fonts.sans,
          color: colors.text.mid,
          fontSize: "0.8rem",
          fontWeight: 500,
          border: `1px solid ${colors.overlay.goldBorderMedium}`,
          backgroundColor: isOpen ? colors.overlay.goldMedium : "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.overlay.goldBorderActive;
        }}
        onMouseLeave={(e) => {
          if (!isOpen)
            e.currentTarget.style.borderColor = colors.overlay.goldBorderMedium;
        }}
      >
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {currentLocale.toUpperCase()}
        <svg
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 py-1 rounded shadow-lg z-50"
          style={{
            backgroundColor: colors.bg.card,
            border: `1px solid ${colors.overlay.goldBorderStrong}`,
            minWidth: "80px",
          }}
        >
          <button
            onClick={() => switchLocale("en")}
            className="w-full px-3 py-1.5 text-left transition-colors duration-200"
            style={{
              fontFamily: fonts.sans,
              fontSize: "0.8rem",
              color: currentLocale === "en" ? colors.accent.gold : colors.text.mid,
              backgroundColor:
                currentLocale === "en" ? colors.overlay.goldMedium : "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.overlay.goldBorderMedium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                currentLocale === "en" ? colors.overlay.goldMedium : "transparent";
            }}
          >
            English
          </button>
          <button
            onClick={() => switchLocale("es")}
            className="w-full px-3 py-1.5 text-left transition-colors duration-200"
            style={{
              fontFamily: fonts.sans,
              fontSize: "0.8rem",
              color: currentLocale === "es" ? colors.accent.gold : colors.text.mid,
              backgroundColor:
                currentLocale === "es" ? colors.overlay.goldMedium : "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.overlay.goldBorderMedium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                currentLocale === "es" ? colors.overlay.goldMedium : "transparent";
            }}
          >
            Español
          </button>
        </div>
      )}
    </div>
  );
}
