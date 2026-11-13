import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { Logo, NAV_LINKS } from './Navbar';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="section-pad grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed text-cream/65">
            Retro-inspired mechanical keyboards, designed in the Philippines for people who
            love the sound and feel of a great typing experience.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="font-display text-lg font-semibold">Explore</h3>
          <ul className="mt-4 space-y-3 text-cream/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-text transition hover:text-accent-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-accent-light" aria-hidden="true" />
              123 Workshop Street, Metro Manila, Philippines
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="shrink-0 text-accent-light" aria-hidden="true" />
              +63 900 000 0000
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} className="shrink-0 text-accent-light" aria-hidden="true" />
              hello@keyforge.example
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">Follow us</h3>
          <ul className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="section-pad flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} KeyForge. All rights reserved.</p>
          <p>A fictional brand created for a design project.</p>
        </div>
      </div>
    </footer>
  );
}
