"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SimpleHeader } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors, fonts, globalStyles } from "@/lib/theme";
import { parseFrontmatter } from "@/lib/papers/parseFrontmatter";

// Type labels and colors
const TYPES = {
  dancer: { label: "Dancer", color: colors.accent.gold },
  musician: { label: "Musician", color: colors.era.guardiaVieja },
  singer: { label: "Singer", color: colors.era.guardiaNueva },
  composer: { label: "Composer", color: colors.era.decadencia },
  orchestra: { label: "Orchestra Leader", color: colors.accent.red },
  teacher: { label: "Teacher", color: colors.text.mid },
};

// Era labels
const ERAS = {
  "guardia-vieja": "Guardia Vieja",
  "guardia-nueva": "Guardia Nueva",
  "epoca-de-oro": "Época de Oro",
  decadencia: "Decadencia",
  renacimiento: "Renacimiento",
  investigacion: "Investigation Era",
  "nuevo-peak": "Nuevo Peak",
  "neo-traditional": "Neo-Traditional",
};

function PersonCard({ person, locale }) {
  const [hovered, setHovered] = useState(false);

  const typeConfig = TYPES[person.type] || { label: person.type, color: colors.text.muted };

  // Parse dates - handle both string dates "1970-09-21" and year numbers 1963
  const getYear = (value) => {
    if (!value) return null;
    if (typeof value === "number") return value;
    if (typeof value === "string") return value.split("-")[0];
    return null;
  };

  const bornYear = getYear(person.born);
  const diedYear = getYear(person.died);
  const lifespan = bornYear
    ? diedYear
      ? `${bornYear}–${diedYear}`
      : `b. ${bornYear}`
    : "";

  // Get first tag as subtitle
  const subtitle = person.tags?.[0]?.replace(/-/g, " ") || "";

  return (
    <Link
      href={`/${locale}/papers/people/${person.id}`}
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
      <div className="flex items-start justify-between gap-3">
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
            {person.name}
          </h3>
          {subtitle && (
            <p
              className="capitalize mt-0.5"
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
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: colors.overlay.goldSubtle,
              fontFamily: fonts.sans,
              color: typeConfig.color,
              fontSize: "0.7rem",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {typeConfig.label}
          </span>
          {person.status && (
            <StatusBadge status={person.status === "active" ? "populated" : "partial"} />
          )}
        </div>
      </div>

      {lifespan && (
        <p
          className="mt-2"
          style={{
            fontFamily: fonts.mono,
            color: colors.text.muted,
            fontSize: "0.8rem",
          }}
        >
          {lifespan}
        </p>
      )}

      {person.eras && person.eras.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {person.eras.slice(0, 3).map((era) => (
            <span
              key={era}
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: colors.overlay.goldSubtle,
                border: `1px solid ${colors.overlay.goldBorder}`,
                fontFamily: fonts.sans,
                color: colors.text.muted,
                fontSize: "0.72rem",
              }}
            >
              {ERAS[era] || era}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function PeoplePage() {
  const params = useParams();
  const locale = params.locale || "en";

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEra, setSelectedEra] = useState("all");

  // Load people data from papers directory
  useEffect(() => {
    async function loadPeople() {
      try {
        // Fetch list of people papers
        const peopleFiles = [
          "anibal-troilo", "antonio-todaro", "astor-piazzolla", "cachirulo",
          "carlos-di-sarli", "carlos-gardel", "carlos-gavito", "chicho-frumboli",
          "daniel-trenner", "dimitris-bronowski", "el-turco-jose", "fabian-salas",
          "finito", "giselle-anne", "graciela-gonzalez", "guido-iacopetti",
          "gustavo-naveira", "ignacio-varchausky", "juan-carlos-copes", "juan-darienzo",
          "juana-sepulveda", "maria-nieves", "miguel-angel-zotto", "milena-plebs",
          "mingo-pugliese", "osvaldo-pugliese", "pablo-veron", "pepito-avellaneda",
          "roberto-alvarez", "rodolfo-cieri", "steve-darmo", "susana-miller", "tete-rusconi"
        ];

        const peopleData = await Promise.all(
          peopleFiles.map(async (id) => {
            try {
              const response = await fetch(`/tango-papers/people/${id}.md`);
              if (!response.ok) return null;
              const content = await response.text();
              const { frontmatter } = parseFrontmatter(content);
              return { id, ...frontmatter };
            } catch {
              return null;
            }
          })
        );

        setPeople(peopleData.filter(Boolean));
      } catch (error) {
        console.error("Failed to load people:", error);
      }
      setLoading(false);
    }
    loadPeople();
  }, []);

  // Get unique types and eras
  const allTypes = useMemo(() => {
    const types = new Set();
    people.forEach((person) => {
      if (person.type) types.add(person.type);
    });
    return Array.from(types).sort();
  }, [people]);

  const allEras = useMemo(() => {
    const eras = new Set();
    people.forEach((person) => {
      person.eras?.forEach((era) => eras.add(era));
    });
    return Array.from(eras);
  }, [people]);

  // Filter people
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          person.name?.toLowerCase().includes(query) ||
          person.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedType !== "all") {
        if (person.type !== selectedType) return false;
      }

      // Era filter
      if (selectedEra !== "all") {
        if (!person.eras?.includes(selectedEra)) return false;
      }

      return true;
    });
  }, [people, searchQuery, selectedType, selectedEra]);

  // Sort by name
  const sortedPeople = useMemo(() => {
    return [...filteredPeople].sort((a, b) => {
      const nameA = a.name || a.id;
      const nameB = b.name || b.id;
      return nameA.localeCompare(nameB);
    });
  }, [filteredPeople]);

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
                People
              </h1>
              <p
                style={{
                  fontFamily: fonts.sans,
                  color: colors.text.mid,
                  fontSize: "1.05rem",
                }}
              >
                Dancers, Musicians, Singers & Cultural Figures
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  color: colors.text.muted,
                  fontSize: "0.85rem",
                }}
              >
                {people.length} profiles
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div
                className="relative max-w-xl mx-auto"
                style={{
                  border: `1px solid ${colors.overlay.goldBorderMedium}`,
                  borderRadius: "9999px",
                  backgroundColor: colors.bg.card,
                }}
              >
                <div className="flex items-center px-4 py-3">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke={colors.text.muted}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none ml-3"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.text.light,
                      fontSize: "0.95rem",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      style={{ color: colors.text.muted }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Type filters */}
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedType("all")}
                className="px-3 py-1.5 rounded-full text-sm transition-all duration-200"
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  backgroundColor: selectedType === "all" ? colors.overlay.goldMedium : "transparent",
                  color: selectedType === "all" ? colors.accent.gold : colors.text.muted,
                  border: selectedType === "all"
                    ? `1px solid ${colors.overlay.goldBorderActive}`
                    : `1px solid ${colors.overlay.goldBorder}`,
                }}
              >
                All Types
              </button>
              {allTypes.map((type) => {
                const config = TYPES[type] || { label: type };
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className="px-3 py-1.5 rounded-full text-sm transition-all duration-200 capitalize"
                    style={{
                      fontFamily: fonts.sans,
                      fontWeight: 500,
                      backgroundColor: selectedType === type ? colors.overlay.goldMedium : "transparent",
                      color: selectedType === type ? colors.accent.gold : colors.text.muted,
                      border: selectedType === type
                        ? `1px solid ${colors.overlay.goldBorderActive}`
                        : `1px solid ${colors.overlay.goldBorder}`,
                    }}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Era filters */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedEra("all")}
                className="px-3 py-1.5 rounded-full text-sm transition-all duration-200"
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  backgroundColor: selectedEra === "all" ? colors.overlay.goldMedium : "transparent",
                  color: selectedEra === "all" ? colors.accent.gold : colors.text.muted,
                  border: selectedEra === "all"
                    ? `1px solid ${colors.overlay.goldBorderActive}`
                    : `1px solid ${colors.overlay.goldBorder}`,
                }}
              >
                All Eras
              </button>
              {allEras.slice(0, 6).map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className="px-3 py-1.5 rounded-full text-sm transition-all duration-200"
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: 500,
                    backgroundColor: selectedEra === era ? colors.overlay.goldMedium : "transparent",
                    color: selectedEra === era ? colors.accent.gold : colors.text.muted,
                    border: selectedEra === era
                      ? `1px solid ${colors.overlay.goldBorderActive}`
                      : `1px solid ${colors.overlay.goldBorder}`,
                  }}
                >
                  {ERAS[era] || era}
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
                Showing {sortedPeople.length} of {people.length} people
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

            {/* People grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedPeople.map((person) => (
                  <PersonCard key={person.id} person={person} locale={locale} />
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && sortedPeople.length === 0 && (
              <div className="text-center py-12">
                <p
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.text.muted,
                    fontSize: "1rem",
                  }}
                >
                  No people found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("all");
                    setSelectedEra("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-full transition-colors duration-200"
                  style={{
                    fontFamily: fonts.sans,
                    color: colors.accent.gold,
                    backgroundColor: colors.overlay.goldLight,
                    border: `1px solid ${colors.overlay.goldBorderMedium}`,
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
