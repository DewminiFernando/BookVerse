import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { useBook } from "../../context/BookContext.jsx";
import PaigeOwl from "../ui/PaigeOwl.jsx";

const Footer = () => {
  const { favorites, readingSessions, currentMood } = useBook();
  const favoritesCount = favorites.length;
  const sessionsCount = readingSessions.length;
  const moodLabel = currentMood ? `Mood: ${currentMood}` : "No mood set";

  return (
    <footer className="w-full glass-light border-t border-gold-400/20 px-6 py-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between grid grid-cols-1 md:grid-cols-3">
        {/* Column 1 — Brand */}
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center shadow-gold">
              <BookOpen className="w-4 h-4 text-charcoal-900" />
            </div>
            <span className="font-display italic text-xl font-bold text-charcoal-900 dark:text-cream-100 ml-2">
              BookVerse
            </span>
          </div>
          <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 mt-2 leading-relaxed">
            Your cozy corner for book discovery. ✦
          </p>
          <div className="mt-3">
            <PaigeOwl variant="winking" size="sm" className="w-12 h-12" />
          </div>
        </div>

        {/* Column 2 — Navigation */}
        <div className="flex flex-col items-start">
          <p className="eyebrow mb-4">Explore</p>
          <div className="flex flex-wrap gap-1">
            {["/", "/explore", "/favorites", "/analytics", "/profile"].map((path) => {
              const label =
                path === "/"
                  ? "Home"
                  : `${path.replace("/", "").charAt(0).toUpperCase()}${path.replace("/", "").slice(1)}`;
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="inline-flex px-3 py-1 rounded-full text-xs font-body font-700 bg-cream-200 dark:bg-charcoal-800 text-charcoal-500 dark:text-cream-300 hover:bg-gold-300/30 hover:text-gold-600 transition-all duration-200 mr-2 mb-2"
                >
                  {label}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Column 3 — Reading Stats */}
        <div className="flex flex-col items-start">
          <p className="eyebrow mb-4">Your Reading</p>
          <div className="flex flex-wrap gap-2 text-xs text-charcoal-700 dark:text-cream-100">
            <span className="bg-cream-200 dark:bg-charcoal-800 rounded-full px-3 py-1 text-xs font-body font-700 flex items-center gap-1.5">
              {favoritesCount} saved
            </span>
            <span className="bg-cream-200 dark:bg-charcoal-800 rounded-full px-3 py-1 text-xs font-body font-700 flex items-center gap-1.5">
              {sessionsCount} sessions
            </span>
            <span className="bg-cream-200 dark:bg-charcoal-800 rounded-full px-3 py-1 text-xs font-body font-700 flex items-center gap-1.5">
              {moodLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gold-400/20 mt-10 pt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-body text-xs text-charcoal-500 dark:text-cream-300">
          © 2025 BookVerse. Made with ♡ and lots of books.
        </span>
        <span className="flex items-center font-body text-xs text-charcoal-500 dark:text-cream-300">
          <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500 inline-block mr-1.5 animate-pulse" />
          Built with React & Google Books API
        </span>
      </div>
    </footer>
  );
};

export default Footer;
