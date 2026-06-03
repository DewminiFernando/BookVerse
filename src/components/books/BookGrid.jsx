import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import BookCard from "./BookCard.jsx";
import PaigeOwl from "../ui/PaigeOwl.jsx";

const BookGrid = ({ books = [], loading = false, emptyMessage = "Try a new search.", emptyVariant = "confused" }) => {
  const navigate = useNavigate();

  if (loading && !books.length) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="glass-card rounded-3xl overflow-hidden"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {/* Cover shimmer */}
            <div className="relative h-64 overflow-hidden bg-cream-200 dark:bg-charcoal-700">
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.08) 40%, rgba(212,175,55,0.15) 50%, rgba(212,175,55,0.08) 60%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
            {/* Info shimmer */}
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 rounded-full bg-cream-300 dark:bg-charcoal-700">
                <div
                  className="h-full w-full rounded-full animate-shimmer"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.1) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
              <div className="h-3 w-1/2 rounded-full bg-cream-300 dark:bg-charcoal-700">
                <div
                  className="h-full w-full rounded-full animate-shimmer"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.1) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animationDelay: "0.3s",
                  }}
                />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="h-3 w-3 rounded-full bg-cream-300 dark:bg-charcoal-700" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="flex w-full flex-col items-center py-16 text-center animate-fadeIn">
        <PaigeOwl variant={emptyVariant} size="lg" className="mb-6" />
        <h3 className="mb-2 font-display text-xl font-bold text-charcoal-900 dark:text-cream-100">
          No books found
        </h3>
        <p className="text-sm font-body text-charcoal-500 dark:text-cream-300 max-w-xs">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="animate-slideUp"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
        >
          <BookCard
            book={book}
            onClick={() => navigate(`/book/${book.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
