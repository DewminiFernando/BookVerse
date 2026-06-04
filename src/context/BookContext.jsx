import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import {
  DEMO_FAVORITES,
  DEMO_READING_LIST,
  DEMO_READING_SESSIONS,
  DEMO_PROFILE_NAME,
  DEMO_GOALS,
} from "../data/demoData.js";

const BookContext = createContext(null);

const FAVORITES_KEY = "bookverse_favorites";
const READING_LIST_KEY = "bookverse_reading_list";
const READING_SESSIONS_KEY = "bookverse_reading_sessions";
const THEME_KEY = "bookverse_theme";
const MOOD_KEY = "bookverse_mood";
export const PROFILE_NAME_KEY = "bookverse_profile_name";
export const GOALS_KEY = "bookverse_goals";

const loadFromStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Like loadFromStorage, but falls back to demoFallback when the stored value
 * is missing OR is an empty array. This ensures the site looks populated on
 * first visit without ever overwriting real user data.
 */
const loadWithDemoFallback = (key, demoFallback) => {
  if (typeof window === "undefined") return demoFallback;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return demoFallback;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length === 0) return demoFallback;
    return parsed;
  } catch {
    return demoFallback;
  }
};

/** Seed default profile values (name + goals) only when missing. */
export const seedDemoProfile = () => {
  if (!localStorage.getItem(PROFILE_NAME_KEY)) {
    localStorage.setItem(PROFILE_NAME_KEY, DEMO_PROFILE_NAME);
  }
  if (!localStorage.getItem(GOALS_KEY)) {
    localStorage.setItem(GOALS_KEY, JSON.stringify(DEMO_GOALS));
  }
};

/** Public helper used by the Profile page Reset button. */
export const resetDemoData = () => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(DEMO_FAVORITES));
  localStorage.setItem(READING_LIST_KEY, JSON.stringify(DEMO_READING_LIST));
  localStorage.setItem(READING_SESSIONS_KEY, JSON.stringify(DEMO_READING_SESSIONS));
  localStorage.setItem(PROFILE_NAME_KEY, DEMO_PROFILE_NAME);
  localStorage.setItem(GOALS_KEY, JSON.stringify(DEMO_GOALS));
};

const saveToStorage = (key, value) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const exists = state.some((item) => item.id === action.payload.id);
      return exists ? state : [action.payload, ...state];
    }
    case "REMOVE": {
      return state.filter((item) => item.id !== action.payload);
    }
    default:
      return state;
  }
};

const readingListReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const exists = state.some((entry) => entry.book.id === action.payload.book.id);
      return exists ? state : [action.payload, ...state];
    }
    case "REMOVE": {
      return state.filter((entry) => entry.book.id !== action.payload);
    }
    case "UPDATE_PAGE": {
      return state.map((entry) => {
        if (entry.book.id === action.payload.id) {
          const maxPages = entry.book.pages || entry.book.pageCount || 0;
          const newPage = maxPages > 0 ? Math.min(action.payload.page, maxPages) : action.payload.page;
          const isCompleted = maxPages > 0 && newPage >= maxPages;
          return {
            ...entry,
            currentPage: newPage,
            status: isCompleted ? "completed" : "reading"
          };
        }
        return entry;
      });
    }
    default:
      return state;
  }
};

const applyThemeClass = (theme) => {
  if (typeof document === "undefined") return;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const BookProvider = ({ children }) => {
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    [],
    () => loadWithDemoFallback(FAVORITES_KEY, DEMO_FAVORITES)
  );
  const [readingList, dispatchReadingList] = useReducer(
    readingListReducer,
    [],
    () => loadWithDemoFallback(READING_LIST_KEY, DEMO_READING_LIST)
  );
  const [readingSessions, setReadingSessions] = useState(() =>
    loadWithDemoFallback(READING_SESSIONS_KEY, DEMO_READING_SESSIONS)
  );
  const [theme, setTheme] = useState(() => loadFromStorage(THEME_KEY, "light"));
  const [currentMood, setCurrentMood] = useState(() => loadFromStorage(MOOD_KEY, ""));

  useEffect(() => {
    saveToStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    saveToStorage(READING_LIST_KEY, readingList);
  }, [readingList]);

  useEffect(() => {
    saveToStorage(READING_SESSIONS_KEY, readingSessions);
  }, [readingSessions]);

  useEffect(() => {
    saveToStorage(THEME_KEY, theme);
    applyThemeClass(theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage(MOOD_KEY, currentMood);
  }, [currentMood]);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const addFavorite = (book) => {
    if (!book || !book.id) return;
    dispatchFavorites({ type: "ADD", payload: book });
  };

  const removeFavorite = (id) => {
    if (!id) return;
    dispatchFavorites({ type: "REMOVE", payload: id });
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const addToReadingList = (book) => {
    if (!book || !book.id) return;
    dispatchReadingList({
      type: "ADD",
      payload: { book, status: "to-read", currentPage: 0 },
    });
  };

  const removeFromReadingList = (id) => {
    if (!id) return;
    dispatchReadingList({ type: "REMOVE", payload: id });
  };

  const updateCurrentPage = (id, page) => {
    if (!id) return;
    dispatchReadingList({ type: "UPDATE_PAGE", payload: { id, page } });
  };

  const addReadingSession = (session) => {
    if (!session) return;
    setReadingSessions((prev) => [session, ...prev]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Dispatch actions to reset state without page reload
  const resetToDemo = () => {
    resetDemoData();
    window.location.reload();
  };

  const value = {
    favorites,
    readingList,
    readingSessions,
    theme,
    currentMood,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToReadingList,
    removeFromReadingList,
    updateCurrentPage,
    addReadingSession,
    toggleTheme,
    setCurrentMood,
    resetToDemo,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};

