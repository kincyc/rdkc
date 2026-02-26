import { siteConfig } from '@/config/siteConfig';
import { useContactPrefill } from '@/hooks/useContactPrefill';

interface Program {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  inquirySubject: string;
}

interface AlternatingSectionProps {
  programs: Program[];
  intro?: string[];
}

export default function AlternatingSection({ programs, intro }: AlternatingSectionProps) {
  const { scrollToContact } = useContactPrefill();

  return (
    <div>
      {intro && intro.length > 0 && (
        <div className="max-w-2xl mb-16 space-y-4">
          {intro.map((p, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-20 md:space-y-28">
        {programs.map((program, idx) => (
          <div
            key={program.slug}
            className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
          >
            {/* <div className="w-full md:w-1/2">
              <img
                src={program.imageSrc}
                alt={program.title}
                className="w-full h-auto"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = siteConfig.ui.placeholderImageSrc;
                }}
              />
            </div> */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-xs aspect-square overflow-hidden bg-muted/20">
                <img
                  src="/images/shows/test.jpg"
                  alt={program.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3
                className="text-xl md:text-2xl mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {program.title}
              </h3>
              <p
                className="text-foreground/75 leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {program.description}
              </p>
              <button
                onClick={() => scrollToContact(program.inquirySubject)}
                className="text-sm text-foreground/60 hover:text-foreground hover:font-medium transition-all self-start"
                style={{ fontFamily: 'var(--font-nav)' }}
              >
                Inquire →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
