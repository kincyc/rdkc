// src/config/siteConfig.ts

export type BreakpointKey = "mobile" | "desktop";
export type GalleryMode = "selected" | "full";

export interface SiteConfig {
  responsive: {
    desktopBreakpointPx: number;
  };

  gallery: {
    numberOfSelectedImages: number;
    showGridCaptions: boolean;
    masonryColumns: Record<GalleryMode, Record<BreakpointKey, number>>;
  };

  navigation: {
    heightPx: Record<BreakpointKey, number>;
    isSticky: boolean;
  };

  typography: {
    displayFontFamily: string;
    bodyFontFamily: string;
    navFontFamily: string;
    wordmarkScaleY: number; // e.g. 0.9–0.95 typical; using your current value
  };

  colors: {
    backgroundColor: string;
    textColor: string;
  };

  motion: {
    hoverScaleDesktop: number;
    hoverDurationMsDesktop: number;
    hoverEasingDesktop: string;
    tapScaleMobile: number;
    tapDurationMsMobile: number;
    tapEasingMobile: string;
  };

  debug: {
    enabled: boolean;
  };

  scroll: {
    smoothScroll: boolean;
    scrollOffsetPx: number;
  };

  lightbox: {
    transitionDurationMs: number;
    enableSwipeDownToCloseOnMobile: boolean;
    enableArrowNavigationOnDesktop: boolean;
    lockBodyScroll: boolean;
  };

  assets: {
    placeholderImageSrc: string;
  };
}

export const siteConfig: SiteConfig = {
  responsive: {
    desktopBreakpointPx: 768,
  },

  gallery: {
    numberOfSelectedImages: 12,
    showGridCaptions: false,
    masonryColumns: {
      selected: {
        mobile: 2,
        desktop: 3,
      },
      full: {
        mobile: 3,
        desktop: 4,
      },
    },
  },

  navigation: {
    heightPx: {
      mobile: 56,
      desktop: 64,
    },
    isSticky: true,
  },

  typography: {
    displayFontFamily: "Blair",
    bodyFontFamily: "Inter",
    navFontFamily: "Inter",
    wordmarkScaleY: 0.75,
  },

  colors: {
    backgroundColor: "#FFFFFF",
    textColor: "#111111",
  },

  motion: {
    hoverScaleDesktop: 1.03,
    hoverDurationMsDesktop: 300,
    hoverEasingDesktop: "ease-out",
    tapScaleMobile: 0.98,
    tapDurationMsMobile: 120,
    tapEasingMobile: "ease-out",
  },

  debug: {
    enabled: false,
  },

  scroll: {
    smoothScroll: true,
    scrollOffsetPx: 72,
  },

  lightbox: {
    transitionDurationMs: 200,
    enableSwipeDownToCloseOnMobile: true,
    enableArrowNavigationOnDesktop: false,
    lockBodyScroll: true,
  },

  assets: {
    placeholderImageSrc: "/images/ui/placeholder.png",
  },
} as const;

export default siteConfig;