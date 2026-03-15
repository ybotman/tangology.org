"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { colors, fonts } from "@/lib/theme";

const NAV_LINKS = [
  { label: "Timeline", href: "/timeline" },
  { label: "Glossary", href: "/glossary" },
  { label: "Orchestras", href: "/orchestras" },
  { label: "People", href: "/people" },
  { label: "Styles", href: "/styles" },
  { label: "Venues", href: "/venues" },
];

/**
 * Header - Sticky navigation with logo, nav links, and language switcher
 * @param {boolean} scrolled - Whether page has scrolled past threshold
 * @param {function} onMenuToggle - Toggle mobile menu
 * @param {boolean} menuOpen - Mobile menu state
 * @param {string} locale - Current locale (en/es)
 * @param {function} onSearchClick - Open search modal
 */
export function Header({ scrolled = false, onMenuToggle, menuOpen = false, locale = "en", onSearchClick }) {
  const getLocalizedHref = (href) => `/${locale}${href}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${colors.overlay.goldBorder}`
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link href={getLocalizedHref("/")} className="flex items-center gap-1.5 no-underline">
          <span
            style={{
              fontFamily: fonts.serif,
              color: colors.accent.gold,
              letterSpacing: "0.18em",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
            TANGOLOGY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={getLocalizedHref(link.href)}
              className="no-underline text-sm transition-colors duration-200"
              style={{
                fontFamily: fonts.sans,
                color: colors.text.mid,
                fontWeight: 400,
              }}
              onMouseEnter={(e) => (e.target.style.color = colors.text.light)}
              onMouseLeave={(e) => (e.target.style.color = colors.text.mid)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="ml-2 p-1.5 rounded-full transition-colors duration-200 flex items-center gap-1.5"
            style={{ color: colors.text.mid }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent.gold)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.mid)}
            onClick={onSearchClick}
            aria-label="Search (Cmd+K)"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <kbd
              className="hidden lg:inline-block px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: colors.overlay.goldSubtle,
                color: colors.text.muted,
                fontFamily: fonts.mono,
                fontSize: "0.65rem",
              }}
            >
              ⌘K
            </kbd>
          </button>
          <LanguageSwitcher />
        </nav>

        <button
          className="md:hidden p-2"
          onClick={onMenuToggle}
          style={{ color: colors.text.mid }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "rgba(13,13,13,0.97)",
            borderColor: colors.overlay.goldMedium,
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={getLocalizedHref(link.href)}
                className="no-underline py-1"
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1rem",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * SimpleHeader - Minimal header for inner pages with back link
 * @param {string} locale - Current locale
 * @param {string} backHref - Where back link goes (default: home)
 * @param {string} backLabel - Back link text
 */
export function SimpleHeader({ locale = "en", backHref = "/", backLabel = "Home" }) {
  const getLocalizedHref = (href) => `/${locale}${href}`;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(13,13,13,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${colors.overlay.goldMedium}`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href={getLocalizedHref("/")}
          className="no-underline"
          style={{
            fontFamily: fonts.serif,
            color: colors.accent.gold,
            letterSpacing: "0.15em",
            fontSize: "0.95rem",
            fontWeight: 700,
          }}
        >
          TANGOLOGY
        </Link>
        <Link
          href={getLocalizedHref(backHref)}
          className="no-underline flex items-center gap-1.5"
          style={{
            fontFamily: fonts.sans,
            color: colors.text.mid,
            fontSize: "0.85rem",
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {backLabel}
        </Link>
      </div>
    </header>
  );
}
