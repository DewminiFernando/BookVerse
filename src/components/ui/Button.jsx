import React from "react";

const variants = {
  primary:
    "bg-gold-400 text-charcoal-900 hover:bg-gold-500 hover:-translate-y-0.5 shadow-gold hover:shadow-gold-lg font-extrabold",
  secondary:
    "bg-transparent border-2 border-gold-400 text-gold-400 hover:bg-blush-100 dark:hover:bg-charcoal-800 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-charcoal-500 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-charcoal-800",
  danger:
    "bg-peach-400 text-charcoal-900 hover:bg-peach-200",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`font-body font-800 rounded-full transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
      variants[variant] || variants.primary
    } ${sizes[size] || sizes.md} ${className}`}
  >
    {children}
    {variant === "primary" && " ✦"}
  </button>
);

export default Button;
