import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  Compass,
  Heart,
  Home,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useBook } from "../../context/BookContext.jsx";
import PaigeOwl from "../ui/PaigeOwl.jsx";

const NavItem = ({ to, label, icon: Icon, iconBgClass, iconTextClass, onClose, badge }) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      `flex items-center gap-3 px-5 py-3.5 rounded-2xl font-body font-700 text-sm transition-all duration-200 mx-3 my-0.5 ${
        isActive
          ? "bg-cream-200 dark:bg-charcoal-800 text-charcoal-900 dark:text-cream-100 font-extrabold"
          : "text-charcoal-500 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {/* Left Accent Gold Indicator */}
        {isActive && (
          <span className="w-1 h-6 bg-gold-400 rounded-full mr-1 shrink-0 animate-slideRight" />
        )}
        <div className="flex items-center justify-between w-full">
          <span className="flex items-center gap-3">
            {/* Pastel Icon Capsule */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass} ${iconTextClass}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            {label}
          </span>
          {badge !== undefined && badge > 0 ? (
            <span className="rounded-full bg-gold-400 text-charcoal-900 px-2 py-0.5 text-xs font-semibold">
              {badge}
            </span>
          ) : null}
        </div>
      </>
    )}
  </NavLink>
);

const Sidebar = ({ isOpen, onClose }) => {
  const { favorites, theme, toggleTheme } = useBook();
  const favoritesCount = favorites.length;
  const nextThemeLabel = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop blur overlay */}
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close menu"
      />

      {/* Slide-out Panel cabinet */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 glass-light shadow-float flex flex-col justify-between py-6 px-2 transition-transform duration-300 ease-spring ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-4">
            <div className="flex items-center select-none">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center shadow-gold">
                <BookOpen className="w-4 h-4 text-charcoal-900" />
              </div>
              <span className="font-display italic text-xl font-bold text-charcoal-900 dark:text-cream-100 ml-2">
                BookVerse
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-charcoal-500 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-colors duration-200"
              aria-label="Close menu drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links with custom colored left indicators and pastel backings */}
          <nav className="mt-4 flex flex-col">
            <NavItem
              to="/"
              label="Home"
              icon={Home}
              iconBgClass="bg-butter-200 dark:bg-butter-400/20"
              iconTextClass="text-gold-600 dark:text-butter-400"
              onClose={onClose}
            />
            <NavItem
              to="/explore"
              label="Explore"
              icon={Compass}
              iconBgClass="bg-blue-soft dark:bg-blue-dust/20"
              iconTextClass="text-blue-dust dark:text-blue-light"
              onClose={onClose}
            />
            <NavItem
              to="/favorites"
              label="Favorites"
              icon={Heart}
              iconBgClass="bg-blush-200 dark:bg-blush-400/20"
              iconTextClass="text-blush-400"
              badge={favoritesCount}
              onClose={onClose}
            />
            <NavItem
              to="/analytics"
              label="Analytics"
              icon={BarChart2}
              iconBgClass="bg-lavender-200 dark:bg-lavender-400/20"
              iconTextClass="text-lavender-400"
              onClose={onClose}
            />
            <NavItem
              to="/profile"
              label="Profile"
              icon={User}
              iconBgClass="bg-sage-200 dark:bg-sage-400/20"
              iconTextClass="text-sage-400"
              onClose={onClose}
            />
          </nav>
        </div>

        {/* Footer Area with theme toggle and winking Paige Owl */}
        <div className="px-3 shrink-0">
          <div className="border-t border-gold-400/20 mx-2 my-3" />
          
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-cream-300 dark:bg-charcoal-800 px-4 py-3 text-sm font-semibold text-charcoal-900 dark:text-cream-100 hover:bg-gold-300/30 transition-all duration-200"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-gold-400" /> : <Moon className="h-5 w-5 text-gold-600" />}
            {nextThemeLabel}
          </button>

          <div className="flex justify-center pb-2 mt-4 select-none">
            <PaigeOwl variant="winking" size="sm" />
            <p className="font-body text-xs text-charcoal-500 dark:text-cream-300 ml-2 self-end pb-1">
              Happy reading! ✦
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
