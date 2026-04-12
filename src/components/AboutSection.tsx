import aboutData from "@/data/about.json";
import { siteConfig } from "@/config/siteConfig";
import { assetUrl } from "@/lib/assetUrl";

export default function AboutSection() {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <img
            src={assetUrl(aboutData.portraitImage)}
            alt="Rachel D.K. Clark"
            className="w-full h-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = assetUrl(
                siteConfig.ui.placeholderImageSrc,
              );
            }}
          />
        </div>

        <div className="w-full">
          <div className="space-y-4">
            {aboutData.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-foreground/80 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {aboutData.quote && aboutData.quote !== "Optional short quote here" && (
        <blockquote className="mt-16 text-center max-w-2xl mx-auto">
          <p
            className="text-lg italic text-foreground/60 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
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
