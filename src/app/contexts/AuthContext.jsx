"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/lib/firebase/config";

/**
 * AuthContext - Shared authentication context for Tangology
 *
 * Uses Firebase Auth from the shared tangotiempo-257ff project.
 * Same user account works across all Tango Universe apps.
 */

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Map Firebase error codes to user-friendly messages
function getErrorMessage(code) {
  const messages = {
    "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with this email. Try signing up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
    "auth/popup-blocked": "Pop-up was blocked. Please allow pop-ups for this site.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again.",
    "auth/network-request-failed": "Network error. Please check your connection.",
  };
  return messages[code] || "An error occurred. Please try again.";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          token,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google OAuth
  const authenticateWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Apple OAuth
  const authenticateWithApple = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, appleProvider);
      // Apple sometimes doesn't provide display name after first login
      const appleUser = result.user;
      if (!appleUser.displayName && result._tokenResponse?.firstName) {
        const fullName = `${result._tokenResponse.firstName} ${result._tokenResponse.lastName || ""}`.trim();
        await updateProfile(appleUser, { displayName: fullName });
      }
      return appleUser;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Email/password login
  const login = async (email, password) => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Email/password signup
  const signUp = async ({ email, password, firstName, lastName }) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = result.user;

      // Set display name
      const displayName = `${firstName} ${lastName}`.trim();
      if (displayName) {
        await updateProfile(newUser, { displayName });
      }

      // Send email verification
      await sendEmailVerification(newUser);

      return newUser;
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Sign out
  const logOut = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    authenticateWithGoogle,
    authenticateWithApple,
    login,
    signUp,
    logOut,
    resetPassword,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
