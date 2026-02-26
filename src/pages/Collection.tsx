import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import MasonryGallery from '@/components/MasonryGallery';
import Lightbox from '@/components/Lightbox';
import { ContactPrefillProvider } from '@/hooks/useContactPrefill';
import imageMetadata from '@/data/image_metadata.json';

const Collection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <ContactPrefillProvider>
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <h1
            className="text-2xl md:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Full Collection
          </h1>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
        </div>
        <MasonryGallery
          images={imageMetadata}
          mode="full"
          showCaptions={true}
          onImageClick={openLightbox}
        />
      </main>

      <Lightbox
        images={imageMetadata}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </ContactPrefillProvider>
  );
};

export default Collection;
