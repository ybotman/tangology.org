/**
 * Parse YAML frontmatter from markdown content
 * @param {string} content - Raw markdown with optional frontmatter
 * @returns {{ frontmatter: object, content: string }}
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {},
      content: content.trim(),
    };
  }

  const [, yamlContent, markdownContent] = match;
  const frontmatter = parseYaml(yamlContent);

  return {
    frontmatter,
    content: markdownContent.trim(),
  };
}

/**
 * Simple YAML parser for frontmatter
 * Handles basic key-value pairs and arrays
 * @param {string} yaml - YAML string
 * @returns {object}
 */
function parseYaml(yaml) {
  const result = {};
  const lines = yaml.split("\n");
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;

    // Array item
    if (line.match(/^\s*-\s+/)) {
      const value = line.replace(/^\s*-\s+/, "").trim();
      if (currentArray && currentKey) {
        currentArray.push(cleanValue(value));
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+[\w-]*):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      currentKey = key;

      if (!value.trim()) {
        // Start of array or nested object
        currentArray = [];
        result[key] = currentArray;
      } else if (value.startsWith("[") && value.endsWith("]")) {
        // Inline array
        const items = value
          .slice(1, -1)
          .split(",")
          .map((s) => cleanValue(s.trim()));
        result[key] = items;
        currentArray = null;
      } else {
        // Simple value
        result[key] = cleanValue(value);
        currentArray = null;
      }
    }
  }

  return result;
}

/**
 * Clean a YAML value (remove quotes, parse booleans/numbers)
 * @param {string} value - Raw value
 * @returns {string|number|boolean}
 */
function cleanValue(value) {
  // Remove quotes
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Boolean
  if (value === "true") return true;
  if (value === "false") return false;

  // Number
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value);
  }

  return value;
}
