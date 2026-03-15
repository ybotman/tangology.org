/**
 * Search Index Builder
 *
 * Builds a unified search index from all content sources:
 * - Glossary terms
 * - Orchestras
 * - People (from paper frontmatter)
 * - Venues
 * - Styles
 * - Timeline eras
 */

import { timelineCategories } from "@/app/data/tangoTimelineData";

/**
 * Build search index from all data sources
 * @returns {Promise<object[]>} Array of searchable items
 */
export async function buildSearchIndex() {
  const items = [];

  // Add timeline eras
  timelineCategories.forEach((category) => {
    category.eras.forEach((era) => {
      items.push({
        id: era.id,
        type: "era",
        title: era.title,
        subtitle: era.subtitle,
        description: era.summary?.join(" ") || "",
        href: `/timeline#${era.id}`,
        category: category.categoryTitle,
        years: `${era.yearStart}–${era.yearEnd}`,
        status: era.status,
      });
    });
  });

  // Load glossary terms
  try {
    const glossaryResponse = await fetch("/tango-papers/index/glossary/01-tango-terms.json");
    if (glossaryResponse.ok) {
      const glossaryData = await glossaryResponse.json();
      (glossaryData.entities || []).forEach((term) => {
        items.push({
          id: term.id,
          type: "term",
          title: term.displayName,
          subtitle: term.spanish !== term.displayName ? term.spanish : "",
          description: term.summary,
          definition: term.definition,
          href: `/glossary#${term.id}`,
          aliases: term.aliases || [],
          categories: term.categories || [],
        });
      });
    }
  } catch (e) {
    console.warn("Failed to load glossary for search index");
  }

  // Load orchestras
  try {
    const orchestrasResponse = await fetch("/tango-papers/index/glossary/02-orchestras.json");
    if (orchestrasResponse.ok) {
      const orchestrasData = await orchestrasResponse.json();
      (orchestrasData.entities || []).forEach((orch) => {
        items.push({
          id: orch.id,
          type: "orchestra",
          title: orch.displayName,
          subtitle: orch.aliases?.[0] || "",
          description: orch.summary,
          href: `/orchestras#${orch.id}`,
          aliases: orch.aliases || [],
          categories: orch.categories || [],
        });
      });
    }
  } catch (e) {
    console.warn("Failed to load orchestras for search index");
  }

  // Load venues
  try {
    const venuesResponse = await fetch("/tango-papers/index/glossary/04-venues.json");
    if (venuesResponse.ok) {
      const venuesData = await venuesResponse.json();
      (venuesData.entities || []).forEach((venue) => {
        items.push({
          id: venue.id,
          type: "venue",
          title: venue.displayName,
          subtitle: venue.meta?.neighborhood || "",
          description: venue.summary,
          href: `/venues#${venue.id}`,
          categories: venue.categories || [],
        });
      });
    }
  } catch (e) {
    console.warn("Failed to load venues for search index");
  }

  // Load styles
  try {
    const stylesResponse = await fetch("/tango-papers/index/glossary/05-styles.json");
    if (stylesResponse.ok) {
      const stylesData = await stylesResponse.json();
      (stylesData.entities || []).forEach((style) => {
        items.push({
          id: style.id,
          type: "style",
          title: style.displayName,
          subtitle: style.aliases?.[0] || "",
          description: style.summary,
          href: `/styles#${style.id}`,
          aliases: style.aliases || [],
        });
      });
    }
  } catch (e) {
    console.warn("Failed to load styles for search index");
  }

  // Add known people (hardcoded list for now, could be dynamic)
  const people = [
    { id: "carlos-gardel", name: "Carlos Gardel", type: "singer" },
    { id: "anibal-troilo", name: "Aníbal Troilo", type: "musician" },
    { id: "carlos-di-sarli", name: "Carlos Di Sarli", type: "musician" },
    { id: "juan-darienzo", name: "Juan D'Arienzo", type: "musician" },
    { id: "osvaldo-pugliese", name: "Osvaldo Pugliese", type: "musician" },
    { id: "astor-piazzolla", name: "Astor Piazzolla", type: "musician" },
    { id: "carlos-gavito", name: "Carlos Gavito", type: "dancer" },
    { id: "chicho-frumboli", name: "Chicho Frumboli", type: "dancer" },
    { id: "gustavo-naveira", name: "Gustavo Naveira", type: "dancer" },
    { id: "fabian-salas", name: "Fabián Salas", type: "dancer" },
    { id: "tete-rusconi", name: "Tete Rusconi", type: "dancer" },
    { id: "pepito-avellaneda", name: "Pepito Avellaneda", type: "dancer" },
    { id: "susana-miller", name: "Susana Miller", type: "dancer" },
    { id: "juan-carlos-copes", name: "Juan Carlos Copes", type: "dancer" },
    { id: "maria-nieves", name: "María Nieves", type: "dancer" },
    { id: "miguel-angel-zotto", name: "Miguel Ángel Zotto", type: "dancer" },
    { id: "milena-plebs", name: "Milena Plebs", type: "dancer" },
    { id: "pablo-veron", name: "Pablo Verón", type: "dancer" },
  ];

  people.forEach((person) => {
    items.push({
      id: person.id,
      type: "person",
      title: person.name,
      subtitle: person.type,
      description: "",
      href: `/papers/people/${person.id}`,
    });
  });

  return items;
}

/**
 * Get type icon for search results
 * @param {string} type - Item type
 * @returns {string} Emoji icon
 */
export function getTypeIcon(type) {
  const icons = {
    era: "📅",
    term: "📖",
    orchestra: "🎵",
    venue: "📍",
    style: "💃",
    person: "👤",
  };
  return icons[type] || "📄";
}

/**
 * Get type label for search results
 * @param {string} type - Item type
 * @returns {string} Display label
 */
export function getTypeLabel(type) {
  const labels = {
    era: "Era",
    term: "Term",
    orchestra: "Orchestra",
    venue: "Venue",
    style: "Style",
    person: "Person",
  };
  return labels[type] || "Item";
}
