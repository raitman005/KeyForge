import { ArrowRight, Battery, Bluetooth, Wrench } from 'lucide-react';

function RotatingStamp() {
  return (
    <div
      className="absolute -right-14 -top-10 z-10 hidden h-28 w-28 sm:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#34291F" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="#F5EFDF" strokeOpacity="0.3" />
        <text fill="#F5EFDF" fontSize="11.5" fontWeight="600" letterSpacing="3.2">
          <textPath href="#stamp-circle">HANDCRAFTED · SINCE 2019 · KEYFORGE ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-3xl font-bold text-accent">
        K
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="section-pad grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Retro mechanical keyboards
          </p>
          <h1 className="hero-heading">
            Built for the Love of <span className="italic text-accent">Typing.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Premium 75%, 60% and TKL mechanical keyboards with warm vintage colorways, buttery
            switches and a satisfying thock. Designed for programmers, gamers and anyone who
            wants their desk to feel like home.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#keyboards" className="btn-primary">
              Explore Collection
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#story" className="btn-secondary">
              Discover Our Story
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {[
              ['4.9/5', 'Customer rating'],
              ['5,000+', 'Boards shipped'],
              ['2 yr', 'Warranty'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold">{value}</dd>
                <p className="mt-0.5 text-xs text-muted">{label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <RotatingStamp />

          <div className="dot-grid relative border border-ink/10 bg-sand p-6 shadow-lift sm:p-10">
            <div className="absolute inset-x-6 top-4 flex items-center gap-1.5 sm:inset-x-10" aria-hidden="true">
              <span className="h-2.5 w-2.5 bg-accent" />
              <span className="h-2.5 w-2.5 bg-ink/25" />
              <span className="h-2.5 w-2.5 bg-ink/25" />
            </div>
            <img
              src={`${import.meta.env.BASE_URL}images/l75-75-wireless.webp`}
              alt="KF75 Classic 75% wireless mechanical keyboard"
              className="mt-4 aspect-[16/11] w-full animate-float object-cover mix-blend-multiply"
            />
            <p className="mt-2 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
              KF75 Classic · 75% Wireless
            </p>
          </div>

          <div className="absolute -bottom-3 left-1 flex items-center gap-2 border border-ink/10 bg-cream px-4 py-3 shadow-soft sm:left-[-1.5rem]">
            <Bluetooth size={18} className="text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold">Tri-mode wireless</span>
          </div>
          <div className="absolute -bottom-3 right-[-1.5rem] hidden items-center gap-2 border border-ink/10 bg-cream px-4 py-3 shadow-soft sm:flex">
            <Wrench size={18} className="text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold">Hot-swappable</span>
          </div>
          {/* <div className="absolute left-6 top-[-1.25rem] hidden items-center gap-2 border border-ink/10 bg-cream px-4 py-3 shadow-soft xl:flex"> */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden items-center gap-2 border border-ink/10 bg-cream px-4 py-3 shadow-soft sm:flex">
            <Battery size={18} className="text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold">Up to 200 hrs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
