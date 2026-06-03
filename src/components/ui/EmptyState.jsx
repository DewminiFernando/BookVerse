import { Heart } from "lucide-react";
import Button from "./Button.jsx";
import PaigeOwl from "./PaigeOwl.jsx";

const EmptyState = ({ icon: Icon, title, message, action }) => {
  // Determine which PaigeOwl variant to render based on the icon passed in
  // Heart icon → empty (sad owl with empty basket, for favorites)
  // Everything else → confused (owl with question marks, for search)
  const isHeartIcon = Icon === Heart;
  const owlVariant = isHeartIcon ? "empty" : "confused";

  return (
    <div className="flex w-full flex-col items-center py-16 text-center animate-fadeIn">
      <PaigeOwl variant={owlVariant} size="lg" className="mb-6" />
      <h3 className="mb-2 font-display text-xl font-bold text-charcoal-900 dark:text-cream-100">
        {title}
      </h3>
      <p className="mb-6 font-body text-sm text-charcoal-500 dark:text-cream-300 max-w-xs">
        {message}
      </p>
      {action ? (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
