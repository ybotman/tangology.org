"use client";

import Link from "next/link";
import { colors, fonts } from "@/lib/theme";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Timeline", href: "/timeline" },
  { label: "Glossary", href: "/glossary" },
  { label: "People", href: "/people" },
  { label: "Orchestras", href: "/orchestras" },
  { label: "Contribute", href: "/about#process" },
];

/**
 * Footer - Site footer with links, founder info, and AI transparency notice
 * @param {string} locale - Current locale (en/es)
 */
export function Footer({ locale = "en" }) {
  const getLocalizedHref = (href) => `/${locale}${href}`;

  return (
    <footer
      className="py-12 sm:py-16 px-4 sm:px-6"
      style={{
        backgroundColor: colors.bg.footer,
        borderTop: `1px solid ${colors.overlay.goldSubtle}`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="mb-2"
          style={{
            fontFamily: fonts.serif,
            color: colors.accent.gold,
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          TANGOLOGY
        </p>
        <p
          className="mb-6"
          style={{
            fontFamily: fonts.sans,
            color: colors.text.muted,
            fontSize: "0.88rem",
            lineHeight: 1.6,
          }}
        >
          The open study of Argentine tango — history, music, people, culture
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={getLocalizedHref(link.href)}
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: fonts.sans,
                color: colors.text.muted,
                fontSize: "0.82rem",
              }}
              onMouseEnter={(e) => (e.target.style.color = colors.accent.gold)}
              onMouseLeave={(e) => (e.target.style.color = colors.text.muted)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div
          className="mb-6"
          style={{ borderTop: `1px solid ${colors.overlay.goldSubtle}`, paddingTop: "1.5rem" }}
        >
          <p
            style={{
              fontFamily: fonts.sans,
              color: colors.text.dark,
              fontSize: "0.8rem",
              lineHeight: 1.6,
            }}
          >
            Founded by{" "}
            <Link
              href={getLocalizedHref("/about")}
              className="no-underline transition-colors duration-200"
              style={{ color: colors.text.muted }}
              onMouseEnter={(e) => (e.target.style.color = colors.accent.gold)}
              onMouseLeave={(e) => (e.target.style.color = colors.text.muted)}
            >
              Toby Balsley
            </Link>{" "}
            ·{" "}
            <a
              href="https://hdtsllc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-200"
              style={{ color: colors.text.muted }}
              onMouseEnter={(e) => (e.target.style.color = colors.accent.gold)}
              onMouseLeave={(e) => (e.target.style.color = colors.text.muted)}
            >
              HDTS LLC
            </a>
          </p>
          <p
            style={{
              fontFamily: fonts.sans,
              color: colors.text.darkest,
              fontSize: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              AI-assisted research · Human-curated ·{" "}
              <Link
                href={getLocalizedHref("/about#process")}
                className="no-underline"
                style={{ color: colors.text.dark }}
                onMouseEnter={(e) => (e.target.style.color = colors.accent.gold)}
                onMouseLeave={(e) => (e.target.style.color = colors.text.dark)}
              >
                Learn how we build content
              </Link>
            </span>
          </p>
        </div>

        <p
          className="mb-6"
          style={{
            fontFamily: fonts.serif,
            color: colors.text.darkest,
            fontSize: "0.85rem",
            fontStyle: "italic",
            maxWidth: "28rem",
            margin: "0 auto 1.5rem",
            lineHeight: 1.6,
          }}
        >
          "Tango is a sad thought that is danced."
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: "0.75rem",
              display: "block",
              marginTop: "0.25rem",
            }}
          >
            — Enrique Santos Discépolo
          </span>
        </p>

        <p
          style={{
            fontFamily: fonts.sans,
            color: colors.text.subtle,
            fontSize: "0.72rem",
          }}
        >
          © 2026 Tangology.org
        </p>
      </div>
    </footer>
  );
}
