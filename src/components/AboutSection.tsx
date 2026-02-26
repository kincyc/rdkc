import aboutData from '@/data/about.json';
import { siteConfig } from '@/config/siteConfig';

export default function AboutSection() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-2/5">
          <img
            src={aboutData.portraitImage}
            alt="Rachel D.K. Clark"
            className="w-full h-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = siteConfig.assets.placeholderImageSrc;
            }}
          />
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <div className="space-y-4">
            {aboutData.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-foreground/80 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {aboutData.quote && aboutData.quote !== 'Optional short quote here' && (
        <blockquote className="mt-16 text-center max-w-2xl mx-auto">
          <p
            className="text-lg italic text-foreground/60 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            "{aboutData.quote}"
          </p>
          <cite className="block mt-3 text-sm text-muted-foreground not-italic">
            — Rachel D.K. Clark
          </cite>
        </blockquote>
      )}
    </div>
  );
}
