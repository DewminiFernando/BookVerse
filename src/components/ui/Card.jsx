const Card = ({ children, className = "", hover = false, onClick }) => (
  <div
    className={`glass-card rounded-3xl transition-all duration-300 ${
      hover ? "cursor-pointer hover:shadow-glass-hover hover:-translate-y-2 hover:border-gold-400/40" : ""
    } ${className}`}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => { if (e.key === "Enter") onClick(); } : undefined}
  >
    {children}
  </div>
);

export default Card;
