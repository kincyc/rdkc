import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Menu, X, ChevronDown } from 'lucide-react';
import { scrollToId } from "@/lib/scroll";
import BrandLogo from "@/components/BrandLogo";
const navHeight = siteConfig.navigation.heightPx;

const menuItems = [
  { label: 'Shows & Talks', anchor: 'shows' },
  { label: 'Workshops & Classes', anchor: 'workshops' },
  { label: 'About', anchor: 'about' },
  { label: 'Contact', anchor: 'contact' },
];


// function scrollToSection(id: string) {
//   document.getElementById(id)?.scrollIntoView({
//     behavior: siteConfig.scroll.smoothScroll ? "smooth" : "auto",
//     block: "start",
//   });
// }

export default function NavBar() {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const height = navHeight[bp];
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, []);

  // Close on scroll
  useEffect(() => {
    if (menuOpen || moreOpen) {
      window.addEventListener('scroll', closeAll, { passive: true, once: true });
      return () => window.removeEventListener('scroll', closeAll);
    }
  }, [menuOpen, moreOpen, closeAll]);

  // Close on outside click (desktop more menu)
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [moreOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeAll]);

  const handleNavClick = (anchor: string) => {
    console.log("handleNavClick", anchor, location.pathname);
    closeAll();

    if (location.pathname !== "/") {
      navigate("/"); // HashRouter turns this into #/
      // wait for the route to render, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToId(anchor));
      });
    } else {
      scrollToId(anchor);
    }
  };

  const isSticky = siteConfig.navigation.isSticky;

  return (
    <header
      className="z-50 bg-background/95 backdrop-blur-sm border-b border-border/50"
      style={{
        height,
        ...(isSticky ? { position: 'sticky', top: 0 } : {}),
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            closeAll();
            if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* <img
            src={siteConfig.branding.logoSrc}
            alt="RDKC"
            className="h-16 w-auto"
            style={{ transform: `scaleY(${siteConfig.typography.wordmarkScaleY})` }}
          /> */}
          {/* import BrandLogo from "@/components/BrandLogo"; */}
          <BrandLogo />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6" style={{ fontFamily: 'var(--font-nav)' }}>
          <button
            onClick={() => handleNavClick('selected-works')}
            className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors hidden sm:block"
          >
            Selected Works
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors hidden sm:block"
          >
            Book Rachel
          </button>

          {/* Desktop: More dropdown */}
          {!isMobile && (
            <div className="relative" ref={moreRef}>
              <button
                
                onClick={() => setMoreOpen(!moreOpen)}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
              >
                More
                <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 bg-background border border-border rounded shadow-lg py-2 min-w-[200px]">
                  {menuItems.map((item) => (
                    <button
                      key={item.anchor}
                      
                      onClick={() => handleNavClick(item.anchor)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-border my-1" />
                  <Link
                    to="/collection"
          
                    onClick={closeAll}
                    className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    View Full Collection →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile links + hamburger */}
          {isMobile && (
            <>
              <button
                onClick={() => handleNavClick('selected-works')}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                Works
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                Book
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div className="bg-background border-b border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleNavClick(item.anchor)}
                className="block w-full text-left px-2 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-border my-2" />
            <Link
              to="/collection"
              onClick={closeAll}
              className="block px-2 py-2 text-sm font-medium text-foreground"
            >
              View Full Collection →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
