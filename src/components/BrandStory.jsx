import { Hammer, Palette, Sparkles, Waves } from 'lucide-react';

const PILLARS = [
  {
    icon: Hammer,
    title: 'Craftsmanship',
    text: 'Every board is assembled, lubed and tested by hand before it leaves our workshop.',
  },
  {
    icon: Palette,
    title: 'Customization',
    text: 'Hot-swappable sockets and standard keycap fit let you make it yours in minutes.',
  },
  {
    icon: Waves,
    title: 'Tactile typing',
    text: 'Gasket mounting and layered dampening deliver a soft, deep and satisfying sound.',
  },
  {
    icon: Sparkles,
    title: 'Vintage design',
    text: 'Warm creams, walnut browns and burnt orange pulled straight from classic workstations.',
  },
];

export default function BrandStory() {
  return (
    <section id="story" className="bg-ink py-20 text-cream sm:py-28">
      <div className="section-pad grid items-center gap-14 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="dot-grid overflow-hidden border border-cream/10 bg-sand">
            <img
              src={`${import.meta.env.BASE_URL}images/l75-75-wireless.webp`}
              alt="Limited edition 75% mechanical keyboard with grey, white and black keycaps"
              loading="lazy"
              className="product-photo"
            />
          </div>
          <div className="absolute -bottom-5 right-4 bg-accent px-5 py-4 text-cream shadow-lift sm:right-[-1rem]">
            <p className="font-display text-3xl font-bold leading-none">2019</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest">Founded in Manila</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow !text-accent-light">Our story</p>
          <h2 className="section-heading mt-3">A Timeless Typing Experience.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-cream/75">
            KeyForge started on a cluttered desk with a secondhand terminal keyboard and a
            stubborn idea: typing should feel as good as it did when every keystroke meant
            something. We blend the character of vintage workstations with modern wireless
            engineering, and we build each board to be opened, tuned and loved for years.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream/10 text-accent-light">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 leading-relaxed text-cream/65">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
