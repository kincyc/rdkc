import { siteConfig } from '@/config/siteConfig';
import { useContactPrefill } from '@/hooks/useContactPrefill';
import { cn } from '@/lib/utils';

interface Program {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  inquirySubject: string;
}

type LayoutVariant = 'grid' | 'alternating';

type AlternatingSectionClasses = Partial<{
  root: string;
  introContainer: string;
  introParagraph: string;
  list: string;
  card: string;
  mediaOuter: string;
  mediaInner: string;
  mediaImage: string;
  title: string;
  description: string;
  cta: string;
}>;

interface AlternatingSectionProps {
  programs: Program[];
  intro?: string[];
  layout?: LayoutVariant;
  gridColumnsMd?: 1 | 2 | 3;
  imageSizePx?: number;
  classes?: AlternatingSectionClasses;
}

function ProgramImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const resolvedSrc = src?.trim() ? src : siteConfig.ui.placeholderImageSrc;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = siteConfig.ui.placeholderImageSrc;
      }}
    />
  );
}

function Intro({
  intro,
  classes,
}: {
  intro: string[];
  classes: AlternatingSectionClasses | undefined;
}) {
  if (!intro || intro.length === 0) return null;

  return (
    <div className={cn('max-w-2xl mb-12 space-y-4 mx-auto', classes?.introContainer)}>
      {intro.map((p, i) => (
        <p
          key={i}
          className={cn('text-foreground/80 leading-relaxed', classes?.introParagraph)}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export default function AlternatingSection({
  programs,
  intro,
  layout = 'grid',
  gridColumnsMd = 2,
  imageSizePx = 120,
  classes,
}: AlternatingSectionProps) {
  const { scrollToContact } = useContactPrefill();

  return (
    <div className={cn(classes?.root)}>
      <Intro intro={intro ?? []} classes={classes} />

      {layout === 'alternating' ? (
        <div className={cn('space-y-20 md:space-y-28', classes?.list)}>
          {programs.map((program, idx) => (
            <AlternatingRow
              key={program.slug}
              program={program}
              index={idx}
              onInquire={scrollToContact}
              classes={classes}
            />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'grid grid-cols-1 gap-y-12 md:gap-y-16 gap-x-10 md:gap-x-12',
            gridColumnsMd === 1 && 'md:grid-cols-1',
            gridColumnsMd === 2 && 'md:grid-cols-2',
            gridColumnsMd === 3 && 'md:grid-cols-3',
            classes?.list,
          )}
        >
          {programs.map((program) => (
            <ProgramCard
              key={program.slug}
              program={program}
              imageSizePx={imageSizePx}
              onInquire={scrollToContact}
              classes={classes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProgramCard({
  program,
  imageSizePx,
  onInquire,
  classes,
}: {
  program: Program;
  imageSizePx: number;
  onInquire: (prefill?: string) => void;
  classes: AlternatingSectionClasses | undefined;
}) {
  return (
    <div className={cn('min-w-0', classes?.card)}>
      <div className={cn('flex items-start gap-6', classes?.card)}>
        <div className={cn('shrink-0', classes?.mediaOuter)}>
          <div
            style={{ width: `${imageSizePx}px`, height: `${imageSizePx}px` }}
            className={cn('overflow-hidden bg-muted/20', classes?.mediaInner)}
          >
            <ProgramImage
              src={program.imageSrc}
              alt={program.title}
              className={cn('w-full h-full object-cover', classes?.mediaImage)}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3
            className={cn('text-lg md:text-xl mb-2 leading-snug', classes?.title)}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {program.title}
          </h3>

          <p
            className={cn('text-foreground/75 leading-relaxed mb-3', classes?.description)}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {program.description}
          </p>

          <button
            onClick={() => onInquire(program.inquirySubject)}
            className={cn(
              'text-sm text-foreground/60 hover:text-foreground hover:font-medium transition-all',
              classes?.cta,
            )}
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            Inquire →
          </button>
        </div>
      </div>
    </div>
  );
}

function AlternatingRow({
  program,
  index,
  onInquire,
  classes,
}: {
  program: Program;
  index: number;
  onInquire: (prefill?: string) => void;
  classes: AlternatingSectionClasses | undefined;
}) {
  const isReversed = index % 2 === 1;

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-8 md:gap-12 items-start',
        isReversed && 'md:flex-row-reverse',
        classes?.card,
      )}
    >
      <div className={cn('w-full md:w-1/2 flex justify-center', classes?.mediaOuter)}>
        <div className={cn('w-full max-w-xs aspect-square overflow-hidden bg-muted/20', classes?.mediaInner)}>
          <ProgramImage
            src={program.imageSrc}
            alt={program.title}
            className={cn('w-full h-full object-cover', classes?.mediaImage)}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h3 className={cn('text-xl md:text-2xl mb-4', classes?.title)} style={{ fontFamily: 'var(--font-display)' }}>
          {program.title}
        </h3>
        <p
          className={cn('text-foreground/75 leading-relaxed mb-6', classes?.description)}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {program.description}
        </p>
        <button
          onClick={() => onInquire(program.inquirySubject)}
          className={cn(
            'text-sm text-foreground/60 hover:text-foreground hover:font-medium transition-all self-start',
            classes?.cta,
          )}
          style={{ fontFamily: 'var(--font-nav)' }}
        >
          Inquire →
        </button>
      </div>
    </div>
  );
}