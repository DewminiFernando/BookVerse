import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { useBook } from "../../context/BookContext.jsx";

const gradients = [
  "from-blush-200 to-blush-100",
  "from-sage-200 to-sage-100",
  "from-butter-200 to-butter-100",
  "from-lavender-200 to-lavender-100",
  "from-peach-200 to-peach-100",
];

const genreColorMap = {
  Fiction: "bg-lavender-200 text-lavender-400 dark:bg-lavender-400/20 dark:text-lavender-400",
  Romance: "bg-blush-200 text-blush-400 dark:bg-blush-400/20 dark:text-blush-400",
  Thriller: "bg-peach-200 text-peach-400 dark:bg-peach-400/20 dark:text-peach-400",
  Fantasy: "bg-sage-200 text-sage-400 dark:bg-sage-400/20 dark:text-sage-400",
  Mystery: "bg-butter-200 text-gold-500 dark:bg-butter-400/20 dark:text-butter-400",
  default: "bg-cream-200 text-charcoal-500 dark:bg-charcoal-800 dark:text-cream-300",
};

const BookCard = ({ book, onClick }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useBook();
  const favorite = isFavorite(book.id);

  const genre = book.genre || book.subjects?.[0] || "General";
  const genreColor = genreColorMap[genre] || genreColorMap.default;
  const gradient = gradients[book.title?.charCodeAt(0) % 5 || 0];

  const handleCardClick = (event) => {
    onClick ? onClick() : navigate(`/book/${book.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass-card rounded-[24px] overflow-hidden group cursor-pointer relative w-full select-none border border-gold-400/10 hover:border-gold-400/40 hover:-translate-y-2.5 hover:rotate-[1deg] hover:shadow-gold duration-300 transition-all ease-spring"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") handleCardClick();
      }}
    >
      {/* Cover Section */}
      <div className="relative overflow-hidden w-full h-64 bg-charcoal-700/5 dark:bg-cream-300/5">
        {/* Genre pill — always visible, top left corner of cover */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`eyebrow px-2.5 py-1 rounded-full font-body font-700 text-[10px] bg-white/95 dark:bg-charcoal-900/95 border border-gold-400/20 shadow-sm ${genreColor}`}>
            {genre}
          </span>
        </div>

        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <BookOpen className="w-12 h-12 text-gold-400 opacity-60" />
          </div>
        )}

        {/* Hover overlay — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-spring bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/60 to-transparent p-4 z-10 flex flex-col justify-end">
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                favorite ? removeFavorite(book.id) : addFavorite(book);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blush-200/90 text-charcoal-900 text-xs font-body font-700 hover:bg-blush-400 hover:scale-105 transition-all"
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-current text-blush-400 animate-heartPop" : ""}`} />
              {favorite ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/book/${book.id}`);
              }}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gold-400 text-charcoal-900 text-xs font-body font-700 hover:bg-gold-500 hover:scale-105 transition-all shadow-sm"
            >
              Details →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-4.5 text-left">
        <h3 className="font-display font-bold text-sm text-charcoal-900 dark:text-cream-100 line-clamp-2 leading-snug">
          {book.title || "Untitled"}
        </h3>
        <p className="font-body text-xs text-charcoal-500 dark:text-cream-300 mt-1 line-clamp-1">
          {book.author || "Unknown Author"}
        </p>
        
        {book.rating ? (
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xs ${
                  star <= Math.round(book.rating) ? "text-gold-400 animate-pulse" : "text-charcoal-300 dark:text-charcoal-700"
                }`}
              >
                ★
              </span>
            ))}
            <span className="font-body text-[10px] text-charcoal-500 dark:text-cream-300 ml-1">
              ({book.ratingsCount || 0})
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 mt-2 text-[10px] font-body text-charcoal-300 dark:text-charcoal-700">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>★</span>
            ))}
            <span className="ml-1">(0)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
