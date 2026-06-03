import {
	BarChart2,
	BookOpen,
	Calendar,
	Clock,
	Flame,
	Heart,
	PieChart as PieChartIcon,
	TrendingUp,
	Star,
	Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../context/BookContext.jsx";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import GenreChart from "../components/charts/GenreChart.jsx";
import ReadingTrendChart from "../components/charts/ReadingTrendChart.jsx";
import RatingsChart from "../components/charts/RatingsChart.jsx";
import PaigeOwl from "../components/ui/PaigeOwl.jsx";

const calculateStreak = (sessions) => {
	if (!sessions.length) return 0;
	const dates = [...new Set(sessions.map((session) => session.date))].sort().reverse();
	let streak = 1;
	for (let i = 0; i < dates.length - 1; i += 1) {
		const current = new Date(dates[i]);
		const previous = new Date(dates[i + 1]);
		const diff = (current - previous) / (1000 * 60 * 60 * 24);
		if (diff === 1) streak += 1;
		else break;
	}
	return streak;
};

const useCountUp = (target, duration = 1000) => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		if (target === 0) {
			setCount(0);
			return;
		}
		const increment = target / (duration / 16);
		const timer = setInterval(() => {
			setCount((prev) => {
				if (prev >= target) {
					clearInterval(timer);
					return target;
				}
				return Math.ceil(prev + increment);
			});
		}, 16);
		return () => clearInterval(timer);
	}, [target, duration]);
	return count;
};

const Analytics = () => {
	const navigate = useNavigate();
	const { favorites, readingList, readingSessions } = useBook();
	
	const totalPages = readingSessions.reduce((sum, session) => sum + session.pagesRead, 0);
	const streak = calculateStreak(readingSessions);
	
	const animatedBooks = useCountUp(favorites.length);
	const animatedPages = useCountUp(totalPages);
	const animatedSessions = useCountUp(readingSessions.length);
	const animatedStreak = useCountUp(streak);
	
	const hasFavorites = favorites.length > 0;
	const hasSessions = readingSessions.length > 0;

	// Calculate average rating from favorites
	const avgRating = useMemo(() => {
		const booksWithRatings = favorites.filter((b) => b.rating);
		if (!booksWithRatings.length) return "N/A";
		const sum = booksWithRatings.reduce((acc, b) => acc + Number(b.rating), 0);
		return (sum / booksWithRatings.length).toFixed(1);
	}, [favorites]);

	const chartData = useMemo(() => {
		const grouped = readingSessions.reduce((acc, session) => {
			acc[session.date] = (acc[session.date] || 0) + session.pagesRead;
			return acc;
		}, {});
		return Object.entries(grouped)
			.map(([date, pages]) => ({ date, pages }))
			.sort((a, b) => new Date(a.date) - new Date(b.date));
	}, [readingSessions]);

	const genreData = useMemo(() => {
		const grouped = readingList.reduce((acc, item) => {
			const genre = item.book?.genre || "General";
			acc[genre] = (acc[genre] || 0) + 1;
			return acc;
		}, {});
		return Object.entries(grouped).map(([name, value]) => ({ name, value }));
	}, [readingList]);

	const ratingData = useMemo(() => {
		const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
		let hasAny = false;
		favorites.forEach((b) => {
			const r = Math.round(b.rating);
			if (r >= 1 && r <= 5) {
				counts[r] += 1;
				hasAny = true;
			}
		});
		if (!hasAny) return [];
		return Object.entries(counts).map(([rating, count]) => ({
			rating: `${rating} ★`,
			count,
		}));
	}, [favorites]);

	const recentSessions = useMemo(
		() => [...readingSessions].slice(0, 5).reverse(),
		[readingSessions]
	);

	// Paige's dynamic advice based on reading stats
	const paigeMessage = useMemo(() => {
		if (streak > 3) {
			return `Splendid progress! A ${streak}-day reading streak is remarkable. Your literary sanctuary is absolutely thriving!`;
		}
		if (totalPages > 500) {
			return `Outstanding! You have devoured over ${totalPages} pages. Your reading velocity is a sight to behold.`;
		}
		if (favorites.length > 5) {
			return `A delightful collection! You have saved ${favorites.length} books. Keep adding your favorites to visualize your rating distribution.`;
		}
		return "Welcome to your insights! Log your daily reading sessions or save books to watch your personal analytics map take shape.";
	}, [streak, totalPages, favorites.length]);

	if (!hasFavorites && !hasSessions) {
		return (
			<div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 flex items-center justify-center px-6 py-16 text-center page-enter">
				<div className="max-w-md mx-auto flex flex-col items-center">
					<div className="relative mb-6">
						<PaigeOwl variant="confused" size="lg" />
						<div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center animate-pulse">
							<Sparkles className="w-4 h-4 text-gold-500" />
						</div>
					</div>
					<h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-100">
						No reading insights yet
					</h1>
					<p className="mt-3 text-sm text-charcoal-500 dark:text-cream-300 leading-relaxed">
						Start by saving books to your favorites or logging reading sessions, and Paige will visualize your literary achievements here.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Button variant="primary" onClick={() => navigate("/explore")}>
							Explore Books
						</Button>
						<Button variant="secondary" onClick={() => navigate("/profile")}>
							View Passport
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 px-6 pt-4 pb-10 page-enter">
			<div className="mx-auto max-w-6xl mt-4">
				
				{/* Header Section */}
				<div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
					<div>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-2xl bg-gold-400/10 border border-gold-400/20">
								<BarChart2 className="h-6 w-6 text-gold-500" />
							</div>
							<h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-100">
								Reading Insights
							</h1>
						</div>
						<p className="mt-2 text-sm text-charcoal-500 dark:text-cream-300">
							Your literary journey, visualized through the lens of Paige.
						</p>
					</div>
					
					{/* Desktop Paige Owl Helper bubble */}
					<div className="hidden lg:flex items-center gap-4 max-w-md bg-gold-400/10 border border-gold-400/20 rounded-3xl p-4 animate-fadeIn shadow-gold/5">
						<PaigeOwl variant="winking" size="sm" className="shrink-0" />
						<div className="text-left">
							<p className="font-display italic text-xs font-bold text-gold-600 dark:text-gold-400">
								A Word from Paige
							</p>
							<p className="text-xs text-charcoal-900 dark:text-cream-200 mt-1 leading-relaxed">
								"{paigeMessage}"
							</p>
						</div>
					</div>
				</div>

				{/* 4 Glass Stat Cards Grid */}
				<section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
					{[
						{
							icon: Heart,
							value: animatedBooks,
							label: "Total Books",
							badge: "Favorites",
							color: "text-blush-400",
							bg: "from-blush-200/40 to-cream-100 dark:from-blush-400/10 dark:to-charcoal-800/40",
						},
						{
							icon: BookOpen,
							value: animatedPages,
							label: "Total Pages",
							badge: "Pages Read",
							color: "text-sage-400",
							bg: "from-sage-200/40 to-cream-100 dark:from-sage-400/10 dark:to-charcoal-800/40",
						},
						{
							icon: Flame,
							value: animatedStreak,
							label: "Day Streak",
							badge: `${streak} Days`,
							color: "text-peach-400",
							bg: "from-peach-200/40 to-cream-100 dark:from-peach-400/10 dark:to-charcoal-800/40",
						},
						{
							icon: Star,
							value: avgRating,
							label: "Avg Rating",
							badge: avgRating !== "N/A" ? `${avgRating} ★` : "No ratings",
							color: "text-gold-400",
							bg: "from-butter-200/40 to-cream-100 dark:from-butter-400/10 dark:to-charcoal-800/40",
						},
					].map((stat, index) => {
						const Icon = stat.icon;
						return (
							<div
								key={stat.label}
								className={`glass-card bg-gradient-to-br ${stat.bg} p-6 border border-gold-400/20 rounded-3xl hover:shadow-gold transition-all duration-300 group`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="flex items-center justify-between mb-4">
									<div className={`p-2 rounded-xl bg-white/80 dark:bg-charcoal-900/60 shadow-sm ${stat.color}`}>
										<Icon className="h-5 w-5" />
									</div>
									<span className="eyebrow text-[9px] px-2 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/20">
										{stat.badge}
									</span>
								</div>
								<div className="font-display text-4xl font-extrabold text-charcoal-900 dark:text-cream-100 tracking-tight">
									{stat.value}
								</div>
								<div className="mt-2 text-xs font-semibold text-charcoal-500 dark:text-cream-300">
									{stat.label}
								</div>
							</div>
						);
					})}
				</section>

				{/* Charts Grid */}
				<div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
					{/* Chart 1: Reading Activity */}
					<div className="glass-card lg:col-span-2 p-6 border border-gold-400/20 rounded-3xl bg-cream-100/50 dark:bg-charcoal-800/30">
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
									<TrendingUp className="h-4.5 w-4.5" />
								</div>
								<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
									Reading Velocity
								</h2>
							</div>
							<span className="text-[11px] font-body font-700 text-charcoal-500 dark:text-cream-300 bg-cream-200 dark:bg-charcoal-800 px-2.5 py-1 rounded-full">
								Pages read over time
							</span>
						</div>
						<ReadingTrendChart data={chartData} />
					</div>

					{/* Chart 2: Genre Breakdown */}
					<div className="glass-card p-6 border border-gold-400/20 rounded-3xl bg-cream-100/50 dark:bg-charcoal-800/30 flex flex-col justify-between">
						<div>
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
										<PieChartIcon className="h-4.5 w-4.5" />
									</div>
									<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
										Genre Palette
									</h2>
								</div>
							</div>
							{readingList.length === 0 ? (
								<div className="h-[250px] flex items-center justify-center">
									<EmptyState
										title="No genres yet"
										message="Add books to your reading list to visualize genres."
										icon={PieChartIcon}
									/>
								</div>
							) : (
								<GenreChart data={genreData} />
							)}
						</div>
					</div>
				</div>

				<div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
					{/* Chart 3: Rating Distribution */}
					<div className="glass-card p-6 border border-gold-400/20 rounded-3xl bg-cream-100/50 dark:bg-charcoal-800/30 flex flex-col">
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
									<Star className="h-4.5 w-4.5" />
								</div>
								<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
									Rating Spectrum
								</h2>
							</div>
							<span className="text-[11px] font-body font-700 text-charcoal-500 dark:text-cream-300 bg-cream-200 dark:bg-charcoal-800 px-2.5 py-1 rounded-full">
								Favorites
							</span>
						</div>
						{ratingData.length === 0 ? (
							<div className="flex-1 flex items-center justify-center min-h-[220px]">
								<p className="text-xs text-charcoal-500 dark:text-cream-300 text-center italic">
									Favorites with star ratings will map out here.
								</p>
							</div>
						) : (
							<RatingsChart data={ratingData} />
						)}
					</div>

					{/* Column 2: Recent Sessions */}
					<div className="glass-card lg:col-span-2 p-6 border border-gold-400/20 rounded-3xl bg-cream-100/50 dark:bg-charcoal-800/30 flex flex-col">
						<div className="mb-4 flex items-center gap-2">
							<div className="p-1.5 rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-500">
								<Clock className="h-4.5 w-4.5" />
							</div>
							<h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100">
								Recent Sessions
							</h2>
						</div>
						
						{hasSessions ? (
							<div className="divide-y divide-gold-400/10 dark:divide-gold-400/5 flex-1 overflow-y-auto">
								{recentSessions.map((session, sIdx) => (
									<div
										key={`${session.bookId}-${session.date}-${session.pagesRead}-${sIdx}`}
										className="flex items-center justify-between py-3.5 hover:bg-gold-400/5 rounded-xl px-2 transition-colors duration-200"
									>
										<div className="flex-1 min-w-0 pr-4">
											<p className="text-sm font-semibold text-charcoal-900 dark:text-cream-100 truncate">
												{session.bookTitle}
											</p>
											<p className="text-xs text-charcoal-500 dark:text-cream-300 mt-0.5">{session.date}</p>
										</div>
										<span className="shrink-0 px-3 py-1 text-xs font-bold rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 dark:text-gold-400 shadow-sm">
											+{session.pagesRead} pages
										</span>
									</div>
								))}
							</div>
						) : (
							<div className="flex-1 flex items-center justify-center min-h-[200px]">
								<p className="text-sm text-charcoal-500 dark:text-cream-300 text-center italic">
									Log your sessions in Book Details to track recent history.
								</p>
							</div>
						)}
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Analytics;
