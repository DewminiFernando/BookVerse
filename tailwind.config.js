export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFBF0",
          100: "#FCF9F2",
          200: "#FAF6EE",
          300: "#F5EDD8",
        },
        charcoal: {
          900: "#1A1412",
          800: "#251E1C",
          700: "#3D3330",
          500: "#6B5C58",
          300: "#A89890",
        },
        gold: {
          300: "#E8D48A",
          400: "#D4AF37",
          500: "#C5A830",
          600: "#A88C20",
        },
        blue: {
          dust: "#7E9EB8",
          light: "#B8D0E8",
          soft: "#EBF3FA",
        },
        blush: {
          100: "#FFF0F5",
          200: "#FFE8F0",
          400: "#FFB8D4",
        },
        sage: {
          100: "#F0F8F2",
          200: "#E8F5EE",
          400: "#A8D4B8",
        },
        butter: {
          100: "#FFFBF0",
          200: "#FFF8E8",
          400: "#FFE8A0",
        },
        lavender: {
          100: "#F5F0FF",
          200: "#EEE8FF",
          400: "#C4B0FF",
        },
        peach: {
          100: "#FFF0E8",
          200: "#FFE8D8",
          400: "#FFB898",
        },
      },
      fontFamily: {
        display: ["Libre Caslon Text", "Georgia", "serif"],
        body: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["11px", { letterSpacing: "2px", fontWeight: "800" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-hover": "0 24px 56px rgba(212,175,55,0.12)",
        gold: "0 8px 24px rgba(212,175,55,0.25)",
        "gold-lg": "0 16px 48px rgba(212,175,55,0.3)",
        float: "0 20px 60px rgba(26,20,18,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        card: "0 4px 24px rgba(26,20,18,0.08)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        bokeh: {
          "0%": { transform: "translateY(0px) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-30px) scale(1.1)", opacity: "0.3" },
          "100%": { transform: "translateY(-60px) scale(0.8)", opacity: "0" },
        },
        heartPop: {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        countUp: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pageEnter: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        fadeIn: "fadeIn 0.4s ease-out forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
        slideRight: "slideRight 0.5s ease-out forwards",
        scaleIn: "scaleIn 0.3s ease-out forwards",
        float: "float 3.5s ease-in-out infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        shimmer: "shimmer 1.5s linear infinite",
        blob: "blob 8s ease-in-out infinite",
        bokeh: "bokeh 4s ease-in-out infinite",
        heartPop: "heartPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        pageEnter: "pageEnter 0.4s ease-out forwards",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
}