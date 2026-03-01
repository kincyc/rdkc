import { siteConfig } from '@/config/siteConfig';
import { useContactPrefill } from '@/hooks/useContactPrefill';
import { assetUrl } from "@/lib/assetUrl";


interface Program {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  inquirySubject: string;
}

export interface AlternatingSectionProps {
  programs: Program[];
  intro?: string[];

  /** Max width of the intro text block, in pixels. */
  // introMaxWidthPx?: number;

  /** Size (width & height) of the square image for each program, in pixels. */
  imageSizePx?: number;

  /** Horizontal gap between the image and description inside each program, in pixels. */
  imageTextGapPx?: number;

  /** Vertical gap between rows, in pixels. */
  rowGapPx?: number;
}

function ProgramImage({ src, alt }: { src: string; alt: string }) {
  const resolvedSrc = src?.trim() ? src : assetUrl(siteConfig.ui.placeholderImageSrc);

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = assetUrl(siteConfig.ui.placeholderImageSrc);
      }}
    />
  );
}

function TextBlock({
  program,
  onInquire,
}: {
  program: Program;
  onInquire: (prefill?: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1 flex flex-col justify-center">
      <h3 className="text-lg md:text-xl mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
        {program.title}
      </h3>
      <p className="text-foreground/75 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>
        {program.description}
      </p>
      <button
        onClick={() => onInquire(program.inquirySubject)}
        className="text-sm tracking-widest font-medium text-brand hover:text-brand/80 transition-colors self-start"
        style={{ fontFamily: 'var(--font-nav)' }}
      >
        Inquire →
      </button>
    </div>
  );
}

/**
 * One row: either [image | text] or [text | image]. Index 0 = image left, index 1 = text left, etc.
 */
function AlternatingRow({
  program,
  index,
  imageSizePx,
  imageTextGapPx,
  onInquire,
}: {
  program: Program;
  index: number;
  imageSizePx: number;
  imageTextGapPx: number;
  onInquire: (prefill?: string) => void;
}) {
  const imageLeft = index % 2 === 0;

  const imageBlock = (
    <div className="w-full md:w-auto shrink-0 flex justify-center md:justify-start">
      <div
        className="overflow-hidden bg-muted/20 flex-shrink-0"
        style={{ width: `${imageSizePx}px`, height: `${imageSizePx}px` }}
      >
        <ProgramImage src={assetUrl(program.imageSrc)} alt={program.title} />
      </div>
    </div>
  );

  const textBlock = <TextBlock program={program} onInquire={onInquire} />;

  return (
    <div
      className="flex flex-col md:flex-row items-stretch"
      style={{ gap: imageTextGapPx }}
    >
      {imageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export default function AlternatingSection({
  programs,
  intro,
  // introMaxWidthPx = 2000,
  imageSizePx = 160,
  imageTextGapPx = 24,
  rowGapPx = 48,
}: AlternatingSectionProps) {
  const { scrollToContact } = useContactPrefill();

  return (
    <div>
      {intro && intro.length > 0 && (
        <div
          className="mb-16 space-y-4"
          // style={{ maxWidth: introMaxWidthPx }}
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
        className="flex flex-col"
        style={{ gap: rowGapPx }}
      >
        {programs.map((program, index) => (
          <AlternatingRow
            key={program.slug}
            program={program}
            index={index}
            imageSizePx={imageSizePx}
            imageTextGapPx={imageTextGapPx}
            onInquire={scrollToContact}
          />
        ))}
      </div>
    </div>
  );
}
