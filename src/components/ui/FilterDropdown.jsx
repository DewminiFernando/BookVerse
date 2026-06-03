import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({ label, options = [], selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-full border border-gold-300/30 bg-cream-100/80 px-4 py-2.5 font-body text-sm font-semibold text-charcoal-900 backdrop-blur-sm transition-all duration-200 hover:border-gold-400/50 hover:shadow-glass dark:border-gold-400/15 dark:bg-charcoal-800/80 dark:text-cream-100 dark:hover:border-gold-400/30"
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 text-gold-400 transition-transform duration-300 ease-spring ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 min-w-full rounded-2xl border border-gold-300/25 bg-cream-100/90 shadow-glass backdrop-blur-xl overflow-hidden animate-scaleIn dark:border-gold-400/15 dark:bg-charcoal-800/90">
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left font-body text-sm transition-all duration-200 ${
                  isSelected
                    ? "bg-gold-300/20 font-bold text-gold-500 dark:bg-gold-400/15 dark:text-gold-400"
                    : "text-charcoal-900 hover:bg-gold-300/10 hover:text-gold-500 dark:text-cream-100 dark:hover:bg-gold-400/10 dark:hover:text-gold-400"
                }`}
              >
                {isSelected ? (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    {option}
                  </span>
                ) : (
                  option
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FilterDropdown;
