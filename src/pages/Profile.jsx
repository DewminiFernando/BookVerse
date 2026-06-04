import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Pencil, Settings, Target, User, Sparkles, Check, Trash2, Moon, Sun, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useBook } from "../context/BookContext.jsx";
import { seedDemoProfile } from "../context/BookContext.jsx";
import { DEMO_PROFILE_NAME, DEMO_GOALS } from "../data/demoData.js";
import Button from "../components/ui/Button.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";

const PROFILE_NAME_KEY = "bookverse_profile_name";
const GOALS_KEY = "bookverse_goals";
const STORAGE_KEYS = [
	"bookverse_favorites",
	"bookverse_reading_list",
	"bookverse_reading_sessions",
	"bookverse_theme",
	"bookverse_mood",
	PROFILE_NAME_KEY,
	GOALS_KEY,
];

const loadProfileName = () => {
	if (typeof window === "undefined") return DEMO_PROFILE_NAME;
	return localStorage.getItem(PROFILE_NAME_KEY) || DEMO_PROFILE_NAME;
};

const loadGoals = () => {
	if (typeof window === "undefined") return DEMO_GOALS;
	try {
		const stored = localStorage.getItem(GOALS_KEY);
		if (!stored) return DEMO_GOALS;
		const parsed = JSON.parse(stored);
		return {
			yearlyGoal: parsed.yearlyGoal || DEMO_GOALS.yearlyGoal,
			dailyGoal: parsed.dailyGoal || DEMO_GOALS.dailyGoal,
		};
	} catch {
		return DEMO_GOALS;
	}
};

const ShelfBook = ({ item, isHovered, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  const { readingList } = useBook();
  const book = item.book;
  
  const progressItem = readingList.find(
    (entry) => entry.id === book?.id || entry.bookId === book?.id || entry.book?.id === book?.id
  );
  const hasProgress = !!progressItem;
  const currentPage = hasProgress ? (progressItem.currentPage ?? progressItem.page ?? 0) : undefined;
  const totalPages = book?.pages ?? book?.pageCount ?? progressItem?.pages ?? "N/A";
  const progress = (hasProgress && typeof totalPages === "number" && totalPages > 0)
    ? Math.round((currentPage / totalPages) * 100)
    : null;

  // Random slight tilt for natural bookshelf look
  const tilt = ((book?.title?.charCodeAt(0) || 0) % 7) - 3;  // -3 to +3 degrees

  // Cozy spine gradient colors for placeholders
  const spineColors = [
    'from-blush-200 to-blush-400',
    'from-sage-200 to-sage-400',
    'from-lavender-200 to-lavender-400',
    'from-butter-200 to-butter-400',
    'from-peach-200 to-peach-400',
    'from-blue-soft to-blue-dust',
  ];
  const spineColor = spineColors[(book?.title?.charCodeAt(0) || 0) % spineColors.length];

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{ transform: `rotate(${tilt}deg)`, transformOrigin: 'bottom center' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Book cover image or placeholder card */}
      {book?.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-16 h-24 object-cover rounded-md shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:brightness-105 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]"
          onClick={() => navigate(`/book/${book.id}`)}
        />
      ) : (
        /* Cozy cover placeholder card for books without cover */
        <div 
          className={`w-16 h-24 bg-gradient-to-b ${spineColor} rounded-md shadow-card flex flex-col justify-between p-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:brightness-105 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]`}
          onClick={() => navigate(`/book/${book.id}`)}
        >
          <p className="font-display text-charcoal-900 font-extrabold leading-tight text-[9px] line-clamp-3">
            {book?.title || "Untitled"}
          </p>
          <BookOpen className="w-3.5 h-3.5 text-charcoal-900/40 self-end" />
        </div>
      )}

      {/* Hover popup card */}
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 w-60 p-4 rounded-2xl bg-cream-50/95 dark:bg-charcoal-800/95 border border-gold-400/25 dark:border-gold-400/15 shadow-float pointer-events-none animate-scaleIn text-left"
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Book title */}
          <p className="font-display font-bold text-sm text-charcoal-900 dark:text-cream-100 line-clamp-2 leading-snug mb-1">
            {book?.title || "Untitled"}
          </p>

          {/* Author */}
          <p className="font-sans text-xs text-gold-500 font-semibold mb-2">
            by {book?.author || "Unknown Author"}
          </p>

          {/* Reading progress */}
          <div className="mb-2">
            <div className="flex justify-between font-sans text-[10px] text-charcoal-500 dark:text-cream-300 mb-1 font-semibold">
              {currentPage !== undefined ? (
                <span>Page {currentPage} of {totalPages}</span>
              ) : (
                <span>Not started</span>
              )}
              {progress !== null && (
                <span className="text-gold-500 font-bold">{progress}%</span>
              )}
            </div>
            {progress !== null && (
              <div className="w-full bg-cream-200 dark:bg-charcoal-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: progress < 30
                      ? 'linear-gradient(90deg, #FFB8D4, #FFE8F0)'
                      : progress < 70
                      ? 'linear-gradient(90deg, #D4AF37, #E8D48A)'
                      : 'linear-gradient(90deg, #A8D4B8, #E8F5EE)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-sans text-[10px] text-charcoal-500 dark:text-cream-300 line-clamp-3 leading-relaxed border-t border-gold-400/10 pt-1.5">
            {book?.description || "No description available yet."}
          </p>

          {/* Popup arrow pointing down */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream-50 dark:bg-charcoal-800 rotate-45 border-r border-b border-gold-400/25 dark:border-gold-400/15 shadow-sm" />
        </div>
      )}
    </div>
  );
};

const Profile = () => {
	const navigate = useNavigate();
	const { favorites, readingList, readingSessions, theme, toggleTheme, resetToDemo } = useBook();
	const [displayName, setDisplayName] = useState(loadProfileName);
	const [isEditingName, setIsEditingName] = useState(false);
	const [yearlyGoal, setYearlyGoal] = useState(() => loadGoals().yearlyGoal);
	const [dailyGoal, setDailyGoal] = useState(() => loadGoals().dailyGoal);
	const [mounted, setMounted] = useState(false);
	const [hoveredBookId, setHoveredBookId] = useState(null);
	const [shelfStartIndex, setShelfStartIndex] = useState(0);
	const [visibleShelfCount, setVisibleShelfCount] = useState(7);

	useEffect(() => {
		const handleResize = () => {
			const w = window.innerWidth;
			if (w < 640) {
				setVisibleShelfCount(3);
			} else if (w < 1024) {
				setVisibleShelfCount(5);
			} else {
				setVisibleShelfCount(7);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const bookshelfBooks = useMemo(() => {
		const combined = [];
		const seenIds = new Set();

		// Add reading list books (which have status/currentPage progress)
		readingList.forEach((entry) => {
			if (entry.book && entry.book.id && !seenIds.has(entry.book.id)) {
				seenIds.add(entry.book.id);
				combined.push({
					book: entry.book,
					currentPage: entry.currentPage
				});
			}
		});

		// Add favorites that are not already in the bookshelf
		favorites.forEach((book) => {
			if (book && book.id && !seenIds.has(book.id)) {
				seenIds.add(book.id);
				combined.push({
					book: book,
					currentPage: undefined
				});
			}
		});

		return combined;
	}, [readingList, favorites]);

	const maxShelfStart = Math.max(0, bookshelfBooks.length - visibleShelfCount);

	const visibleShelfBooks = useMemo(() => {
		return bookshelfBooks.slice(
			shelfStartIndex,
			shelfStartIndex + visibleShelfCount
		);
	}, [bookshelfBooks, shelfStartIndex, visibleShelfCount]);

	const showShelfArrows = bookshelfBooks.length > visibleShelfCount;

	useEffect(() => {
		setShelfStartIndex((prev) =>
			Math.max(0, Math.min(prev, Math.max(0, bookshelfBooks.length - visibleShelfCount)))
		);
	}, [bookshelfBooks.length, visibleShelfCount]);

	const handleShelfPrev = () => {
		setShelfStartIndex((prev) => Math.max(0, prev - 1));
	};

	const handleShelfNext = () => {
		setShelfStartIndex((prev) => Math.min(maxShelfStart, prev + 1));
	};

	useEffect(() => {
		if (typeof window === "undefined") return;
		localStorage.setItem(PROFILE_NAME_KEY, displayName);
	}, [displayName]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		localStorage.setItem(GOALS_KEY, JSON.stringify({ yearlyGoal, dailyGoal }));
	}, [yearlyGoal, dailyGoal]);

	useEffect(() => {
		// Seed default profile values on first visit
		seedDemoProfile();
		const timer = setTimeout(() => setMounted(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const totalPages = readingSessions.reduce((sum, session) => sum + session.pagesRead, 0);
	
	const avgPages = readingSessions.length
		? Math.round(totalPages / readingSessions.length)
		: 0;
		
	const yearProgress = yearlyGoal
		? Math.min(Math.round((favorites.length / yearlyGoal) * 100), 100)
		: 0;
		
	const dayProgress = dailyGoal
		? Math.min(Math.round((avgPages / dailyGoal) * 100), 100)
		: 0;

	const currentYear = new Date().getFullYear();
	const currentReads = useMemo(
		() => readingList.filter((entry) => {
			if (entry.status !== "reading") return false;
			const totalPages = entry.book?.pages || entry.book?.pageCount || 0;
			if (totalPages > 0 && entry.currentPage >= totalPages) return false;
			return true;
		}),
		[readingList]
	);

	const handleNameSave = () => {
		const trimmed = displayName.trim();
		setDisplayName(trimmed || "Book Lover");
		setIsEditingName(false);
	};

	const handleClearData = () => {
		const confirmed = window.confirm(
			"Are you sure? This will delete all your reading data."
		);
		if (!confirmed) return;
		STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
		window.location.reload();
	};

	const handleResetDemo = () => {
		const confirmed = window.confirm(
			"Reset to demo data? This will replace your current favorites, reading list, and analytics with the preloaded demo."
		);
		if (!confirmed) return;
		resetToDemo();
	};

	// Determine custom passport level title based on books read/saved
	const readerTitle = useMemo(() => {
		const saved = favorites.length;
		if (saved >= 20) return "Grand Arch-Librarian";
		if (saved >= 10) return "Scribbler & Scholar";
		if (saved >= 5) return "Avid Page-Turner";
		return "Cozy Wanderer";
	}, [favorites.length]);

	return (
		<div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 px-6 lg:px-8 pt-8 pb-16 page-enter">
			<div className="mx-auto max-w-6xl mt-4">
				
				{/* Header Section */}
				<div className="mb-12 lg:mb-14 flex items-center gap-3">
					<div className="p-2 rounded-2xl bg-gold-400/10 border border-gold-400/20">
						<User className="h-6 w-6 text-gold-500" />
					</div>
					<h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-100">
						Reader Passport
					</h1>
				</div>

				<div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-3">
					
					{/* LEFT COLUMN: Passport Details */}
					<div className="md:col-span-1 space-y-8">
						{/* Passport Avatar Card */}
						<div className="glass-card p-6 text-center border border-gold-400/20 rounded-3xl bg-gradient-to-b from-butter-200/30 to-cream-100 dark:from-charcoal-800/80 dark:to-charcoal-900/60 shadow-md relative overflow-hidden group">
							<div className="absolute top-3 right-3 text-gold-400 animate-pulse">
								<Sparkles className="w-4 h-4" />
							</div>
							
							{/* Styled Profile Badge Frame */}
							<div className="mx-auto mb-5 relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-400 p-0.5 shadow-gold animate-float">
								<div className="w-full h-full rounded-full bg-cream-100 dark:bg-charcoal-900 flex items-center justify-center overflow-hidden">
									<PaigeOwl variant="hero" size="sm" />
								</div>
							</div>

							{/* Passport Title */}
							<span className="eyebrow text-[9px] px-2.5 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 dark:text-gold-400">
								{readerTitle}
							</span>

							{/* Editable Display Name */}
							<div className="mt-4 flex items-center justify-center gap-2">
								{isEditingName ? (
									<div className="flex items-center gap-1.5 bg-white/80 dark:bg-charcoal-900/80 border border-gold-400/30 rounded-2xl px-2 py-1">
										<input
											type="text"
											value={displayName}
											onChange={(event) => setDisplayName(event.target.value)}
											onBlur={handleNameSave}
											onKeyDown={(event) => {
												if (event.key === "Enter") handleNameSave();
											}}
											className="w-32 bg-transparent text-center font-display text-base font-bold text-charcoal-900 dark:text-cream-100 focus:outline-none"
											autoFocus
										/>
										<button onClick={handleNameSave} className="text-gold-500 hover:text-gold-600">
											<Check className="w-4 h-4" />
										</button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<span className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100 truncate max-w-[160px]">
											{displayName}
										</span>
										<button
											type="button"
											onClick={() => setIsEditingName(true)}
											className="text-charcoal-500 hover:text-gold-500 dark:text-cream-300 transition-colors"
											aria-label="Edit display name"
										>
											<Pencil className="h-3.5 w-3.5" />
										</button>
									</div>
								)}
							</div>

							<p className="mt-2 text-xs italic text-charcoal-500 dark:text-cream-300 leading-relaxed">
								"Devouring books, one cozy sanctuary at a time."
							</p>
							
							<div className="border-t border-gold-400/10 dark:border-gold-400/5 my-4" />
							
							<div className="flex items-center justify-between text-[11px] text-charcoal-500 dark:text-cream-300 font-semibold px-2">
								<span>Joined Passport</span>
								<span className="text-charcoal-900 dark:text-cream-100 font-bold">{currentYear}</span>
							</div>
						</div>

						{/* Quick Mini Stats Bento Cards */}
						<div className="space-y-3">
							{[
								{ label: "Saved Books", value: favorites.length, bg: "bg-blush-200/30 text-blush-400" },
								{ label: "Reading List", value: readingList.length, bg: "bg-sage-200/30 text-sage-400" },
								{ label: "Pages devoured", value: totalPages, bg: "bg-lavender-200/30 text-lavender-400" },
							].map((stat) => (
								<div key={stat.label} className="glass-card p-4 flex items-center justify-between border border-gold-400/15 rounded-2xl bg-cream-100/40 dark:bg-charcoal-800/40 hover:scale-[1.02] transition-transform duration-200">
									<span className="text-xs font-semibold text-charcoal-500 dark:text-cream-300">{stat.label}</span>
									<span className="text-lg font-display font-extrabold text-gold-500">{stat.value}</span>
								</div>
							))}
						</div>
					</div>

					{/* RIGHT COLUMN: Goals, Currently Reading, Settings */}
					<div className="md:col-span-2 space-y-8 animate-slideUp">
						
						{/* Card 1: Goals */}
						<div className="glass-card p-6 border border-gold-400/20 rounded-3xl bg-cream-100/60 dark:bg-charcoal-800/40 shadow-sm">
							<div className="mb-6 flex items-center gap-2.5">
								<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
									<Target className="h-4.5 w-4.5" />
								</div>
								<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
									Reading Ambitions
								</h2>
							</div>

							<div className="grid gap-6 sm:grid-cols-2">
								{/* Yearly Goal */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-xs font-bold text-charcoal-500 dark:text-cream-300">
											Yearly Reading Target
										</span>
										<div className="flex items-center gap-1">
											<input
												type="number"
												min={1}
												value={yearlyGoal}
												onChange={(event) => setYearlyGoal(Number(event.target.value) || 1)}
												className="w-12 text-center rounded-lg border border-gold-400/30 bg-cream-100 dark:bg-charcoal-900 text-xs font-bold text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400/50 py-1"
											/>
											<span className="text-xs text-charcoal-500 dark:text-cream-300">books</span>
										</div>
									</div>
									<div className="h-3 w-full rounded-full bg-cream-200 dark:bg-charcoal-900 overflow-hidden relative border border-gold-400/10">
										<div
											className="h-3 rounded-full bg-gradient-to-r from-blush-400 to-gold-400 transition-all duration-1000 ease-out"
											style={{ width: mounted ? `${yearProgress}%` : "0%" }}
										/>
									</div>
									<div className="flex items-center justify-between text-[11px] font-semibold text-charcoal-500 dark:text-cream-300">
										<span>{favorites.length} of {yearlyGoal} saved</span>
										<span className="text-gold-500">{yearProgress}%</span>
									</div>
								</div>

								{/* Daily Goal */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-xs font-bold text-charcoal-500 dark:text-cream-300">
											Daily Page Target
										</span>
										<div className="flex items-center gap-1">
											<input
												type="number"
												min={1}
												value={dailyGoal}
												onChange={(event) => setDailyGoal(Number(event.target.value) || 1)}
												className="w-12 text-center rounded-lg border border-gold-400/30 bg-cream-100 dark:bg-charcoal-900 text-xs font-bold text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400/50 py-1"
											/>
											<span className="text-xs text-charcoal-500 dark:text-cream-300">pages</span>
										</div>
									</div>
									<div className="h-3 w-full rounded-full bg-cream-200 dark:bg-charcoal-900 overflow-hidden relative border border-gold-400/10">
										<div
											className="h-3 rounded-full bg-gradient-to-r from-sage-400 to-gold-400 transition-all duration-1000 ease-out"
											style={{ width: mounted ? `${dayProgress}%` : "0%" }}
										/>
									</div>
									<div className="flex items-center justify-between text-[11px] font-semibold text-charcoal-500 dark:text-cream-300">
										<span>Avg {avgPages} pages/session</span>
										<span className="text-gold-500">{dayProgress}%</span>
									</div>
								</div>
							</div>
						</div>

						{/* Card 2: Currently Reading */}
						<div className="glass-card p-6 border border-gold-400/20 rounded-3xl bg-cream-100/60 dark:bg-charcoal-800/40 shadow-sm">
							<div className="mb-4 flex items-center gap-2.5">
								<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
									<BookOpen className="h-4.5 w-4.5" />
								</div>
								<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
									Devouring Currently
								</h2>
							</div>

							{currentReads.length ? (
								<div className="space-y-4 divide-y divide-gold-400/10 dark:divide-gold-400/5">
									{currentReads.map((entry) => {
										const progress = entry.book.pages
											? Math.min(Math.round((entry.currentPage / entry.book.pages) * 100), 100)
											: 0;
										return (
											<div
												key={entry.book.id}
												className="flex items-center gap-4 py-3 first:pt-0 hover:bg-gold-400/5 rounded-xl px-2 transition-colors duration-200"
											>
												{entry.book.coverUrl ? (
													<img
														src={entry.book.coverUrl}
														alt={entry.book.title}
														className="h-14 w-10 rounded-lg object-cover shadow-sm shrink-0 border border-gold-400/10"
													/>
												) : (
													<div className="flex h-14 w-10 items-center justify-center rounded-lg bg-gold-400/10 shrink-0">
														<BookOpen className="h-4.5 w-4.5 text-gold-500" />
													</div>
												)}
												<div className="flex-1 min-w-0">
													<p className="text-sm font-bold text-charcoal-900 dark:text-cream-100 truncate">
														{entry.book.title}
													</p>
													<p className="text-xs text-charcoal-500 dark:text-cream-300 truncate">
														{entry.book.author || "Unknown Author"}
													</p>
													{entry.book.pages && (
														<div className="mt-2.5 flex items-center gap-3">
															<div className="h-2 w-full rounded-full bg-cream-200 dark:bg-charcoal-900 overflow-hidden border border-gold-400/5">
																<div
																	className="h-2 rounded-full bg-gradient-to-r from-gold-400 to-peach-400"
																	style={{ width: `${progress}%` }}
																/>
															</div>
															<span className="text-[10px] font-bold text-gold-600 shrink-0">{progress}%</span>
														</div>
													)}
												</div>
												<Button
													variant="secondary"
													size="sm"
													onClick={() => navigate(`/book/${entry.book.id}`)}
													className="shrink-0 text-xs px-3.5"
												>
													Resume →
												</Button>
											</div>
										);
									})}
								</div>
							) : (
								<div className="py-6 text-center">
									<p className="text-sm italic text-charcoal-500 dark:text-cream-300">
										No books currently in progress. Select a book details page to start reading!
									</p>
								</div>
							)}
						</div>

						{/* Card 3: Passport Settings */}
						<div className="glass-card p-6 border border-gold-400/20 rounded-3xl bg-cream-100/60 dark:bg-charcoal-800/40 shadow-sm">
							<div className="mb-6 flex items-center gap-2.5">
								<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
									<Settings className="h-4.5 w-4.5" />
								</div>
								<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
									Passport Controls
								</h2>
							</div>

							<div className="space-y-5">
								{/* Theme settings row */}
								<div className="flex items-center justify-between border-b border-gold-400/10 dark:border-gold-400/5 pb-4">
									<div>
										<p className="text-sm font-bold text-charcoal-900 dark:text-cream-100">
											Visual Aesthetic
										</p>
										<p className="text-xs text-charcoal-500 dark:text-cream-300 mt-0.5">Toggle warm cream or night charcoal mode</p>
									</div>
									<button
										type="button"
										onClick={toggleTheme}
										className={`relative h-6 w-12 rounded-full border border-gold-400/20 transition-colors duration-300 ${
											theme === "dark" ? "bg-charcoal-800" : "bg-butter-200"
										}`}
										aria-label="Toggle dark mode"
									>
										<span
											className={`absolute top-0.5 h-4.5 w-4.5 rounded-full shadow flex items-center justify-center transition-transform duration-300 ${
												theme === "dark" 
													? "translate-x-6 bg-gold-500" 
													: "translate-x-1 bg-gold-400"
											}`}
										>
											{theme === "dark" ? (
												<Moon className="w-2.5 h-2.5 text-charcoal-900" />
											) : (
												<Sun className="w-2.5 h-2.5 text-charcoal-900" />
											)}
										</span>
									</button>
								</div>

								{/* Reset Demo Data */}
								<div className="flex items-center justify-between border-b border-gold-400/10 dark:border-gold-400/5 pb-4">
									<div>
										<p className="text-sm font-bold text-charcoal-900 dark:text-cream-100">
											Demo Showcase
										</p>
										<p className="text-xs text-charcoal-500 dark:text-cream-300 mt-0.5">
											Restore preloaded books & reading history
										</p>
									</div>
									<Button
										variant="ghost"
										onClick={handleResetDemo}
										className="border border-gold-400/30 hover:bg-gold-400/10 dark:hover:bg-gold-400/10 text-gold-600 dark:text-gold-400 px-4 py-2 flex items-center gap-1.5 text-xs font-bold rounded-2xl transition-colors duration-200"
									>
										<RotateCcw className="w-3.5 h-3.5" /> RESET DEMO
									</Button>
								</div>

								{/* Danger Zone Wiping Data */}
								<div className="flex items-center justify-between pt-2">
									<div>
										<p className="text-sm font-bold text-charcoal-900 dark:text-cream-100 text-red-500/80">
											Danger Zone
										</p>
										<p className="text-xs text-charcoal-500 dark:text-cream-300 mt-0.5">
											Permanently delete passport logs & collections
										</p>
									</div>
									<Button 
										variant="ghost" 
										onClick={handleClearData}
										className="border border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 px-4 py-2 flex items-center gap-1.5 text-xs font-bold rounded-2xl transition-colors duration-200"
									>
										<Trash2 className="w-3.5 h-3.5" /> WIPE PASSPORT
									</Button>
								</div>
							</div>
						</div>
					</div>

				</div>

				{/* My Bookshelf Section */}
				<div className="mt-12 lg:mt-16 animate-slideUp">
					<div className="mb-6">
						<h2 className="font-display font-bold text-2xl text-charcoal-900 dark:text-cream-100">
							My <em className="text-gold-400 not-italic">Bookshelf</em>
						</h2>
					</div>

					{bookshelfBooks.length === 0 ? (
						<div className="glass-card rounded-3xl p-8 text-center">
							<p className="font-sans text-sm text-charcoal-500 dark:text-cream-300">
								No books on your shelf yet. Add some from book detail pages ✦
							</p>
						</div>
					) : (
						/* Bookshelf rack */
						<div className="glass-card rounded-3xl p-6 overflow-visible relative">

							{/* Shelf visual */}
							<div className="relative overflow-visible">

								{/* Left Navigation Arrow */}
								{showShelfArrows && (
									<button
										type="button"
										onClick={handleShelfPrev}
										disabled={shelfStartIndex === 0}
										className={`absolute -left-2 top-12 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full border bg-cream-50 dark:bg-charcoal-800 shadow-md transition-all duration-200 ${
											shelfStartIndex === 0
												? "opacity-30 cursor-not-allowed border-gold-400/10 text-gold-500/40"
												: "border-gold-400/30 hover:border-gold-400/60 hover:bg-gold-400/10 text-gold-500"
										}`}
										aria-label="Previous books"
									>
										<ChevronLeft className="w-5 h-5" />
									</button>
								)}

								{/* Books row */}
								<div className="flex gap-2 items-end overflow-visible pb-3 relative z-10 px-6 justify-center">
									{visibleShelfBooks.map((item, index) => (
										<ShelfBook
											key={item.book?.id || index}
											item={item}
											isHovered={hoveredBookId === item.book?.id}
											onMouseEnter={() => setHoveredBookId(item.book?.id)}
											onMouseLeave={() => setHoveredBookId(null)}
										/>
									))}
								</div>

								{/* Right Navigation Arrow */}
								{showShelfArrows && (
									<button
										type="button"
										onClick={handleShelfNext}
										disabled={shelfStartIndex >= maxShelfStart}
										className={`absolute -right-2 top-12 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full border bg-cream-50 dark:bg-charcoal-800 shadow-md transition-all duration-200 ${
											shelfStartIndex >= maxShelfStart
												? "opacity-30 cursor-not-allowed border-gold-400/10 text-gold-500/40"
												: "border-gold-400/30 hover:border-gold-400/60 hover:bg-gold-400/10 text-gold-500"
										}`}
										aria-label="Next books"
									>
										<ChevronRight className="w-5 h-5" />
									</button>
								)}

								{/* Shelf plank */}
								<div className="h-4 bg-gradient-to-b from-gold-400/60 to-gold-500/40 rounded-b-lg shadow-md relative z-20" />

								{/* Shelf shadow */}
								<div className="h-2 bg-gradient-to-b from-charcoal-900/20 to-transparent rounded-b-xl" />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);

};

export default Profile;
