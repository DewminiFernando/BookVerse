import React from "react";

const PaigeOwl = ({ variant = "hero", size = "md", className = "" }) => {
  // Map size prop to Tailwind dimensions
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-48 h-48",
  };

  // Default size maps depending on variants if not explicitly set
  const defaultSizeMap = {
    hero: "lg",
    empty: "md",
    loading: "sm",
    confused: "md",
    winking: "md",
  };

  const resolvedSize = sizeMap[size] || sizeMap[defaultSizeMap[variant] || "md"];

  // Base Paige styles and parts common across variants
  const renderBaseBody = () => (
    <>
      {/* Ears */}
      <path
        d="M 22 19 C 20 9, 32 9, 36 18"
        fill="#FCF9F2"
        stroke="#E8D48A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 78 19 C 80 9, 68 9, 64 18"
        fill="#FCF9F2"
        stroke="#E8D48A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Main Body */}
      <rect
        x="16"
        y="16"
        width="68"
        height="70"
        rx="34"
        fill="#FCF9F2"
        stroke="#E8D48A"
        strokeWidth="3.5"
      />

      {/* Belly patch */}
      <path
        d="M 28 62 C 28 44, 72 44, 72 62 C 72 76, 28 76, 28 62 Z"
        fill="#FFFBF0"
        opacity="0.85"
      />

      {/* Feet */}
      <ellipse cx="38" cy="85" rx="7" ry="3.5" fill="#D4AF37" />
      <ellipse cx="62" cy="85" rx="7" ry="3.5" fill="#D4AF37" />
    </>
  );

  const renderGlasses = () => (
    <>
      {/* Glasses Frames */}
      <circle cx="36" cy="38" r="13" fill="none" stroke="#D4AF37" strokeWidth="3.5" />
      <circle cx="64" cy="38" r="13" fill="none" stroke="#D4AF37" strokeWidth="3.5" />
      {/* Glasses Bridge */}
      <path d="M 49 38 L 51 38" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
      {/* Glasses temple pins */}
      <path d="M 23 38 L 17 38" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 77 38 L 83 38" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );

  const renderScarf = () => (
    <>
      {/* Scarf Wrapped */}
      <path
        d="M 22 72 C 30 78, 70 78, 78 72 C 81 69, 19 69, 22 72 Z"
        fill="#7E9EB8"
        stroke="#6788A3"
        strokeWidth="1.5"
      />
      {/* Scarf dangle tail */}
      <path
        d="M 60 73 C 63 82, 57 91, 57 91 C 57 91, 52 84, 53 74"
        fill="#7E9EB8"
        stroke="#6788A3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  );

  const renderTinyBook = () => (
    <>
      {/* Book cover */}
      <rect
        x="66"
        y="54"
        width="18"
        height="22"
        rx="3"
        fill="#D4AF37"
        stroke="#FCF9F2"
        strokeWidth="1.5"
      />
      {/* Gold pages details */}
      <line x1="71" y1="59" x2="79" y2="59" stroke="#FCF9F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="71" y1="65" x2="79" y2="65" stroke="#FCF9F2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="71" y1="71" x2="77" y2="71" stroke="#FCF9F2" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );

  switch (variant) {
    case "hero":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${resolvedSize} animate-float hover:animate-wiggle transition-all duration-300 select-none ${className}`}
        >
          {renderBaseBody()}
          {/* Eyes (Shiny, happy) */}
          <circle cx="36" cy="38" r="8" fill="#251E1C" />
          <circle cx="38" cy="35" r="2.5" fill="#FFF" />
          <circle cx="64" cy="38" r="8" fill="#251E1C" />
          <circle cx="66" cy="35" r="2.5" fill="#FFF" />
          {renderGlasses()}
          {/* Cute Orange Beak */}
          <polygon points="50,42 46,47 54,47" fill="#D4AF37" />
          {renderScarf()}
          {renderTinyBook()}
        </svg>
      );

    case "empty":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${resolvedSize} select-none ${className}`}
        >
          {renderBaseBody()}
          {/* Sad, droopy eyes */}
          <path
            d="M 30 40 Q 36 34 42 40"
            fill="none"
            stroke="#251E1C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 58 40 Q 64 34 70 40"
            fill="none"
            stroke="#251E1C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {renderGlasses()}
          {/* Small sad beak */}
          <polygon points="50,43 47,48 53,48" fill="#D4AF37" />
          {renderScarf()}
          
          {/* Empty Book Basket */}
          <path
            d="M 66 65 C 66 65, 68 78, 77 78 C 86 78, 88 65, 88 65 Z"
            fill="none"
            stroke="#A89890"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Handle */}
          <path
            d="M 68 65 C 68 55, 86 55, 86 65"
            fill="none"
            stroke="#A89890"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
        </svg>
      );

    case "loading":
      return (
        <div className={`relative flex items-center justify-center ${resolvedSize} ${className}`}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-spin select-none"
          >
            {renderBaseBody()}
            {/* Spinning/confused swirl eyes */}
            <circle cx="36" cy="38" r="8" fill="none" stroke="#251E1C" strokeWidth="2.5" />
            <circle cx="64" cy="38" r="8" fill="none" stroke="#251E1C" strokeWidth="2.5" />
            {renderGlasses()}
            <polygon points="50,42 46,47 54,47" fill="#D4AF37" />
            {renderScarf()}
          </svg>
          {/* Tiny floating stars around */}
          <div className="absolute top-0 right-0 w-3 h-3 text-gold-400 animate-ping">✦</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 text-gold-300 animate-pulse">✦</div>
        </div>
      );

    case "confused":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${resolvedSize} select-none ${className}`}
        >
          {renderBaseBody()}
          {/* One high, one low eye */}
          <circle cx="36" cy="36" r="7" fill="#251E1C" />
          <circle cx="38" cy="34" r="2" fill="#FFF" />
          <circle cx="64" cy="40" r="7" fill="#251E1C" />
          <circle cx="66" cy="38" r="2" fill="#FFF" />
          {renderGlasses()}
          {/* Wobbly winking beak */}
          <polygon points="50,44 46,48 54,48" fill="#D4AF37" />
          {renderScarf()}
          
          {/* Floating question marks */}
          <text x="6" y="24" fill="#D4AF37" fontSize="14" fontWeight="bold" fontFamily="sans-serif" className="animate-bounce">?</text>
          <text x="84" y="28" fill="#D4AF37" fontSize="14" fontWeight="bold" fontFamily="sans-serif" className="animate-bounce" style={{ animationDelay: "0.2s" }}>?</text>
        </svg>
      );

    case "winking":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${resolvedSize} select-none ${className}`}
        >
          {renderBaseBody()}
          {/* One closed wink eye, one open eye */}
          <path
            d="M 30 38 Q 36 43 42 38"
            fill="none"
            stroke="#251E1C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="64" cy="38" r="8" fill="#251E1C" />
          <circle cx="66" cy="35" r="2.5" fill="#FFF" />
          {renderGlasses()}
          {/* Little happy beak */}
          <polygon points="50,41 46,46 54,46" fill="#D4AF37" />
          
          {/* Sweet slight mouth smile below beak */}
          <path
            d="M 47 50 Q 50 53 53 50"
            fill="none"
            stroke="#251E1C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {renderScarf()}
          {renderTinyBook()}
        </svg>
      );

    default:
      return null;
  }
};

export default PaigeOwl;
