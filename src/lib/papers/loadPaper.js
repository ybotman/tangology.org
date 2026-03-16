import { parseFrontmatter } from "./parseFrontmatter";
import { autoLinkContent } from "../content/autoLinker";

/**
 * Load a paper from the public tango-papers directory
 * Works both server-side and client-side
 *
 * @param {string} category - Paper category (argentina, people, orchestras, etc.)
 * @param {string} slug - Paper slug (epoca-de-oro, carlos-gardel, etc.)
 * @param {Object} options - Loading options
 * @param {string} options.locale - Locale for links (default: "en")
 * @param {boolean} options.autoLink - Whether to auto-link terms (default: true)
 * @returns {Promise<{ frontmatter: object, content: string, error?: string }>}
 */
export async function loadPaper(category, slug, options = {}) {
  const { locale = "en", autoLink = true } = options;
  const path = `/tango-papers/${category}/${slug}.md`;

  try {
    // In browser or server, fetch from public directory
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4001";

    const response = await fetch(`${baseUrl}${path}`);

    if (!response.ok) {
      return {
        frontmatter: {},
        content: "",
        error: `Paper not found: ${path}`,
      };
    }

    const rawContent = await response.text();
    const { frontmatter, content } = parseFrontmatter(rawContent);

    // Auto-link glossary terms, people, and orchestras
    const linkedContent = autoLink
      ? autoLinkContent(content, locale, {
          linkGlossary: true,
          linkPeople: true,
          linkOrchestras: true,
          linkEras: true,
          maxLinksPerTerm: 1, // Only link first occurrence
        })
      : content;

    return {
      frontmatter,
      content: linkedContent,
      path,
    };
  } catch (error) {
    return {
      frontmatter: {},
      content: "",
      error: `Failed to load paper: ${error.message}`,
    };
  }
}

/**
 * Load paper metadata from category index
 * @param {string} category - Paper category
 * @returns {Promise<object[]>}
 */
export async function loadCategoryIndex(category) {
  const path = `/tango-papers/index/glossary/${category}.json`;

  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4001";

    const response = await fetch(`${baseUrl}${path}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.entities || [];
  } catch (error) {
    console.error(`Failed to load index: ${error.message}`);
    return [];
  }
}

/**
 * Load the master index
 * @returns {Promise<object>}
 */
export async function loadMasterIndex() {
  const path = "/tango-papers/index/master-index.json";

  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4001";

    const response = await fetch(`${baseUrl}${path}`);

    if (!response.ok) {
      return { entities: [] };
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to load master index: ${error.message}`);
    return { entities: [] };
  }
}

/**
 * Get static paths for all papers (for generateStaticParams)
 * This reads the filesystem during build time
 */
export function getPaperCategories() {
  return [
    "argentina",
    "dancers",
    "europe",
    "usa",
    "orchestras",
    "events",
    "people",
    "glossary",
  ];
}
