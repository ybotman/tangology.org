/**
 * Tangology Design System
 *
 * Centralized design tokens for consistent styling across all pages.
 * Used with inline styles to match existing patterns.
 */

export const colors = {
  // Backgrounds
  bg: {
    dark: "#0D0D0D",      // Page background
    card: "#1E1B18",      // Card background
    cardHover: "#2A2520", // Card hover state
    footer: "#0A0908",    // Footer background
    ribbon: "#1A1614",    // Stats ribbon
    spotlight: "#0F0D0B", // Spotlight section
  },

  // Text
  text: {
    light: "#F5F0E8",     // Headings, primary text
    mid: "#A89F94",       // Body text
    muted: "#6B6560",     // Secondary, borders
    dark: "#4A4540",      // Footer text
    darkest: "#3A3530",   // Minimal use
    subtle: "#2A2520",    // Very subtle
  },

  // Accent
  accent: {
    gold: "#C8A96E",      // Primary accent (links, highlights)
    red: "#8B2E3B",       // Decadencia era, accent
    green: "#6B8E5A",     // Guardia vieja era
    blue: "#4A90B8",      // Guardia nueva era
    brown: "#8B6E5A",     // Decadencia (muted)
  },

  // Era-specific colors
  era: {
    guardiaVieja: "#6B8E5A",
    guardiaNueva: "#4A90B8",
    epocaDeOro: "#C8A96E",
    decadencia: "#8B6E5A",
    renacimiento: "#8B2E3B",
  },

  // Overlay variations (rgba)
  overlay: {
    goldSubtle: "rgba(200,169,110,0.06)",
    goldLight: "rgba(200,169,110,0.08)",
    goldMedium: "rgba(200,169,110,0.1)",
    goldBorder: "rgba(200,169,110,0.12)",
    goldBorderMedium: "rgba(200,169,110,0.15)",
    goldBorderStrong: "rgba(200,169,110,0.2)",
    goldBorderActive: "rgba(200,169,110,0.3)",
    goldFocus: "rgba(200,169,110,0.5)",
    redSubtle: "rgba(139,46,59,0.1)",
    redBorder: "rgba(139,46,59,0.15)",
    blueSubtle: "rgba(74,144,184,0.1)",
    blueBorder: "rgba(74,144,184,0.15)",
  },
};

export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Source Sans 3', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap');`;

export const globalStyles = `
  ${fontImport}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${colors.bg.dark}; }
  input::placeholder { color: ${colors.text.muted} !important; }
  ::-webkit-scrollbar { display: none; }
`;

// Status configuration for content status badges
export const STATUS_CONFIG = {
  populated: {
    icon: "●",
    label: "Complete",
    color: colors.accent.gold,
    bgColor: colors.overlay.goldLight,
  },
  partial: {
    icon: "◐",
    label: "In Progress",
    color: colors.text.mid,
    bgColor: "rgba(168,159,148,0.08)",
  },
  placeholder: {
    icon: "○",
    label: "Coming Soon",
    color: colors.text.muted,
    bgColor: "rgba(107,101,96,0.08)",
  },
};
