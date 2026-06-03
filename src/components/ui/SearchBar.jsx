import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, onSubmit, placeholder = "Search books" }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-400/70" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-gold-300/30 bg-cream-100/80 px-5 py-3 pl-12 pr-10 font-body text-sm text-charcoal-900 placeholder:text-charcoal-300 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-cream-50 focus:border-gold-400/60 dark:border-gold-400/15 dark:bg-charcoal-800/80 dark:text-cream-100 dark:placeholder:text-charcoal-500 dark:focus:ring-gold-400/30 dark:focus:ring-offset-charcoal-900"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-charcoal-300 transition-all duration-200 hover:text-gold-500 hover:bg-gold-300/15 dark:text-charcoal-500 dark:hover:text-gold-400"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </form>
  );
};

export default SearchBar;
