import { useState, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import MasonryGallery from '@/components/MasonryGallery';
import Lightbox from '@/components/Lightbox';
import AlternatingSection from '@/components/AlternatingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import OnlineWorkshopSection from '@/components/OnlineWorkshopSection';
import { ContactPrefillProvider } from '@/hooks/useContactPrefill';
import { siteConfig } from '@/config/siteConfig';
import imageMetadata from '@/data/image_metadata.json';
import showsData from '@/data/shows.json';
import workshopsData from '@/data/workshops.json';

const scrollMargin = siteConfig.navigation.isSticky
  ? `${Math.max(siteConfig.navigation.heightPx.desktop, siteConfig.navigation.heightPx.mobile) + 16}px`
  : '0px';

const sectionStyle = { scrollMarginTop: scrollMargin };

const selectedImages = imageMetadata.slice(0, siteConfig.gallery.numberOfSelectedImages);

const Index = () => {
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

      <main className="max-w-7xl mx-auto px-4">
        {/* Selected Works */}
        <section id="selected-works" style={sectionStyle} className="py-16 md:py-24">
          <h1
            className="text-2xl md:text-3xl mb-12 md:mb-16 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Wearable Art by Rachel D.K. Clark
          </h1>
          <MasonryGallery
            images={selectedImages}
            mode="selected"
            showCaptions={siteConfig.gallery.showGridCaptions}
            onImageClick={openLightbox}
          />
        </section>

        {/* Shows & Talks */}
        <section id="shows" style={sectionStyle} className="py-16 md:py-24">
          <h2 className="text-xl md:text-2xl mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
            Shows & Talks
          </h2>
          <AlternatingSection programs={showsData.programs} intro={showsData.intro} />
        </section>

        {/* Workshops & Classes */}
        <section id="workshops" style={sectionStyle} className="py-16 md:py-24">
          <h2 className="text-xl md:text-2xl mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
            Workshops & Classes
          </h2>
          <AlternatingSection programs={workshopsData.workshops} intro={workshopsData.intro} />
        </section>

        {/* Online Workshop */}
        <section id="online-workshop" style={sectionStyle} className="py-16 md:py-24">
          <h2 className="text-xl md:text-2xl mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
            Online Coat Workshop
          </h2>
          <OnlineWorkshopSection />
        </section>

        {/* About */}
        <section id="about" style={sectionStyle} className="py-16 md:py-24">
          <h2 className="text-xl md:text-2xl mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
            About
          </h2>
          <AboutSection />
        </section>

        {/* Contact */}
        <section id="contact" style={sectionStyle} className="py-16 md:py-24">
          <h2 className="text-xl md:text-2xl mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
            Booking & Contact
          </h2>
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} RDKC. All rights reserved.
      </footer>

      <Lightbox
        images={selectedImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </ContactPrefillProvider>
  );
};

export default Index;
