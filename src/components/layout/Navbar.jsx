import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Heart, Menu, Moon, Search, Sun } from "lucide-react";
import { useBook } from "../../context/BookContext.jsx";

const NavItem = ({ to, label }) => (
  <div className="relative py-2">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-1.5 rounded-full text-sm font-body font-700 transition-all duration-200 ${
          isActive
            ? "text-charcoal-900 dark:text-cream-100 font-extrabold"
            : "text-charcoal-500 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full" />
          )}
        </>
      )}
    </NavLink>
  </div>
);

const Navbar = ({ setSidebarOpen }) => {
  const { favorites, theme, toggleTheme } = useBook();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const favoritesCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "glass-light shadow-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <NavLink to="/" className="flex items-center select-none group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-105">
            <BookOpen className="w-4 h-4 text-charcoal-900" />
          </div>
          <span className="font-display italic text-xl font-bold text-charcoal-900 dark:text-cream-100 ml-2">
            BookVerse
          </span>
        </NavLink>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/explore" label="Explore" />
          <NavItem to="/favorites" label="Favorites" />
          <NavItem to="/analytics" label="Analytics" />
          <NavItem to="/profile" label="Profile" />
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="rounded-full p-2 text-charcoal-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-colors duration-200"
            aria-label="Search shelf"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggler */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-charcoal-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Favorites Heart */}
          <NavLink
            to="/favorites"
            className="relative p-2 rounded-full text-charcoal-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-colors duration-200"
            aria-label="Favorites list"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="bg-gold-400 text-charcoal-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-extrabold absolute -top-0.5 -right-0.5">
                {favoritesCount}
              </span>
            )}
          </NavLink>

          {/* Start Reading Pill (desktop only) */}
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="hidden md:block bg-gold-400 text-charcoal-900 font-body font-extrabold text-sm px-5 py-2 rounded-full hover:bg-gold-500 hover:-translate-y-0.5 shadow-gold transition-all duration-200"
          >
            Start Reading ✦
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="md:hidden rounded-full p-2 text-charcoal-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-colors duration-200"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gold bottom border — only visible when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      )}
    </nav>
  );
};

export default Navbar;
