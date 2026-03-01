import { useEffect, useCallback, useRef, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { X } from 'lucide-react';
import { assetUrl } from "@/lib/assetUrl";

interface LightboxImage {
  src: string;
  title: string;
  year?: string;
  description?: string;
  alt?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose }: LightboxProps) {
  const touchStartY = useRef(0);
  const [dragY, setDragY] = useState(0);

  const image = images[currentIndex];

  // Lock body scroll
  useEffect(() => {
    if (isOpen && siteConfig.lightbox.lockBodyScroll) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Browser back
  useEffect(() => {
    if (!isOpen) return;
    window.history.pushState({ lightbox: true }, '');
    const handler = () => onClose();
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [isOpen, onClose]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!siteConfig.lightbox.enableSwipeDownToCloseOnMobile) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (dragY > 120) {
      onClose();
    }
    setDragY(0);
  }, [dragY, onClose]);

  if (!isOpen || !image) return null;

  const duration = siteConfig.lightbox.transitionDurationMs;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ transition: `opacity ${duration}ms ease-out` }}
      // New
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
        style={{ opacity: Math.max(0, 1 - dragY / 300) }}
      />

      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }} // NEW: stop bubbling
        // onClick={onClose}
        // className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors pointer-events-auto"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Content */}
      <div
        // className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-4 max-h-[90vh]"
        className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-4 max-h-[90vh] pointer-events-none"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? `transform ${duration}ms ease-out` : 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()} // NEW: clicking inside does NOT close
      >
        <img
          src={assetUrl(image.src)}
          alt={image.alt || image.title}
          // className="max-h-[70vh] w-auto max-w-full object-contain"
            className="max-h-[70vh] w-auto max-w-full object-contain pointer-events-auto"
          onClick={(e) => e.stopPropagation()} // NEW: belt-and-suspenders
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = assetUrl(siteConfig.ui.placeholderImageSrc);
          }}
        />
                <div
          className="mt-4 text-center max-w-lg pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-white text-lg" style={{ fontFamily: "var(--font-display)" }}>
            {image.title}
          </h3>

          {image.year && <p className="text-white/60 text-sm mt-1">{image.year}</p>}

          {image.description && (
            <p
              className="text-white/70 text-sm mt-3 max-h-32 overflow-y-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {image.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}