import { siteConfig } from '@/config/siteConfig';
import { useContactPrefill } from '@/hooks/useContactPrefill';

interface Program {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  inquirySubject: string;
}

interface TwoUpSectionProps {
  programs: Program[];
  intro?: string[];

  /**
   * Max width of the intro text block, in pixels.
   * The block itself is centered; text is left-aligned.
   */
  introMaxWidthPx?: number;

  /**
   * Size (width & height) of the square image for each program, in pixels.
   */
  imageSizePx?: number;

  /**
   * Horizontal gap between the image and description inside each program, in pixels.
   */
  imageTextGapPx?: number;

  /**
   * Horizontal gap between the left/right programs (columns), in pixels.
   */
  programHorizontalGapPx?: number;

  /**
   * Vertical gap between rows of program pairs, in pixels.
   */
  programVerticalGapPx?: number;
}

function ProgramImage({ src, alt }: { src: string; alt: string }) {
  const resolvedSrc = src?.trim() ? src : siteConfig.ui.placeholderImageSrc;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = siteConfig.ui.placeholderImageSrc;
      }}
    />
  );
}

function ProgramCard({
  program,
  imageSizePx,
  imageTextGapPx,
  onInquire,
}: {
  program: Program;
  imageSizePx: number;
  imageTextGapPx: number;
  onInquire: (prefill?: string) => void;
}) {
  return (
    <div className="min-w-0">
      <div
        className="flex items-start"
        style={{
          columnGap: imageTextGapPx,
        }}
      >
        <div className="shrink-0">
          <div
            className="overflow-hidden bg-muted/20"
            style={{ width: `${imageSizePx}px`, height: `${imageSizePx}px` }}
          >
            <ProgramImage src={program.imageSrc} alt={program.title} />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg md:text-xl mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
            {program.title}
          </h3>

          <p className="text-foreground/75 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>
            {program.description}
          </p>

          <button
            onClick={() => onInquire(program.inquirySubject)}
            className="text-sm text-foreground/60 hover:text-foreground hover:font-medium transition-all"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            Inquire →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TwoUpSection({
  programs,
  intro,
  introMaxWidthPx = 1000,
  imageSizePx = 160,
  imageTextGapPx = 24,
  programHorizontalGapPx = 40,
  programVerticalGapPx = 48,
}: TwoUpSectionProps) {
  const { scrollToContact } = useContactPrefill();

  return (
    <div>
      {intro && intro.length > 0 && (
        <div
          className="mb-16 space-y-4"
          style={{
            maxWidth: introMaxWidthPx,
          }}
        >
          {intro.map((p, i) => (
            <p
              key={i}
              className="text-foreground/80 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {p}
            </p>
          ))}
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          columnGap: programHorizontalGapPx,
          rowGap: programVerticalGapPx,
        }}
      >
        {programs.map((program) => (
          <ProgramCard
            key={program.slug}
            program={program}
            imageSizePx={imageSizePx}
            imageTextGapPx={imageTextGapPx}
            onInquire={scrollToContact}
          />
        ))}
      </div>
    </div>
  );
}
