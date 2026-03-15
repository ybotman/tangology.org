/**
 * Firebase Configuration for Tangology
 *
 * Uses the shared tangotiempo-257ff Firebase project.
 * All Tango Universe apps share the same Firebase project for unified auth.
 *
 * Config is loaded from NEXT_PUBLIC_FIREBASE_JSON (base64-encoded)
 * Same config is used across TangoTiempo, NTTT, HarmonyJunction, and Tangology.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Base64 decoder that works in both browser and Node.js
function decodeBase64(str) {
  if (typeof window !== "undefined") {
    // Browser
    return atob(str);
  } else if (typeof Buffer !== "undefined") {
    // Node.js
    return Buffer.from(str, "base64").toString("utf-8");
  }
  return str;
}

// Get Firebase config from environment
function getFirebaseConfig() {
  const configBase64 = process.env.NEXT_PUBLIC_FIREBASE_JSON;

  if (configBase64) {
    try {
      const decoded = decodeBase64(configBase64);
      return JSON.parse(decoded);
    } catch (error) {
      console.error("Failed to decode Firebase config:", error);
    }
  }

  // Placeholder for development (replace with actual config)
  console.warn("Firebase config not found. Using placeholder.");
  return {
    apiKey: "placeholder",
    authDomain: "placeholder.firebaseapp.com",
    projectId: "placeholder",
    storageBucket: "placeholder.appspot.com",
    messagingSenderId: "placeholder",
    appId: "placeholder",
  };
}

// Initialize Firebase (singleton pattern)
const firebaseConfig = getFirebaseConfig();
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const emailProvider = new EmailAuthProvider();

// Collection prefix based on environment (TEST vs PROD)
const isProduction = process.env.VERCEL_ENV === "production";
const prefix = isProduction ? "" : "test_";

// Tangology-specific collections
export const collections = {
  users: `${prefix}users`,
  tloArticleViews: `${prefix}tlo_article_views`,
  tloPaperViews: `${prefix}tlo_paper_views`,
  tloSearchLogs: `${prefix}tlo_search_logs`,
  tloPersonViews: `${prefix}tlo_person_views`,
  tloFeedback: `${prefix}tlo_feedback`,
};

// App ID for cross-app tracking
// 1=TangoTiempo, 2=HarmonyJunction, 3=NTTT, 4=TangoDJ, 5=Tangology
export const APP_ID = process.env.NEXT_PUBLIC_APPLICATION_ID || "5";

export default app;
