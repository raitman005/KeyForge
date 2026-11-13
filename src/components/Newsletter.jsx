import { useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { EMAIL_PATTERN } from '../utils/format';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setErrorMessage('Please enter your email address.');
      setStatus('error');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setErrorMessage('That email does not look right. Try name@example.com.');
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (status !== 'idle') setStatus('idle');
  };

  return (
    <section className="py-20 sm:py-24" aria-labelledby="newsletter-heading">
      <div className="section-pad">
        <div className="dot-grid relative overflow-hidden border border-ink/10 bg-sand px-6 py-14 text-center shadow-soft sm:px-12">
          <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-ink text-cream">
            <Mail size={22} aria-hidden="true" />
          </span>
          <h2 id="newsletter-heading" className="section-heading">
            Stay in the Loop.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Get early access to limited drops, new colorways and the occasional typing sound
            test. No spam, unsubscribe anytime.
          </p>

          {status === 'success' ? (
            <p
              role="status"
              className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 bg-cream px-5 py-4 font-medium text-ink shadow-soft"
            >
              <CheckCircle2 size={20} className="text-accent" aria-hidden="true" />
              You are on the list. Welcome to KeyForge!
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-lg">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                    className={`w-full border bg-cream px-6 py-3.5 text-base text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                      status === 'error' ? 'border-red-700/60' : 'border-ink/15'
                    }`}
                  />
                </div>
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              {status === 'error' && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-3 text-left text-sm font-medium text-red-800 sm:pl-6"
                >
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
