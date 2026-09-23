import React from 'react';

interface ImageModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ url, title, onClose }) => {
  if (!url) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in"
    >
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          download
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          title="Open original"
        >
          <span className="material-symbols-outlined text-xl">open_in_new</span>
        </a>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          title="Close preview"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
      >
        <img
          src={url}
          alt={title}
          className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/20"
        />
        <p className="mt-4 text-xs text-white/80 font-medium text-center max-w-xl">
          {title}
        </p>
      </div>
    </div>
  );
};
