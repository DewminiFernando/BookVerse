const RecommendationCard = ({
  mood,
  emoji,
  description,
  isSelected,
  onClick,
  gradient = "from-blush-200 to-blush-100",
  className = "",
  style,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={style}
    className={`glass-card rounded-3xl p-5 text-center transition-all duration-300 animate-slideUp ${
      isSelected
        ? `bg-gradient-to-br ${gradient} shadow-gold border-2 border-gold-400/60 scale-105`
        : "hover:scale-[1.03] hover:shadow-glass-hover hover:border-gold-400/40"
    } ${className}`}
  >
    <span role="img" aria-label={mood} className="text-3xl block mb-2 leading-none">
      {emoji}
    </span>
    <div className="mt-2 text-sm font-bold font-body text-charcoal-900 dark:text-cream-100">
      {mood}
    </div>
    <p className="mt-1 text-xs font-body text-charcoal-500 dark:text-cream-300">{description}</p>
  </button>
);

export default RecommendationCard;
