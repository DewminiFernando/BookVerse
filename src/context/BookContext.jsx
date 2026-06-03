import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const BookContext = createContext(null);

const FAVORITES_KEY = "bookverse_favorites";
const READING_LIST_KEY = "bookverse_reading_list";
const READING_SESSIONS_KEY = "bookverse_reading_sessions";
const THEME_KEY = "bookverse_theme";
const MOOD_KEY = "bookverse_mood";

const loadFromStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
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
    () => loadFromStorage(FAVORITES_KEY, [])
  );
  const [readingList, dispatchReadingList] = useReducer(
    readingListReducer,
    [],
    () => loadFromStorage(READING_LIST_KEY, [])
  );
  const [readingSessions, setReadingSessions] = useState(() =>
    loadFromStorage(READING_SESSIONS_KEY, [])
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

