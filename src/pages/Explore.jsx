import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, X } from "lucide-react";
import SearchBar from "../components/ui/SearchBar.jsx";
import FilterDropdown from "../components/ui/FilterDropdown.jsx";
import Button from "../components/ui/Button.jsx";
import BookCard from "../components/books/BookCard.jsx";
import BookGrid from "../components/books/BookGrid.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";
import { useBook } from "../context/BookContext.jsx";
import {
  searchBooks,
  getBooksBySubject,
  getTrendingBooks,
} from "../services/booksApi.js";

const genreOptions = [
  "All",
  "Fiction",
  "Romance",
  "Thriller",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Self Help",
  "Biography",
  "History",
  "Horror",
  "Young Adult",
];

const sortOptions = ["Newest", "Relevance"];

const moodToSubject = {
  "Dark Academia": "gothic fiction",
  Cozy: "cozy mysteries",
  Adventurous: "adventure",
  Romantic: "romance",
  Melancholic: "literary fiction",
  Thrilling: "thriller",
  Inspiring: "self-help",
  Fantastical: "fantasy",
};

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentMood } = useBook();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [activeMood, setActiveMood] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchMode, setSearchMode] = useState("trending");

  const getOptions = (nextIndex = 0) => ({
    sort: selectedSort === "Newest" ? "newest" : "relevance",
    startIndex: nextIndex,
  });

  const loadTrending = async () => {
    setLoading(true);
    const results = await getTrendingBooks();
    setBooks(results);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mood = params.get("mood");
    if (!mood) {
      setSearchMode("trending");
      loadTrending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mood = params.get("mood");
    if (mood) {
      const subject = moodToSubject[mood];
      if (subject) {
        setSearchMode("mood");
        setActiveMood(mood);
        setLoading(true);
        getBooksBySubject(subject).then((results) => {
          setBooks(results);
          setLoading(false);
        });
      }
    }
  }, [location.search]);

  const loadGenre = async (genre) => {
    setLoading(true);
    const results = await getBooksBySubject(genre, {
      sort: selectedSort === "Newest" ? "newest" : "relevance",
      startIndex: 0,
    });
    setBooks(results);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedGenre && selectedGenre !== "All" && searchMode === "genre") {
      loadGenre(selectedGenre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, selectedSort]);

  const handleSearch = async (q) => {
    setSearchMode("search");
    setQuery(q);
    setLoading(true);
    const results = await searchBooks(q, {
      sort: selectedSort === "Newest" ? "newest" : "relevance",
      startIndex: 0,
    });
    setBooks(results);
    setLoading(false);
  };

  const handleSearchSubmit = () => {
    if (!queryInput.trim()) return;
    setSelectedGenre("All");
    setActiveMood(null);
    handleSearch(queryInput.trim());
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSearchMode("genre");
    setQuery("");
    setQueryInput("");
    setActiveMood(null);
    navigate("/explore");
  };

  const handleClearMood = () => {
    setSearchMode("trending");
    setSelectedGenre("All");
    setQuery("");
    setActiveMood(null);
    navigate("/explore", { replace: true });
    loadTrending();
  };

  const handleLoadMore = () => {
    const nextIndex = startIndex + 20;
    setLoading(true);
    if (searchMode === "search") {
      searchBooks(query, getOptions(nextIndex)).then((results) => {
        setBooks((prev) => [...prev, ...results]);
        setHasMore(results.length === 20);
        setStartIndex(nextIndex);
        setLoading(false);
      });
    } else if (searchMode === "genre") {
      getBooksBySubject(selectedGenre, getOptions(nextIndex)).then((results) => {
        setBooks((prev) => [...prev, ...results]);
        setHasMore(results.length === 20);
        setStartIndex(nextIndex);
        setLoading(false);
      });
    } else {
      getTrendingBooks().then((results) => {
        setBooks((prev) => [...prev, ...results]);
        setHasMore(results.length === 20);
        setStartIndex(nextIndex);
        setLoading(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 page-enter">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10 text-center mt-12">
          <p className="eyebrow mb-3">discover something new</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-charcoal-900 dark:text-cream-100 leading-tight">
            Discover Your <em className="text-gold-400 not-italic">Next Chapter</em>
          </h1>
          <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 mt-3 max-w-md mx-auto">
            Search millions of books powered by Google Books API, or browse by mood, genre, and more ✦
          </p>
        </div>

        {/* Search bar with Paige */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <SearchBar
            value={queryInput}
            onChange={setQueryInput}
            onSubmit={handleSearchSubmit}
            placeholder="Search books, authors, genres..."
          />
          {/* Paige sits on right edge of search bar */}
          <div className="absolute -right-8 -top-6 hidden md:block">
            <PaigeOwl variant="winking" size="sm" />
          </div>
        </div>

        {/* Active mood badge */}
        {searchMode === "mood" && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="font-body text-sm text-charcoal-500 dark:text-cream-300">Showing mood:</span>
            <div className="flex items-center gap-2 glass-card rounded-full px-4 py-1.5">
              <span className="font-body font-bold text-sm text-gold-500">
                {new URLSearchParams(location.search).get("mood")}
              </span>
              <button
                type="button"
                onClick={handleClearMood}
                className="text-charcoal-300 hover:text-charcoal-900 dark:hover:text-cream-100 ml-1 transition-colors"
                aria-label="Clear mood"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="eyebrow text-charcoal-300">Filter:</span>
          <FilterDropdown
            label={`Genre: ${selectedGenre}`}
            options={genreOptions}
            selected={selectedGenre}
            onChange={handleGenreChange}
          />
          <FilterDropdown
            label={`Sort: ${selectedSort}`}
            options={sortOptions}
            selected={selectedSort}
            onChange={(value) => setSelectedSort(value)}
          />

          {/* Active filter tags */}
          {selectedGenre && selectedGenre !== "All" && (
            <div className="flex items-center gap-1.5 bg-gold-400/15 border border-gold-400/40 rounded-full px-3 py-1">
              <span className="font-body text-xs font-bold text-gold-600">{selectedGenre}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedGenre("All");
                  loadTrending();
                }}
                className="text-gold-400 hover:text-gold-600 transition-colors"
                aria-label={`Remove ${selectedGenre}`}
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Results label */}
        {query && (
          <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 mb-6">
            Showing results for{" "}
            <span className="font-bold text-charcoal-900 dark:text-cream-100">&ldquo;{query}&rdquo;</span>
          </p>
        )}

        {/* Section heading above grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-charcoal-900 dark:text-cream-100">
            {searchMode === "trending" && (
              <><em className="text-gold-400 not-italic">Popular</em> Right Now</>
            )}
            {searchMode === "search" && (
              <>Search <em className="text-gold-400 not-italic">Results</em></>
            )}
            {searchMode === "genre" && (
              <><em className="text-gold-400 not-italic">{selectedGenre}</em> Books</>
            )}
            {searchMode === "mood" && (
              <>Books for your <em className="text-gold-400 not-italic">mood</em></>
            )}
          </h2>
          {books.length > 0 && (
            <span className="font-body text-xs text-charcoal-300 dark:text-cream-300">
              {books.length} books found
            </span>
          )}
        </div>

        {/* Book Grid */}
        <BookGrid
          books={books}
          loading={loading}
          emptyMessage="Try a different search or filter."
          emptyVariant="confused"
        />

        {/* Load More */}
        {books.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="secondary" onClick={handleLoadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More Books"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
