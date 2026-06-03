import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, BookOpen } from "lucide-react";
import SearchBar from "../components/ui/SearchBar.jsx";
import Button from "../components/ui/Button.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";
import { useBook } from "../context/BookContext.jsx";

const sortOptions = ["Recently Added", "Title A-Z", "Author A-Z", "Highest Rated"];

const gradients = [
  "from-blush-200 to-blush-100",
  "from-sage-200 to-sage-100",
  "from-butter-200 to-butter-100",
  "from-lavender-200 to-lavender-100",
  "from-peach-200 to-peach-100",
];

const FavoriteCard = ({ book, onView, onRemove }) => {
  const [removing, setRemoving] = useState(false);
  const gradient = gradients[book.title?.charCodeAt(0) % 5 || 0];

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(book.id), 300);
  };

  return (
    <div
      className={`group relative w-full overflow-hidden glass-card rounded-3xl transition-all duration-300 ${
        removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className={`flex h-56 w-full items-center justify-center bg-gradient-to-br ${gradient}`}>
          <BookOpen className="h-10 w-10 text-gold-400 opacity-60" />
        </div>
      )}

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-bold font-body leading-snug text-charcoal-900 dark:text-cream-100">
          {book.title || "Untitled"}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs font-body text-charcoal-500 dark:text-cream-300">
          {book.author || "Unknown"}
        </p>
        {book.rating ? (
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xs ${
                  star <= Math.round(book.rating)
                    ? "text-gold-400"
                    : "text-charcoal-300 dark:text-charcoal-700"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-charcoal-900/90 to-transparent p-4 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onView}
            className="flex items-center gap-1 bg-gold-400/90 text-charcoal-900 rounded-full px-3 py-1.5 font-body text-xs font-bold hover:bg-gold-500 transition-colors"
          >
            View Details →
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 bg-peach-200 text-charcoal-700 rounded-full px-3 py-1.5 font-body text-xs font-bold hover:bg-peach-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useBook();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recently Added");

  const filtered = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return favorites.filter((book) => {
      const title = (book.title || "").toLowerCase();
      const author = (book.author || "").toLowerCase();
      return title.includes(term) || author.includes(term);
    });
  }, [favorites, searchQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "Title A-Z") return a.title.localeCompare(b.title);
      if (sortBy === "Author A-Z") return a.author.localeCompare(b.author);
      if (sortBy === "Highest Rated") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [filtered, sortBy]);

  const topGenre = useMemo(() => {
    if (favorites.length === 0) return "None";
    return (
      Object.entries(
        favorites.reduce((acc, b) => {
          const g = b.genre || "General";
          acc[g] = (acc[g] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || "General"
    );
  }, [favorites]);

  const authorCount = useMemo(() => {
    return new Set(favorites.map((b) => b.author || "Unknown")).size;
  }, [favorites]);

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 page-enter">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header with Paige winking */}
        <div className="flex items-center gap-4 mb-8">
          <PaigeOwl variant="winking" size="md" />
          <div>
            <p className="eyebrow mb-1">your collection</p>
            <h1 className="font-display font-bold text-4xl text-charcoal-900 dark:text-cream-100">
              Saved <em className="text-gold-400 not-italic">Treasures</em> ♡
            </h1>
            <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 mt-1">
              {favorites.length} {favorites.length === 1 ? "book" : "books"} saved
            </p>
          </div>
        </div>

        {/* Empty state with Paige */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PaigeOwl variant="empty" size="lg" className="mb-6" />
            <h2 className="font-display font-bold text-2xl text-charcoal-900 dark:text-cream-100 mt-6 mb-2">
              No favorites yet...
            </h2>
            <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 max-w-xs mb-6">
              Go find your next read! Every great collection starts with one book. ✦
            </p>
            <Button variant="primary" onClick={() => navigate("/explore")}>
              Explore Books
            </Button>
          </div>
        )}

        {favorites.length > 0 && (
          <>
            {/* Search */}
            <div className="max-w-md mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={() => {}}
                placeholder="Search your favorites..."
              />
            </div>

            {/* Sort pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {sortOptions.map((sort) => (
                <button
                  key={sort}
                  type="button"
                  onClick={() => setSortBy(sort)}
                  className={`font-body text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                    sortBy === sort
                      ? "bg-gold-400 text-charcoal-900 border-gold-400 shadow-gold"
                      : "bg-cream-100 dark:bg-charcoal-800 text-charcoal-500 dark:text-cream-300 border-cream-300 dark:border-charcoal-700 hover:border-gold-400/50"
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="glass-card rounded-full px-4 py-1.5 font-body text-xs font-bold text-charcoal-500 dark:text-cream-300">
                📚 {favorites.length} books
              </span>
              <span className="glass-card rounded-full px-4 py-1.5 font-body text-xs font-bold text-charcoal-500 dark:text-cream-300">
                ✍️ {authorCount} authors
              </span>
              <span className="glass-card rounded-full px-4 py-1.5 font-body text-xs font-bold text-charcoal-500 dark:text-cream-300">
                🏷️ Top genre: {topGenre}
              </span>
            </div>

            {/* Results info */}
            {searchQuery && (
              <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 mb-4">
                Showing {filtered.length} of {favorites.length} books
              </p>
            )}

            {/* Book grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {sorted.map((book, index) => (
                <div
                  key={book.id}
                  className="animate-scaleIn"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
                >
                  <FavoriteCard
                    book={book}
                    onView={() => navigate(`/book/${book.id}`)}
                    onRemove={removeFavorite}
                  />
                </div>
              ))}
            </div>

            {/* No search results */}
            {searchQuery && sorted.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center animate-fadeIn">
                <PaigeOwl variant="confused" size="md" className="mb-4" />
                <p className="font-body text-sm text-charcoal-500 dark:text-cream-300">
                  No favorites matching &ldquo;{searchQuery}&rdquo;
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
