import { useEffect, useState } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Categories', href: '#categories' },
  { label: 'Keyboards', href: '#keyboards' },
  { label: 'Our Story', href: '#story' },
];

export function Logo({ light = false }) {
  return (
    <a
      href="#home"
      className="inline-flex items-center gap-2.5"
      aria-label="KeyForge home"
    >
      <span
        className={`grid h-9 w-9 place-items-center font-display text-lg font-bold shadow-soft ${
          light ? 'bg-accent text-cream' : 'bg-ink text-cream'
        }`}
        aria-hidden="true"
      >
        K
      </span>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        KeyForge
      </span>
    </a>
  );
}

export default function Navbar({ cartCount, onOpenCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replay the badge animation whenever the cart count changes.
  useEffect(() => {
    if (cartCount > 0) setBumpKey((key) => key + 1);
  }, [cartCount]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-ink/10 bg-cream/90 shadow-soft backdrop-blur-md'
          : 'border-transparent bg-cream'
      }`}
    >
      <nav
        className="section-pad flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo />

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-text group relative text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-sand"
            aria-label={`Open shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <ShoppingCart size={21} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                key={bumpKey}
                className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-bump place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-cream"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-sand md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <ul className="min-h-0 space-y-1 px-5 pb-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className="nav-text block px-4 py-3 text-ink transition hover:bg-sand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
