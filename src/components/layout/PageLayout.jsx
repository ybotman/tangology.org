"use client";

import { useState, useEffect } from "react";
import { Header, SimpleHeader } from "./Header";
import { Footer } from "./Footer";
import { colors, globalStyles } from "@/lib/theme";

/**
 * PageLayout - Shared wrapper with header, footer, and consistent styling
 * @param {React.ReactNode} children - Page content
 * @param {string} locale - Current locale (en/es)
 * @param {boolean} simpleHeader - Use minimal header (for inner pages)
 * @param {string} backHref - Where back link goes (if simpleHeader)
 * @param {string} backLabel - Back link text (if simpleHeader)
 */
export function PageLayout({
  children,
  locale = "en",
  simpleHeader = false,
  backHref = "/",
  backLabel = "Home",
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {simpleHeader ? (
          <SimpleHeader locale={locale} backHref={backHref} backLabel={backLabel} />
        ) : (
          <Header
            scrolled={scrolled}
            onMenuToggle={() => setMenuOpen(!menuOpen)}
            menuOpen={menuOpen}
            locale={locale}
          />
        )}
        <main>{children}</main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
