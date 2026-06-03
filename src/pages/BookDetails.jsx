import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, ChevronLeft, Calendar, FileText, Star, Heart, Bookmark, ExternalLink, Sparkles, BookOpenCheck } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Loader from "../components/ui/Loader.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import BookCard from "../components/books/BookCard.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";
import { useBook } from "../context/BookContext.jsx";
import { getBookDetails, getBooksBySubject } from "../services/booksApi.js";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    readingList,
    addToReadingList,
    updateCurrentPage,
    addReadingSession,
  } = useBook();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagesReadToday, setPagesReadToday] = useState(0);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getBookDetails(id)
      .then((result) => {
        if (isMounted) setBook(result);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    const subject = book?.subjects?.[0];
    if (!subject) {
      setSimilarBooks([]);
      return undefined;
    }
    getBooksBySubject(subject)
      .then((results) => {
        if (!isMounted) return;
        const filtered = results.filter((item) => item.id !== book.id).slice(0, 10);
        setSimilarBooks(filtered);
      })
      .catch(() => {
        if (isMounted) setSimilarBooks([]);
      });
    return () => {
      isMounted = false;
    };
  }, [book]);

  const readingEntry = readingList.find((entry) => entry.book.id === book?.id);
  const currentPage = readingEntry?.currentPage ?? 0;
  const inReadingList = Boolean(readingEntry);
  const favorite = book?.id ? isFavorite(book.id) : false;

  const description = useMemo(() => {
    if (!book?.description) return "No description available.";
    return book.description.replace(/<[^>]+>/g, "");
  }, [book]);

  // Calculate reading streak from sessions
  const readingStreak = useMemo(() => {
    if (!book) return 0;
    const { readingSessions } = (() => {
      try {
        const stored = localStorage.getItem("bookverse_reading_sessions");
        return { readingSessions: stored ? JSON.parse(stored) : [] };
      } catch {
        return { readingSessions: [] };
      }
    })();
    const today = new Date().toLocaleDateString();
    const todaySessions = readingSessions.filter((s) => s.date === today && s.bookId === book.id);
    return todaySessions.length;
  }, [book, currentPage]);

  const handleLogSession = () => {
    const pages = Number(pagesReadToday);
    if (!pages || pages < 1 || !book?.id) return;
    const newPage = currentPage + pages;
    updateCurrentPage(book.id, newPage);
    addReadingSession({
      date: new Date().toLocaleDateString(),
      pagesRead: pages,
      bookId: book.id,
      bookTitle: book.title,
    });
    setPagesReadToday(0);
  };

  // Dynamic recommendation quote from Paige
  const paigeRecommendation = useMemo(() => {
    if (!book) return "";
    const genre = book.genre || book.subjects?.[0] || "general fiction";
    const title = book.title || "this book";
    const author = book.authors?.length ? book.authors[0] : book.author || "the author";
    
    if (book.rating && book.rating >= 4.2) {
      return `Paige says: 'An absolute masterpiece of ${genre}! Readers worldwide rate this ${book.rating}★ for a reason. Grab a hot beverage and settle in — ${author} is about to take you on a cinematic adventure!'`;
    }
    return `Paige says: 'A wonderful selection! Getting lost in the worlds of ${author} is a pure delight. This ${genre} choice is highly recommended for a warm, cozy evening.'`;
  }, [book]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 flex items-center justify-center">
        <Loader size="lg" text="Unfolding book secrets..." />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 px-6 py-10">
        <EmptyState title="Book Not Found" message="The requested literary piece is missing from our shelves." icon={BookOpen} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 page-enter">

      {/* Cinematic Hero Backdrop blur cover */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt=""
            className="w-full h-full object-cover scale-110 blur-md brightness-50"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-butter-300 via-gold-400 to-peach-300 opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/60 to-cream-100 dark:to-charcoal-900 transition-colors duration-200" />
        
        {/* Absolute Back Button overlay */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-20 left-6 inline-flex items-center justify-center gap-2 bg-cream-100/10 hover:bg-cream-100/20 backdrop-blur-md border border-white/20 rounded-full pl-3 pr-4 py-2 font-body text-xs font-bold text-cream-100 transition-all duration-200 hover:-translate-x-1"
        >
          <ChevronLeft className="w-4 h-4 text-gold-300" /> Back to Sanctuary
        </button>
      </div>

      {/* Main Details overlapping Hero */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 md:-mt-48 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* LEFT Column: Cover Artwork and Actions */}
          <div className="flex-shrink-0 mx-auto md:mx-0 select-none">
            <div className="relative group">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-48 h-72 md:w-56 md:h-80 object-cover rounded-3xl shadow-float transition-all duration-300 hover:rotate-0 rotate-[1.5deg] hover:-translate-y-2.5 animate-scaleIn border border-gold-400/25"
                />
              ) : (
                <div className="w-48 h-72 md:w-56 md:h-80 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-butter-200 to-cream-200 shadow-float border-2 border-dashed border-gold-400/30 animate-scaleIn">
                  <BookOpen className="w-16 h-16 text-gold-400 opacity-50 mb-3" />
                  <span className="text-[10px] eyebrow text-gold-500">Artwork missing</span>
                </div>
              )}
              {/* Gold frame behind cover */}
              <div className="absolute inset-0 border-2 border-dashed border-gold-400/30 rounded-3xl -rotate-[1.5deg] -z-10 group-hover:rotate-0 transition-transform duration-300" />
            </div>

            {/* Passport Action Bento list */}
            <div className="flex flex-col gap-3 mt-8 w-48 md:w-56">
              <Button
                variant={favorite ? "secondary" : "primary"}
                size="md"
                onClick={() => (favorite ? removeFavorite(book.id) : addFavorite(book))}
                className="w-full flex items-center justify-center gap-2 rounded-2xl"
              >
                <Heart className={`w-4 h-4 ${favorite ? "fill-current text-blush-400" : ""}`} />
                {favorite ? "Saved Favorite" : "Save to Favorites"}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  if (!inReadingList) addToReadingList(book);
                }}
                disabled={inReadingList}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border-gold-400/20"
              >
                <Bookmark className="w-4 h-4 text-gold-500" />
                {inReadingList ? "Devouring Now" : "AddTo Reading List"}
              </Button>
              
              {book.previewLink && (
                <a
                  href={book.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/20 text-xs font-body font-700 text-gold-600 dark:text-gold-400 transition-colors text-center"
                >
                  Read Preview <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT Column: Book Details Info */}
          <div className="flex-1 w-full pt-4 md:pt-16">
            
            {/* Year & Page indicators */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="eyebrow px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-500 text-[10px]">
                {book.genre || "General"}
              </span>
              {book.year && (
                <span className="flex items-center gap-1 bg-cream-200 dark:bg-charcoal-800 text-charcoal-500 dark:text-cream-300 rounded-full px-3 py-1 font-body text-xs font-bold shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" /> {book.year}
                </span>
              )}
              {book.pages && (
                <span className="flex items-center gap-1 bg-sage-200/50 dark:bg-sage-400/10 text-charcoal-700 dark:text-sage-400 rounded-full px-3 py-1 font-body text-xs font-bold shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-sage-400" /> {book.pages} pages
                </span>
              )}
            </div>

            {/* Book Title */}
            <h1 className="font-display font-bold text-3xl md:text-5xl text-charcoal-900 dark:text-cream-100 leading-tight mb-2 tracking-tight">
              {book.title}
            </h1>

            {/* Authors */}
            <p className="font-body font-bold text-gold-500 text-lg mb-6">
              by <span className="hover:underline cursor-pointer">{book.authors?.length ? book.authors.join(", ") : book.author || "Unknown Author"}</span>
            </p>

            {/* 4 Stats Bento Row */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: "Rating Score", value: book.rating ? `${book.rating} ★` : "N/A", icon: Star, color: "text-gold-400", isLong: false },
                { label: "Total Length", value: book.pages ? `${book.pages} pgs` : "N/A", icon: FileText, color: "text-sage-400", isLong: false },
                { label: "Publishing Year", value: book.year || "N/A", icon: Calendar, color: "text-peach-400", isLong: false },
                { label: "Genre Class", value: book.genre || "General", icon: BookOpen, color: "text-blush-400", isLong: true },
              ].map((item, idx) => {
                const StatIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card bg-cream-100/50 dark:bg-charcoal-800/40 py-4 px-5 border border-gold-400/15 rounded-2xl flex items-center gap-3 w-auto min-w-fit flex-1 sm:flex-none"
                  >
                    <div className={`p-2 rounded-xl bg-white dark:bg-charcoal-900 shrink-0 ${item.color}`}>
                      <StatIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-charcoal-500 dark:text-cream-300 uppercase tracking-wider whitespace-nowrap">
                        {item.label}
                      </p>
                      <p className={`text-sm font-display font-bold text-charcoal-900 dark:text-cream-100 mt-0.5 ${item.isLong ? "whitespace-normal break-words" : "whitespace-nowrap"}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommendation Speech Bubble (Word from Paige) */}
            <div className="glass-card bg-gradient-to-r from-butter-200/30 to-cream-100 dark:from-charcoal-800/80 dark:to-charcoal-900/60 p-5 border border-gold-400/20 rounded-3xl flex gap-4 items-center mb-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-2 right-2 text-gold-400 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <PaigeOwl variant="hero" size="sm" className="shrink-0" />
              <div className="text-left">
                <p className="font-display italic text-xs font-bold text-gold-600 dark:text-gold-400">
                  A Word from Paige
                </p>
                <p className="text-xs text-charcoal-700 dark:text-cream-200 mt-1 leading-relaxed italic">
                  {paigeRecommendation}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-cream-100 mb-2">Description</h3>
              <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 leading-relaxed max-w-prose">
                {description}
              </p>
            </div>

            {/* Subject Tags */}
            {book.subjects?.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xs text-charcoal-500 dark:text-cream-300 uppercase tracking-widest">Library tags</h3>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 6).map((subject) => (
                    <span
                      key={subject}
                      className="bg-cream-100 dark:bg-charcoal-800/60 text-charcoal-500 dark:text-cream-200 rounded-full px-3 py-1 font-body text-xs border border-gold-400/10 dark:border-charcoal-700/50 hover:bg-gold-400/5 cursor-default transition-all duration-200"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reading Progress Tracker Log box */}
        {inReadingList && (
          <div className="glass-card rounded-3xl p-6 mt-10 border border-gold-400/20 bg-cream-100/50 dark:bg-charcoal-800/40 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2.5 mb-5 border-b border-gold-400/10 pb-3">
              <BookOpenCheck className="w-5 h-5 text-gold-500 animate-pulse" />
              <h3 className="font-display font-bold text-lg text-charcoal-900 dark:text-cream-100">
                Log Reading Progress
              </h3>
            </div>

            {/* Progress bar with color stages */}
            {book.pages && (
              <div className="mb-6">
                <div className="w-full bg-cream-200 dark:bg-charcoal-900 rounded-full h-4 mb-2.5 overflow-hidden border border-gold-400/10">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-spring"
                    style={{
                      width: `${Math.min((currentPage / book.pages) * 100, 100)}%`,
                      background:
                        currentPage / book.pages < 0.3
                          ? "linear-gradient(90deg, #FFB8D4, #FFE8F0)"
                          : currentPage / book.pages < 0.7
                          ? "linear-gradient(90deg, #D4AF37, #E8D48A)"
                          : "linear-gradient(90deg, #A8D4B8, #E8F5EE)",
                    }}
                  />
                </div>
                <div className="flex justify-between font-body text-xs text-charcoal-500 dark:text-cream-300 font-semibold px-1">
                  <span>
                    Page {currentPage} of {book.pages}
                  </span>
                  <span className="text-gold-500">{Math.round((currentPage / book.pages) * 100)}% complete</span>
                </div>
              </div>
            )}

            {/* Log session input */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="number"
                min="1"
                value={pagesReadToday || ""}
                onChange={(e) => setPagesReadToday(Number(e.target.value))}
                placeholder="Pages devoured"
                className="w-36 bg-cream-100 dark:bg-charcoal-800 border-2 border-gold-400/20 dark:border-charcoal-700 rounded-2xl px-4 py-2 font-body text-sm text-charcoal-900 dark:text-cream-100 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-colors"
              />
              <Button variant="primary" size="md" onClick={handleLogSession} className="rounded-2xl px-6">
                Log Session 🔥
              </Button>
              {readingStreak > 0 && (
                <span className="font-body text-xs font-bold text-gold-600 dark:text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3.5 py-1.5 rounded-full animate-pulse ml-2">
                  🔥 {readingStreak} log{readingStreak !== 1 ? "s" : ""} logged today
                </span>
              )}
            </div>
          </div>
        )}

        {/* Similar Books slider */}
        {similarBooks.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <p className="eyebrow mb-1">you might also like</p>
              <h2 className="font-display font-bold text-2xl text-charcoal-900 dark:text-cream-100">
                Similar <em className="text-gold-400 not-italic">Reads</em>
              </h2>
            </div>
            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
              {similarBooks.map((b) => (
                <div key={b.id} className="flex-shrink-0 w-44 hover:scale-[1.02] transition-transform duration-300">
                  <BookCard
                    book={b}
                    onClick={() => {
                      navigate(`/book/${b.id}`);
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
