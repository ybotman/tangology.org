"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for detecting when an element enters the viewport
 * @param {number} threshold - Intersection observer threshold (0-1)
 * @returns {[React.RefObject, boolean]} - [ref to attach, isVisible state]
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
