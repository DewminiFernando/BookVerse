import PaigeOwl from "./PaigeOwl.jsx";

const Loader = ({ size = "md", text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <PaigeOwl variant="loading" size={size} />
        {/* Star dust particles */}
        <div className="absolute -top-2 -right-2 text-gold-400 text-sm animate-ping" style={{ animationDuration: "1.5s" }}>✦</div>
        <div className="absolute -bottom-1 -left-2 text-gold-300 text-xs animate-pulse" style={{ animationDuration: "2s" }}>✦</div>
        <div className="absolute top-1/2 -right-4 text-gold-400/60 text-xs animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>✧</div>
        <div className="absolute -top-3 left-1/2 text-gold-300/50 text-xs animate-bounce" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }}>✦</div>
      </div>
      {text ? (
        <p className="font-body text-sm text-charcoal-500 dark:text-cream-300 animate-pulse">
          {text}
        </p>
      ) : null}
    </div>
  );
};

export default Loader;
