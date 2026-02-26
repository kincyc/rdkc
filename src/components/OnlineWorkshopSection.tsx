import { useContactPrefill } from '@/hooks/useContactPrefill';

export default function OnlineWorkshopSection() {
  const { scrollToContact } = useContactPrefill();

  return (
    <div className="max-w-2xl">
      <p className="text-foreground/80 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
        Rachel's online coat workshop is a four-part series designed for makers who want to create a
        one-of-a-kind coat at their own pace. Each session builds on the last, covering pattern
        selection, fabric preparation, construction techniques, and finishing details.
      </p>
      <p className="text-foreground/80 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
        The workshop is self-paced and includes direct input from Rachel throughout the process.
        Participants receive personalized feedback and guidance as they work.
      </p>
      <p className="text-foreground/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
        Have questions about the workshop or want to learn more?
      </p>
      <button
        onClick={() => scrollToContact('Online Coat Workshop Inquiry')}
        className="text-sm text-foreground/60 hover:text-foreground hover:font-medium transition-all"
        style={{ fontFamily: 'var(--font-nav)' }}
      >
        Inquire →
      </button>
    </div>
  );
}
