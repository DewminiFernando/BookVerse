import { useMemo, useState } from "react";
import { BookOpen, Star, Heart, Bookmark, Calendar, FileText } from "lucide-react";
import { useBook } from "../../context/BookContext.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

const BookDetailsCard = ({ book }) => {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    addToReadingList,
    readingList,
    updateCurrentPage,
    addReadingSession,
  } = useBook();
  const [pagesRead, setPagesRead] = useState(0);

  const readingEntry = useMemo(
    () => readingList.find((entry) => entry.book.id === book?.id),
    [readingList, book]
  );

  if (!book) return null;

  const favorite = isFavorite(book.id);
  const currentPage = readingEntry?.currentPage || 0;
  const totalPages = book.pages;
  const progressPercent = totalPages ? Math.min(100, (currentPage / totalPages) * 100) : 0;

  const handleFavorite = () => {
    if (favorite) removeFavorite(book.id);
    else addFavorite(book);
  };

  const handleReadingList = () => {
    addToReadingList(book);
  };

  const handleLogSession = (event) => {
    event.preventDefault();
    const pages = Number(pagesRead);
    if (!pages || pages <= 0) return;

    const updatedPage = currentPage + pages;
    updateCurrentPage(book.id, updatedPage);
    addReadingSession({
      date: new Date().toISOString().split("T")[0],
      pagesRead: pages,
      bookId: book.id,
      bookTitle: book.title,
    });
    setPagesRead(0);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 border border-gold-400/20 rounded-3xl bg-cream-100/80 dark:bg-charcoal-800/80">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col items-start gap-4 shrink-0 mx-auto md:mx-0">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="h-72 w-48 rounded-2xl object-cover shadow-float border border-gold-400/10"
              />
            ) : (
              <div className="flex h-72 w-48 items-center justify-center rounded-2xl bg-cream-200 dark:bg-charcoal-900 border border-gold-400/10">
                <BookOpen className="h-10 w-10 text-gold-400 opacity-40" />
              </div>
            )}
            <Button variant={favorite ? "secondary" : "primary"} onClick={handleFavorite} className="w-full rounded-2xl">
              {favorite ? "♡ Saved" : "♡ Save Book"}
            </Button>
            <Button variant="secondary" onClick={handleReadingList} className="w-full rounded-2xl">
              📖 Reading List
            </Button>
          </div>

          <div className="flex-1 w-full text-left">
            <h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-100">
              {book.title}
            </h1>
            <p className="mt-1.5 text-lg font-bold text-gold-500">{book.author || "Unknown Author"}</p>
            
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-charcoal-500 dark:text-cream-300">
              {book.year && <span className="bg-cream-200 dark:bg-charcoal-900 px-3 py-1 rounded-full">{book.year}</span>}
              {book.pages && <span className="bg-sage-200/50 dark:bg-sage-400/10 text-charcoal-700 dark:text-sage-400 px-3 py-1 rounded-full">{book.pages} pages</span>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(book.subjects || []).slice(0, 6).map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-gold-400/20 bg-cream-100 dark:bg-charcoal-900 px-3 py-1 text-xs text-charcoal-900 dark:text-cream-100"
                >
                  {subject}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-charcoal-500 dark:text-cream-300">
              {book.description || "No description available."}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gold-400/20 rounded-3xl bg-cream-100/80 dark:bg-charcoal-800/80">
        <h2 className="font-display text-lg font-bold text-charcoal-900 dark:text-cream-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-500" /> My Reading Progress
        </h2>
        {totalPages ? (
          <div className="mt-4 space-y-3">
            <div className="w-full bg-cream-200 dark:bg-charcoal-900 rounded-full h-3 overflow-hidden border border-gold-400/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-gold-400 to-peach-400 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-charcoal-500 dark:text-cream-300 font-semibold">
              <span>
                Current page: {currentPage} of {totalPages}
              </span>
              <span>{Math.round(progressPercent)}% complete</span>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-xs italic text-charcoal-500 dark:text-cream-300">Page count unavailable</p>
        )}

        <form onSubmit={handleLogSession} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="number"
            min="0"
            value={pagesRead || ""}
            onChange={(event) => setPagesRead(Number(event.target.value))}
            placeholder="I read X pages today"
            className="w-full rounded-2xl border border-gold-400/20 bg-cream-100 px-4 py-2 text-sm text-charcoal-900 dark:text-cream-100 transition-colors duration-200 placeholder:text-charcoal-500 dark:bg-charcoal-900 focus:outline-none focus:border-gold-400"
          />
          <Button type="submit" variant="primary" className="sm:w-40 rounded-2xl">
            Log Session
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BookDetailsCard;
