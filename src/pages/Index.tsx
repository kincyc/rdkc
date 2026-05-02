import { useState, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import MasonryGallery from '@/components/MasonryGallery';
import Lightbox from '@/components/Lightbox';
import AlternatingSection from '@/components/AlternatingSection';
import SectionHeading from '@/components/SectionHeading';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { ContactPrefillProvider } from '@/hooks/useContactPrefill';
import { siteConfig } from '@/config/siteConfig';
import { galleryImages } from '@/lib/galleryImages';
import showsData from '@/data/shows.json';
import workshopsData from '@/data/workshops.json';

// const scrollMargin = siteConfig.navigation.isSticky
//   ? `${Math.max(siteConfig.navigation.heightPx.desktop, siteConfig.navigation.heightPx.mobile) + 16}px`
//   : '0px';

// const sectionStyle = { scrollMarginTop: scrollMargin };

const selectedImages = galleryImages.slice(0, siteConfig.gallery.numberOfSelectedImages);

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
        {/* Selected Works - full width of main */}
        <section id="selected-works" className="py-12 md:py-16">
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

        {/* Narrower content: ~70% width, centered */}
        <div className="max-w-3xl mx-auto">
        {/* Shows & Talks */}
        <section id="shows" className="py-12 md:py-16">
          <SectionHeading numberOfTriangles={0} triangleSpacing={42}>
            Shows & Talks
          </SectionHeading>
          
          <AlternatingSection programs={showsData.programs} intro={showsData.intro}/>
        </section>

        {/* Workshops & Classes */}
        <section id="workshops" className="py-12 md:py-16">
          <SectionHeading numberOfTriangles={0} triangleSpacing={86}>
            Workshops & Classes
          </SectionHeading>
          <AlternatingSection programs={workshopsData.workshops} intro={workshopsData.intro} />
        </section>

        {/* About */}
        <section id="about" className="py-12 md:py-16 ">
          <SectionHeading numberOfTriangles={0} triangleSpacing={42}>
            About Rachel
          </SectionHeading>
          <AboutSection />
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 md:py-16">
          <SectionHeading numberOfTriangles={0} triangleSpacing={69}>
            Booking & Contact
          </SectionHeading>
          <ContactSection />
        </section>
        </div>
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
