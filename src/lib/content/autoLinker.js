/**
 * AutoLinker - Automatically links glossary terms, people, and orchestras in content
 *
 * Strategy:
 * 1. Build lookup maps from index files
 * 2. Match terms in content (case-insensitive, word boundaries)
 * 3. Replace with markdown links
 * 4. Avoid double-linking (already linked text)
 */

// Term definitions for auto-linking
// These are the most commonly used terms that should be linked
const GLOSSARY_TERMS = {
  // Dance movements
  "caminata": { path: "/glossary#caminata", display: "caminata" },
  "ocho": { path: "/glossary#ocho", display: "ocho" },
  "ochos": { path: "/glossary#ocho", display: "ochos" },
  "ocho adelante": { path: "/glossary#ocho-adelante", display: "ocho adelante" },
  "ocho atrás": { path: "/glossary#ocho-atras", display: "ocho atrás" },
  "giro": { path: "/glossary#giro", display: "giro" },
  "giros": { path: "/glossary#giro", display: "giros" },
  "molinete": { path: "/glossary#molinete", display: "molinete" },
  "cruzada": { path: "/glossary#cruzada", display: "cruzada" },
  "salida": { path: "/glossary#salida", display: "salida" },
  "resolución": { path: "/glossary#resolucion", display: "resolución" },
  "parada": { path: "/glossary#parada", display: "parada" },
  "sacada": { path: "/glossary#sacada", display: "sacada" },
  "gancho": { path: "/glossary#gancho", display: "gancho" },
  "boleo": { path: "/glossary#boleo", display: "boleo" },
  "volcada": { path: "/glossary#volcada", display: "volcada" },
  "colgada": { path: "/glossary#colgada", display: "colgada" },
  "barrida": { path: "/glossary#barrida", display: "barrida" },
  "arrastre": { path: "/glossary#arrastre", display: "arrastre" },
  "enrosque": { path: "/glossary#enrosque", display: "enrosque" },
  "lapiz": { path: "/glossary#lapiz", display: "lapiz" },
  "planeo": { path: "/glossary#planeo", display: "planeo" },
  "cadena": { path: "/glossary#cadena", display: "cadena" },
  "corrida": { path: "/glossary#corrida", display: "corrida" },

  // Embrace and connection
  "abrazo": { path: "/glossary#abrazo", display: "abrazo" },
  "close embrace": { path: "/glossary#abrazo-cerrado", display: "close embrace" },
  "abrazo cerrado": { path: "/glossary#abrazo-cerrado", display: "abrazo cerrado" },
  "open embrace": { path: "/glossary#abrazo-abierto", display: "open embrace" },
  "abrazo abierto": { path: "/glossary#abrazo-abierto", display: "abrazo abierto" },
  "cabeceo": { path: "/glossary#cabeceo", display: "cabeceo" },
  "mirada": { path: "/glossary#mirada", display: "mirada" },

  // Music and rhythm
  "compás": { path: "/glossary#compas", display: "compás" },
  "bandoneón": { path: "/glossary#bandoneon", display: "bandoneón" },
  "bandoneon": { path: "/glossary#bandoneon", display: "bandoneón" },
  "orquesta típica": { path: "/glossary#orquesta-tipica", display: "orquesta típica" },
  "tanda": { path: "/glossary#tanda", display: "tanda" },
  "cortina": { path: "/glossary#cortina", display: "cortina" },
  "milonga": { path: "/glossary#milonga", display: "milonga" },
  "vals": { path: "/glossary#vals", display: "vals" },

  // Culture and venue
  "milonguero": { path: "/glossary#milonguero", display: "milonguero" },
  "milonguera": { path: "/glossary#milonguera", display: "milonguera" },
  "práctica": { path: "/glossary#practica", display: "práctica" },
  "ronda": { path: "/glossary#ronda", display: "ronda" },
  "línea de baile": { path: "/glossary#linea-de-baile", display: "línea de baile" },
  "lunfardo": { path: "/glossary#lunfardo", display: "lunfardo" },
  "arrabal": { path: "/glossary#arrabal", display: "arrabal" },
  "conventillo": { path: "/glossary#conventillo", display: "conventillo" },
  "compadrito": { path: "/glossary#compadrito", display: "compadrito" },

  // Styles
  "tango nuevo": { path: "/styles#tango-nuevo", display: "tango nuevo" },
  "villa urquiza": { path: "/styles#villa-urquiza", display: "Villa Urquiza" },
  "estilo milonguero": { path: "/styles#milonguero", display: "estilo milonguero" },
  "tango de salon": { path: "/styles#salon", display: "tango de salón" },
  "tango escenario": { path: "/styles#escenario", display: "tango escenario" },
};

// Key people to auto-link
const PEOPLE_LINKS = {
  "carlos gardel": { path: "/papers/people/carlos-gardel", display: "Carlos Gardel" },
  "gardel": { path: "/papers/people/carlos-gardel", display: "Gardel" },
  "aníbal troilo": { path: "/papers/people/anibal-troilo", display: "Aníbal Troilo" },
  "troilo": { path: "/papers/people/anibal-troilo", display: "Troilo" },
  "pichuco": { path: "/papers/people/anibal-troilo", display: "Pichuco" },
  "juan d'arienzo": { path: "/papers/people/juan-darienzo", display: "Juan D'Arienzo" },
  "d'arienzo": { path: "/papers/people/juan-darienzo", display: "D'Arienzo" },
  "carlos di sarli": { path: "/papers/people/carlos-di-sarli", display: "Carlos Di Sarli" },
  "di sarli": { path: "/papers/people/carlos-di-sarli", display: "Di Sarli" },
  "osvaldo pugliese": { path: "/papers/people/osvaldo-pugliese", display: "Osvaldo Pugliese" },
  "pugliese": { path: "/papers/people/osvaldo-pugliese", display: "Pugliese" },
  "astor piazzolla": { path: "/papers/people/astor-piazzolla", display: "Astor Piazzolla" },
  "piazzolla": { path: "/papers/people/astor-piazzolla", display: "Piazzolla" },
  "gustavo naveira": { path: "/papers/people/gustavo-naveira", display: "Gustavo Naveira" },
  "chicho frumboli": { path: "/papers/people/chicho-frumboli", display: "Chicho Frúmboli" },
  "chicho": { path: "/papers/people/chicho-frumboli", display: "Chicho" },
  "tete rusconi": { path: "/papers/people/tete-rusconi", display: "Tete Rusconi" },
  "tete": { path: "/papers/people/tete-rusconi", display: "Tete" },
  "carlos gavito": { path: "/papers/people/carlos-gavito", display: "Carlos Gavito" },
  "gavito": { path: "/papers/people/carlos-gavito", display: "Gavito" },
  "juan carlos copes": { path: "/papers/people/juan-carlos-copes", display: "Juan Carlos Copes" },
  "maría nieves": { path: "/papers/people/maria-nieves", display: "María Nieves" },
  "pepito avellaneda": { path: "/papers/people/pepito-avellaneda", display: "Pepito Avellaneda" },
  "rodolfo biagi": { path: "/papers/people/rodolfo-biagi", display: "Rodolfo Biagi" },
  "francisco canaro": { path: "/papers/people/francisco-canaro", display: "Francisco Canaro" },
  "ricardo vidort": { path: "/papers/people/ricardo-vidort", display: "Ricardo Vidort" },
};

// Orchestra links
const ORCHESTRA_LINKS = {
  "orquesta típica": { path: "/orchestras", display: "orquesta típica" },
  "sexteto mayor": { path: "/orchestras#sexteto-mayor", display: "Sexteto Mayor" },
  "color tango": { path: "/orchestras#color-tango", display: "Color Tango" },
  "el arranque": { path: "/orchestras#el-arranque", display: "El Arranque" },
};

// Era links
const ERA_LINKS = {
  "guardia vieja": { path: "/papers/argentina/guardia-vieja", display: "Guardia Vieja" },
  "guardia nueva": { path: "/papers/argentina/guardia-nueva", display: "Guardia Nueva" },
  "época de oro": { path: "/papers/argentina/epoca-de-oro", display: "Época de Oro" },
  "golden age": { path: "/papers/argentina/epoca-de-oro", display: "Golden Age" },
  "decadencia": { path: "/papers/argentina/decadencia", display: "Decadencia" },
  "renacimiento": { path: "/papers/argentina/renacimiento", display: "Renacimiento" },
};

// Combine all link maps
const ALL_LINKS = {
  ...GLOSSARY_TERMS,
  ...PEOPLE_LINKS,
  ...ORCHESTRA_LINKS,
  ...ERA_LINKS,
};

/**
 * Auto-link recognized terms in markdown content
 * @param {string} content - Raw markdown content
 * @param {string} locale - Current locale (en/es)
 * @param {Object} options - Options for linking
 * @returns {string} - Content with auto-linked terms
 */
export function autoLinkContent(content, locale = "en", options = {}) {
  const {
    linkGlossary = true,
    linkPeople = true,
    linkOrchestras = true,
    linkEras = true,
    maxLinksPerTerm = 1, // Only link first occurrence
  } = options;

  // Build the links map based on options
  let linksToApply = {};
  if (linkGlossary) linksToApply = { ...linksToApply, ...GLOSSARY_TERMS };
  if (linkPeople) linksToApply = { ...linksToApply, ...PEOPLE_LINKS };
  if (linkOrchestras) linksToApply = { ...linksToApply, ...ORCHESTRA_LINKS };
  if (linkEras) linksToApply = { ...linksToApply, ...ERA_LINKS };

  // Track how many times each term has been linked
  const linkCounts = {};

  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = Object.keys(linksToApply).sort((a, b) => b.length - a.length);

  let result = content;

  // Process each term
  for (const term of sortedTerms) {
    const linkInfo = linksToApply[term];
    linkCounts[term] = linkCounts[term] || 0;

    // Skip if we've already linked this term enough times
    if (linkCounts[term] >= maxLinksPerTerm) continue;

    // Create regex that matches the term with word boundaries
    // But not if it's already inside a markdown link [...](...) or already linked
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // This regex matches the term only if it's not already inside a link
    // Negative lookbehind for [ and negative lookahead for ](
    const regex = new RegExp(
      `(?<!\\[)\\b(${escapedTerm})\\b(?![^\\[]*\\])`,
      "gi"
    );

    // Replace only the first occurrence
    let replaced = false;
    result = result.replace(regex, (match) => {
      if (replaced || linkCounts[term] >= maxLinksPerTerm) return match;
      replaced = true;
      linkCounts[term]++;
      const path = `/${locale}${linkInfo.path}`;
      return `[${match}](${path})`;
    });
  }

  return result;
}

/**
 * Get all linkable terms for highlighting/suggestions
 * @returns {Object} - Map of terms to their link info
 */
export function getLinkableTerms() {
  return ALL_LINKS;
}

/**
 * Check if a term is linkable
 * @param {string} term - Term to check
 * @returns {Object|null} - Link info or null
 */
export function getTermLink(term) {
  const lowerTerm = term.toLowerCase();
  return ALL_LINKS[lowerTerm] || null;
}

export default {
  autoLinkContent,
  getLinkableTerms,
  getTermLink,
  GLOSSARY_TERMS,
  PEOPLE_LINKS,
  ORCHESTRA_LINKS,
  ERA_LINKS,
};
