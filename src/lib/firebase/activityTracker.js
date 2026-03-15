/**
 * Activity Tracker for Tangology
 *
 * Tracks user activity in Firestore for analytics and personalization.
 * Uses the shared tangotiempo-257ff Firebase project.
 */

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, collections, APP_ID } from "./config";

/**
 * Track when a user views a paper
 * @param {string} userId - User UID (optional for anonymous)
 * @param {string} category - Paper category (argentina, people, etc.)
 * @param {string} paperId - Paper slug
 * @param {string} title - Paper title
 */
export async function trackPaperView(userId, category, paperId, title) {
  try {
    await addDoc(collection(db, collections.tloPaperViews), {
      userId: userId || "anonymous",
      appId: APP_ID,
      category,
      paperId,
      title,
      viewedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to track paper view:", error);
  }
}

/**
 * Track when a user views a person profile
 * @param {string} userId - User UID (optional for anonymous)
 * @param {string} personId - Person ID
 * @param {string} name - Person name
 */
export async function trackPersonView(userId, personId, name) {
  try {
    await addDoc(collection(db, collections.tloPersonViews), {
      userId: userId || "anonymous",
      appId: APP_ID,
      personId,
      name,
      viewedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to track person view:", error);
  }
}

/**
 * Track search queries
 * @param {string} userId - User UID (optional for anonymous)
 * @param {string} query - Search query
 * @param {number} resultCount - Number of results
 */
export async function trackSearch(userId, query, resultCount) {
  try {
    await addDoc(collection(db, collections.tloSearchLogs), {
      userId: userId || "anonymous",
      appId: APP_ID,
      query,
      resultCount,
      searchedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to track search:", error);
  }
}

/**
 * Track article/glossary term views
 * @param {string} userId - User UID (optional for anonymous)
 * @param {string} termId - Glossary term ID
 * @param {string} term - Term display name
 */
export async function trackTermView(userId, termId, term) {
  try {
    await addDoc(collection(db, collections.tloArticleViews), {
      userId: userId || "anonymous",
      appId: APP_ID,
      termId,
      term,
      viewedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to track term view:", error);
  }
}

/**
 * Submit user feedback
 * @param {object} feedback - Feedback data
 */
export async function submitFeedback(feedback) {
  try {
    await addDoc(collection(db, collections.tloFeedback), {
      ...feedback,
      appId: APP_ID,
      createdAt: serverTimestamp(),
      status: "pending",
    });
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    throw error;
  }
}
