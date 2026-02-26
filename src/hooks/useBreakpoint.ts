import { useState, useEffect } from 'react';
import { siteConfig, type BreakpointKey } from '@/config/siteConfig';

export function useBreakpoint(): BreakpointKey {
  const [bp, setBp] = useState<BreakpointKey>(
    typeof window !== 'undefined' && window.innerWidth >= siteConfig.responsive.desktopBreakpointPx
      ? 'desktop'
      : 'mobile'
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${siteConfig.responsive.desktopBreakpointPx}px)`);
    const onChange = () => setBp(mql.matches ? 'desktop' : 'mobile');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return bp;
}
