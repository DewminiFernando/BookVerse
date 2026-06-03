import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/40 p-4 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-3xl animate-scaleIn"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header with gold hairline */}
        <div className="flex items-center justify-between border-b border-gold-300/30 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-charcoal-900 dark:text-cream-100">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-charcoal-500 transition-all duration-200 hover:bg-gold-300/20 hover:text-gold-500 dark:text-cream-300 dark:hover:bg-gold-400/10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">{children}</div>

        {/* Bottom gold hairline accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      </div>
    </div>
  );
};

export default Modal;
