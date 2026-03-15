"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { buildSearchIndex } from "./buildIndex";

/**
 * Fuse.js configuration for tango content search
 */
const FUSE_OPTIONS = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "subtitle", weight: 0.2 },
    { name: "description", weight: 0.2 },
    { name: "aliases", weight: 0.15 },
    { name: "definition", weight: 0.05 },
  ],
  threshold: 0.3, // Lower = more strict matching
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
};

/**
 * Custom hook for searching tango content
 * @returns {object} Search state and methods
 */
export function useSearch() {
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  // Build search index on mount
  useEffect(() => {
    async function loadIndex() {
      try {
        const items = await buildSearchIndex();
        setIndex(items);
      } catch (error) {
        console.error("Failed to build search index:", error);
      }
      setLoading(false);
    }
    loadIndex();
  }, []);

  // Create Fuse instance
  const fuse = useMemo(() => {
    if (index.length === 0) return null;
    return new Fuse(index, FUSE_OPTIONS);
  }, [index]);

  // Perform search
  const search = useCallback(
    (searchQuery, typeFilter = "all") => {
      if (!fuse || !searchQuery.trim()) {
        setResults([]);
        return [];
      }

      let searchResults = fuse.search(searchQuery);

      // Apply type filter
      if (typeFilter !== "all") {
        searchResults = searchResults.filter(
          (result) => result.item.type === typeFilter
        );
      }

      // Limit results
      const limitedResults = searchResults.slice(0, 20).map((result) => ({
        ...result.item,
        score: result.score,
      }));

      setResults(limitedResults);
      return limitedResults;
    },
    [fuse]
  );

  // Update search when query or type changes
  useEffect(() => {
    search(query, selectedType);
  }, [query, selectedType, search]);

  // Get available types from index
  const availableTypes = useMemo(() => {
    const types = new Set(index.map((item) => item.type));
    return Array.from(types);
  }, [index]);

  // Get total count
  const totalCount = index.length;

  return {
    query,
    setQuery,
    results,
    loading,
    selectedType,
    setSelectedType,
    availableTypes,
    totalCount,
    search,
  };
}
