import { useState, useEffect } from 'react';
import contactData from '@/data/contact.json';
import { useContactPrefill } from '@/hooks/useContactPrefill';

export default function ContactSection() {
  const { subject, setSubject } = useContactPrefill();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (subject) {
      setForm((f) => ({ ...f, subject }));
      setSubject('');
    }
  }, [subject, setSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side only — simulate success
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16">
      {/* Contact Info */}
      <div className="w-full md:w-2/5 space-y-6" style={{ fontFamily: 'var(--font-body)' }}>
        <div className="space-y-3">
          <p className="text-foreground/80">{contactData.email}</p>
          <p className="text-foreground/80">{contactData.phone}</p>
          <p className="text-foreground/80">{contactData.location}</p>
        </div>

        {contactData.social?.instagram && (
          <a
            href={contactData.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {contactData.social.instagram.handle}
          </a>
        )}
      </div>

      {/* Form */}
      <div className="w-full md:w-3/5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
          >
            Send Inquiry
          </button>

          {status === 'success' && (
            <p className="text-sm text-foreground/70">{contactData.form.successMessage}</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-destructive">{contactData.form.errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
