import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useBook } from "../context/BookContext.jsx";
import { getRecentBooks, getTrendingBooks } from "../services/booksApi.js";
import BookCard from "../components/books/BookCard.jsx";
import FloatingMagicBooks from "../components/books/FloatingMagicBooks.jsx";
import Button from "../components/ui/Button.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";
import RecommendationCard from "../components/recommendations/RecommendationCard.jsx";

const quotes = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "It is only with the heart that one can see rightly.", author: "Antoine de Saint-Exupéry" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "A book is a dream that you hold in your hands.", author: "Neil Gaiman" },
  { text: "One must always be careful of books.", author: "Cassandra Clare" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
];

const moods = [
  { mood: "Dark Academia", emoji: "🏛️", description: "Gothic & atmospheric" },
  { mood: "Cozy", emoji: "☕", description: "Warm & comforting" },
  { mood: "Adventurous", emoji: "🗺️", description: "Epic journeys" },
  { mood: "Romantic", emoji: "🌸", description: "Love & tender moments" },
  { mood: "Melancholic", emoji: "🌧️", description: "Bittersweet & reflective" },
  { mood: "Thrilling", emoji: "⚡", description: "Edge of your seat" },
  { mood: "Inspiring", emoji: "🌟", description: "Life-changing reads" },
  { mood: "Fantastical", emoji: "🔮", description: "Magic & wonder" },
];

const moodGradients = {
  "Dark Academia": "from-lavender-200 to-lavender-100",
  "Cozy": "from-peach-200 to-butter-100",
  "Adventurous": "from-sage-200 to-sage-100",
  "Romantic": "from-blush-200 to-blush-100",
  "Melancholic": "from-blue-soft to-cream-100",
  "Thrilling": "from-peach-200 to-peach-100",
  "Inspiring": "from-butter-200 to-butter-100",
  "Fantastical": "from-lavender-200 to-lavender-100",
};

const bokehColors = [
  "#FFE8F0", "#D4AF37", "#E8F5EE", "#EEE8FF",
  "#FFE8D8", "#7E9EB8", "#FFF8E8", "#FFE8F0",
];

const Home = () => {
  const navigate = useNavigate();
  const { favorites, readingSessions, currentMood, setCurrentMood } = useBook();

  // --- Hero covers ---
  const [heroCovers, setHeroCovers] = useState([]);

  // --- Marquee books ---
  const [marqueeBooks, setMarqueeBooks] = useState([]);

  // --- Trending ---
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const trendingRef = useRef(null);

  // --- Quotes ---
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const intervalRef = useRef(null);

  const changeQuote = () => {
    setQuoteVisible(false);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setQuoteVisible(true);
    }, 400);
  };

  const startInterval = () => {
    intervalRef.current = setInterval(changeQuote, 8000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Load hero covers + marquee books ---
  useEffect(() => {
    let active = true;
    getRecentBooks().then((books) => {
      if (!active) return;
      const withCovers = books.filter((b) => b.coverUrl);
      setHeroCovers(withCovers.slice(0, 6).map((b) => b.coverUrl));
      setMarqueeBooks(withCovers);
    });
    return () => { active = false; };
  }, []);

  // --- Load trending ---
  useEffect(() => {
    let active = true;
    setTrendingLoading(true);
    getTrendingBooks()
      .then((books) => {
        if (active) setTrendingBooks(books);
      })
      .finally(() => {
        if (active) setTrendingLoading(false);
      });
    return () => { active = false; };
  }, []);

  const showStats = favorites.length > 0 || readingSessions.length > 0;

  return (
    <div className="min-h-screen">

      {/* ───────────────────────────────────────────────
          1. CINEMATIC HERO
      ─────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-cream-100 dark:bg-charcoal-900 pt-4 md:pt-8 pb-48">

        {/* Bokeh background dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-xl animate-bokeh opacity-40"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                background: bokehColors[i],
                left: `${10 + i * 11}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")"
        }} />

        {/* Two column layout */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full -translate-y-6 md:-translate-y-8">

          {/* LEFT column */}
          <div className="text-left animate-slideUp">

            {/* Main heading */}
            <h1 className="font-display font-bold text-5xl md:text-6xl text-charcoal-900 dark:text-cream-100 leading-tight mb-6">
              Your next favourite{" "}
              <em className="text-gold-400 not-italic">story</em>
              {" "}is waiting
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base text-charcoal-500 dark:text-cream-300 leading-relaxed max-w-md mb-8">
              Discover millions of books, track your reading journey, and find your next great read — all in one cozy place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary" size="lg" onClick={() => navigate("/explore")}>
                Explore Books
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate("/favorites")}>
                My Reading List
              </Button>
            </div>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              {["10M+ Books", "Free Forever", "No Sign Up"].map((stat) => (
                <span key={stat} className="glass-card rounded-full px-4 py-1.5 font-body text-xs font-bold text-charcoal-500 dark:text-cream-300">
                  ✦ {stat}
                </span>
              ))}
            </div>

            {/* Rotating quote */}
            <div
              className={`transition-opacity duration-500 ${quoteVisible ? "opacity-100" : "opacity-0"} mt-8 max-w-sm`}
            >
              <p className="font-display italic text-sm text-charcoal-500 dark:text-cream-300 leading-relaxed">
                &ldquo;{quotes[quoteIndex].text}&rdquo;
              </p>
              <p className="font-body text-xs text-charcoal-300 dark:text-cream-300 mt-1">
                — {quotes[quoteIndex].author}
              </p>
            </div>
          </div>

          {/* RIGHT column — Paige + floating books */}
          <div className="relative flex items-center justify-center min-h-[400px]">
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">

            {/* Radial glow behind Paige */}
            <div className="absolute inset-6 bg-gradient-to-br from-blush-200/50 via-cream-200/20 to-transparent rounded-full blur-2xl" />

            {/* Paige the owl — large hero variant */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PaigeOwl variant="hero" size="lg" />
            </div>

            {/* 3D Animated magical turned-over/page-flipping books */}
            <FloatingMagicBooks />
            </div>
          </div>

        </div>

        {/* Book marquee strip — inside hero at bottom */}
        <div className="absolute bottom-0 left-0 w-full pb-8">
          <div className="relative">
            <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
              {[...marqueeBooks, ...marqueeBooks].map((book, i) => (
                book.coverUrl ? (
                  <img
                    key={`${book.id}-${i}`}
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-44 w-32 object-cover rounded-2xl shadow-card flex-shrink-0 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/book/${book.id}`)}
                    loading="lazy"
                  />
                ) : null
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-cream-100 dark:from-charcoal-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-cream-100 dark:from-charcoal-900 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          2. WAVY SVG DIVIDER
      ─────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-cream-200 dark:fill-charcoal-800">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ───────────────────────────────────────────────
          4. MOOD SELECTOR
      ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">What&apos;s your vibe today</p>
          <h2 className="font-display font-bold text-3xl text-charcoal-900 dark:text-cream-100">
            Pick a mood, find your{" "}
            <em className="text-gold-400 not-italic">perfect read</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {moods.map((m, index) => (
            <RecommendationCard
              key={m.mood}
              mood={m.mood}
              emoji={m.emoji}
              description={m.description}
              isSelected={currentMood === m.mood}
              onClick={() => {
                setCurrentMood(m.mood);
                navigate(`/explore?mood=${encodeURIComponent(m.mood)}`);
              }}
              gradient={moodGradients[m.mood]}
              style={{ animationDelay: `${index * 0.08}s` }}
            />
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          5. TRENDING BOOKS
      ─────────────────────────────────────────────── */}
      <section className="bg-cream-200 dark:bg-charcoal-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow mb-1">Hot right now</p>
              <h2 className="font-display font-bold text-2xl text-charcoal-900 dark:text-cream-100">
                Trending <em className="text-gold-400 not-italic">this week</em>
              </h2>
            </div>
            <Button variant="ghost" onClick={() => navigate("/explore")}>
              See all →
            </Button>
          </div>

          {/* Horizontal scroll with arrows */}
          <div className="relative">
            <button
              type="button"
              onClick={() => trendingRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center shadow-gold hover:bg-gold-400/20 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gold-400" />
            </button>

            <div
              ref={trendingRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            >
              {trendingLoading ? (
                Array(8).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-40 h-64 glass-card rounded-3xl animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 dark:from-charcoal-800 dark:via-charcoal-700 dark:to-charcoal-800"
                  />
                ))
              ) : (
                trendingBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex-shrink-0 w-36 cursor-pointer group"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    {/* Cover — grows on hover */}
                    <div className="overflow-hidden rounded-2xl shadow-card transition-all duration-300 group-hover:shadow-float">
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-36 h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-36 h-52 bg-gradient-to-br from-cream-200 to-cream-300 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center rounded-2xl">
                          <BookOpen className="w-10 h-10 text-gold-400 opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Title and author below cover — no background box */}
                    <div className="mt-3 px-1">
                      <p className="font-display text-sm font-bold text-charcoal-900 dark:text-cream-100 line-clamp-2 leading-snug group-hover:text-gold-500 transition-colors duration-200">
                        {book.title}
                      </p>
                      <p className="font-sans text-xs text-charcoal-500 dark:text-cream-300 mt-1 line-clamp-1">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => trendingRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center shadow-gold hover:bg-gold-400/20 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gold-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          6. READING STATS PREVIEW
      ─────────────────────────────────────────────── */}
      {showStats ? (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <p className="eyebrow mb-2">your journey</p>
            <h2 className="font-display font-bold text-2xl text-charcoal-900 dark:text-cream-100">
              Reading <em className="text-gold-400 not-italic">at a glance</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Books Saved", value: favorites.length, bg: "from-blush-200 to-blush-100", icon: "📚" },
              { label: "Reading Sessions", value: readingSessions.length, bg: "from-sage-200 to-sage-100", icon: "📖" },
              { label: "Current Mood", value: currentMood || "Not set", bg: "from-lavender-200 to-lavender-100", icon: "✨" },
            ].map((stat) => (
              <div key={stat.label} className={`glass-card rounded-3xl p-6 text-center bg-gradient-to-br ${stat.bg}`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-display font-bold text-3xl text-charcoal-900 dark:text-cream-100">{stat.value}</div>
                <div className="font-body text-xs text-charcoal-500 dark:text-cream-300 mt-1 eyebrow">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="ghost" onClick={() => navigate("/analytics")}>
              View Full Analytics →
            </Button>
          </div>
        </section>
      ) : null}

      {/* ───────────────────────────────────────────────
          7. CTA BANNER
      ─────────────────────────────────────────────── */}
      <section className="mx-6 mb-16 rounded-4xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-charcoal-900 to-charcoal-800 dark:from-charcoal-800 dark:to-charcoal-900 px-10 py-16 text-center relative">
          {/* Gold bokeh dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-20 rounded-full bg-gold-400/10 blur-xl animate-float"
                style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 2) * 40}%`, animationDelay: `${i * 0.7}s` }}
              />
            ))}
          </div>
          <p className="eyebrow text-gold-400 mb-3 relative z-10">start your journey</p>
          <h2 className="font-display font-bold text-3xl text-cream-100 mb-3 relative z-10">
            Ready to find your next{" "}
            <em className="text-gold-400 not-italic">great read?</em>
          </h2>
          <p className="font-body text-sm text-cream-300 mb-8 max-w-md mx-auto relative z-10">
            Search from millions of books powered by Google Books API. Free forever. ✦
          </p>
          <div className="relative z-10">
            <Button variant="primary" size="lg" onClick={() => navigate("/explore")}>
              Start Exploring
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
