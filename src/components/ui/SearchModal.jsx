"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/lib/search/useSearch";
import { getTypeIcon, getTypeLabel } from "@/lib/search/buildIndex";
import { colors, fonts } from "@/lib/theme";

/**
 * SearchModal - Global search modal with Cmd+K activation
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Close handler
 * @param {string} locale - Current locale
 */
export function SearchModal({ isOpen, onClose, locale = "en" }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    query,
    setQuery,
    results,
    loading,
    selectedType,
    setSelectedType,
    availableTypes,
    totalCount,
  } = useSearch();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen, setQuery]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedEl = resultsRef.current.children[selectedIndex];
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, results.length]);

  const navigateToResult = (result) => {
    const href = `/${locale}${result.href}`;
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 rounded-xl shadow-2xl"
        style={{
          backgroundColor: colors.bg.card,
          border: `1px solid ${colors.overlay.goldBorderMedium}`,
          maxHeight: "70vh",
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-4"
          style={{ borderBottom: `1px solid ${colors.overlay.goldBorder}` }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke={colors.text.muted}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${totalCount} entries...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none"
            style={{
              fontFamily: fonts.sans,
              color: colors.text.light,
              fontSize: "1rem",
            }}
          />
          <kbd
            className="px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: colors.overlay.goldSubtle,
              color: colors.text.muted,
              fontFamily: fonts.mono,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Type filters */}
        <div
          className="flex gap-2 px-4 py-2 overflow-x-auto"
          style={{ borderBottom: `1px solid ${colors.overlay.goldSubtle}` }}
        >
          <button
            onClick={() => setSelectedType("all")}
            className="px-2.5 py-1 rounded-full text-xs transition-colors whitespace-nowrap"
            style={{
              fontFamily: fonts.sans,
              backgroundColor:
                selectedType === "all" ? colors.overlay.goldMedium : "transparent",
              color: selectedType === "all" ? colors.accent.gold : colors.text.muted,
            }}
          >
            All
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className="px-2.5 py-1 rounded-full text-xs transition-colors whitespace-nowrap capitalize"
              style={{
                fontFamily: fonts.sans,
                backgroundColor:
                  selectedType === type ? colors.overlay.goldMedium : "transparent",
                color: selectedType === type ? colors.accent.gold : colors.text.muted,
              }}
            >
              {getTypeLabel(type)}s
            </button>
          ))}
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className="overflow-y-auto"
          style={{ maxHeight: "calc(70vh - 120px)" }}
        >
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div
                className="w-6 h-6 border-2 rounded-full animate-spin"
                style={{
                  borderColor: colors.overlay.goldBorderMedium,
                  borderTopColor: colors.accent.gold,
                }}
              />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center">
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.9rem",
                }}
              >
                No results found for "{query}"
              </p>
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center">
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.muted,
                  fontSize: "0.9rem",
                }}
              >
                Start typing to search...
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.darkest,
                  fontSize: "0.8rem",
                }}
              >
                Search orchestras, terms, people, venues, styles, and eras
              </p>
            </div>
          )}

          {!loading &&
            results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => navigateToResult(result)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors"
                style={{
                  backgroundColor:
                    index === selectedIndex
                      ? colors.overlay.goldLight
                      : "transparent",
                  borderBottom: `1px solid ${colors.overlay.goldSubtle}`,
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {getTypeIcon(result.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="truncate"
                      style={{
                        fontFamily: fonts.sans,
                        color: colors.text.light,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      {result.title}
                    </span>
                    {result.subtitle && (
                      <span
                        className="truncate"
                        style={{
                          fontFamily: fonts.sans,
                          color: colors.accent.gold,
                          fontSize: "0.8rem",
                          fontStyle: "italic",
                        }}
                      >
                        {result.subtitle}
                      </span>
                    )}
                  </div>
                  {result.description && (
                    <p
                      className="truncate mt-0.5"
                      style={{
                        fontFamily: fonts.sans,
                        color: colors.text.muted,
                        fontSize: "0.8rem",
                      }}
                    >
                      {result.description}
                    </p>
                  )}
                </div>
                <span
                  className="flex-shrink-0 px-2 py-0.5 rounded text-xs uppercase"
                  style={{
                    backgroundColor: colors.overlay.goldSubtle,
                    color: colors.text.muted,
                    fontFamily: fonts.sans,
                    fontWeight: 500,
                  }}
                >
                  {getTypeLabel(result.type)}
                </span>
              </button>
            ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            borderTop: `1px solid ${colors.overlay.goldBorder}`,
            backgroundColor: colors.overlay.goldSubtle,
          }}
        >
          <div className="flex items-center gap-3 text-xs" style={{ color: colors.text.muted }}>
            <span className="flex items-center gap-1">
              <kbd
                className="px-1.5 py-0.5 rounded"
                style={{ backgroundColor: colors.bg.card, fontFamily: fonts.mono }}
              >
                ↑
              </kbd>
              <kbd
                className="px-1.5 py-0.5 rounded"
                style={{ backgroundColor: colors.bg.card, fontFamily: fonts.mono }}
              >
                ↓
              </kbd>
              <span style={{ fontFamily: fonts.sans }}>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd
                className="px-1.5 py-0.5 rounded"
                style={{ backgroundColor: colors.bg.card, fontFamily: fonts.mono }}
              >
                ↵
              </kbd>
              <span style={{ fontFamily: fonts.sans }}>select</span>
            </span>
          </div>
          <span
            style={{
              fontFamily: fonts.sans,
              color: colors.text.darkest,
              fontSize: "0.75rem",
            }}
          >
            Powered by Fuse.js
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * Hook to handle Cmd+K keyboard shortcut
 * @param {function} onOpen - Handler when shortcut is pressed
 */
export function useSearchShortcut(onOpen) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}
