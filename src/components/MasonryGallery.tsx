import { siteConfig } from '@/config/siteConfig';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { GalleryMode } from '@/config/siteConfig';

interface GalleryImage {
  src: string;
  title: string;
  year?: string;
  description?: string;
  alt?: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  mode: GalleryMode;
  showCaptions: boolean;
  onImageClick: (index: number) => void;
}

export default function MasonryGallery({ images, mode, showCaptions, onImageClick }: MasonryGalleryProps) {
  const bp = useBreakpoint();
  const cols = siteConfig.gallery.masonryColumns[mode][bp];
  const motion = siteConfig.motion;

  // Distribute images into columns
  const columns: GalleryImage[][] = Array.from({ length: cols }, () => []);
  images.forEach((img, i) => columns[i % cols].push(img));

  // Build index map for click handling
  const indexMap: number[][] = Array.from({ length: cols }, () => []);
  images.forEach((_, i) => indexMap[i % cols].push(i));

  return (
    <div className="flex gap-3 md:gap-4" style={{ alignItems: 'flex-start' }}>
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-3 md:gap-4">
          {col.map((img, rowIdx) => {
            const globalIdx = indexMap[colIdx][rowIdx];
            return (
              <div
                key={img.src}
                className="cursor-pointer overflow-hidden group"
                onClick={() => onImageClick(globalIdx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onImageClick(globalIdx)}
              >
                <img
                  src={img.src}
                  alt={img.alt || `${img.title}${img.year ? ` (${img.year})` : ''}`}
                  className="w-full h-auto block"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = siteConfig.assets.placeholderImageSrc;
                  }}
                  style={{
                    transition: `transform ${motion.hoverDurationMsDesktop}ms ${motion.hoverEasingDesktop}`,
                  }}
                  onMouseEnter={(e) => {
                    if (bp === 'desktop') (e.target as HTMLElement).style.transform = `scale(${motion.hoverScaleDesktop})`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
                {showCaptions && (
                  <div className="mt-2 px-1">
                    <p className="text-sm" style={{ fontFamily: 'var(--font-display)' }}>{img.title}</p>
                    {img.year && <p className="text-xs text-muted-foreground">{img.year}</p>}
                    {mode === 'full' && img.description && (
                      <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {img.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
