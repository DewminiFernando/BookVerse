import React from "react";

const spineColors = [
  "from-blush-400 to-blush-600 dark:from-blush-500 dark:to-blush-700",
  "from-sage-400 to-sage-600 dark:from-sage-500 dark:to-sage-700",
  "from-lavender-400 to-lavender-600 dark:from-lavender-500 dark:to-lavender-700",
  "from-butter-400 to-butter-600 dark:from-butter-500 dark:to-butter-700",
  "from-peach-400 to-peach-600 dark:from-peach-500 dark:to-peach-700",
  "from-blue-dust to-blue-light dark:from-blue-700 dark:to-blue-dust",
];

const FloatingMagicBook = ({ spineColor, index }) => {
  // Variations in open angle for a natural scattered look
  const leftAngle = -12 - (index * 3) % 8;
  const rightAngle = 12 + (index * 2) % 8;
  
  // Angle calculated based on index to distribute books evenly in circular orbit
  const angle = (index / 6) * 2 * Math.PI;
  const leftPercent = 50 + 42 * Math.cos(angle);
  const topPercent = 50 + 40 * Math.sin(angle);

  return (
    <div
      className="absolute z-10 w-14 h-10 perspective-500 preserve-3d animate-magic-float"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        animationDelay: `${index * 0.5}s`,
      }}
    >
      {/* 3D Book Cover Base (representing the back cover) */}
      <div className={`absolute inset-0 bg-gradient-to-r ${spineColor} rounded-sm shadow-gold opacity-95 border border-gold-400/20`} />

      {/* Pages Container */}
      <div className="absolute inset-[1.5px] bg-transparent preserve-3d">
        {/* Left Page (resting page) */}
        <div 
          className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-cream-50 to-cream-100 dark:from-charcoal-700 dark:to-charcoal-800 rounded-l-[1px] origin-right shadow-inner border-r border-gold-400/10"
          style={{ transform: `rotateY(${leftAngle}deg)` }}
        />

        {/* Right Page (resting page) */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cream-50 to-cream-100 dark:from-charcoal-700 dark:to-charcoal-800 rounded-r-[1px] origin-left shadow-inner border-l border-gold-400/10"
          style={{ transform: `rotateY(${rightAngle}deg)` }}
        />

        {/* Flipping Page 1 */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cream-50 to-cream-100 dark:from-charcoal-700 dark:to-charcoal-800 rounded-r-[1px] origin-left border-l border-gold-400/10 shadow-sm animate-page-flip-left"
          style={{
            animationDelay: `${index * 0.4}s`
          }}
        />

        {/* Flipping Page 2 */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cream-50 to-cream-100 dark:from-charcoal-700 dark:to-charcoal-800 rounded-r-[1px] origin-left border-l border-gold-400/10 shadow-sm animate-page-flip-left"
          style={{
            animationDelay: `${index * 0.4 + 1.6}s`
          }}
        />
      </div>

      {/* Magical sparkling particles */}
      <span className="absolute -top-1.5 -right-1.5 text-gold-400 animate-pulse text-[9px] pointer-events-none">✦</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-gold-400 animate-pulse text-[7px] pointer-events-none" style={{ animationDelay: "1s" }}>✦</span>
    </div>
  );
};

const FloatingMagicBooks = () => {
  return (
    <>
      {spineColors.map((color, i) => (
        <FloatingMagicBook key={i} spineColor={color} index={i} />
      ))}
    </>
  );
};

export default FloatingMagicBooks;
