import { useEffect, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { formatPeso } from '../utils/format';

const BADGE_STYLES = {
  'Best Seller': 'bg-accent text-cream',
  'Limited Edition': 'bg-ink text-cream',
  New: 'bg-cream text-accent-dark border border-accent/40',
  Compact: 'bg-cream text-ink border border-ink/20',
};

export default function ProductCard({ product, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleAdd = () => {
    onAddToCart(product.id);
    setJustAdded(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col overflow-hidden border border-ink/10 bg-cream shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="dot-grid relative m-3 overflow-hidden bg-sand">
        <span
          className={`absolute left-3 top-3 z-10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            BADGE_STYLES[product.badge] ?? 'bg-ink text-cream'
          }`}
        >
          {product.badge}
        </span>

        <img
          src={product.image}
          alt={product.imageAlt}
          className="product-photo transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {product.layout} · {product.connectivity}
        </p>
        <h3 className="product-name mt-1.5">{product.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{product.description}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold">{formatPeso(product.price)}</p>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 transition duration-200 active:scale-95 ${
              justAdded
                ? 'bg-accent text-cream'
                : 'bg-ink text-cream hover:bg-accent hover:shadow-soft'
            }`}
          >
            {justAdded ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <ShoppingBag size={16} aria-hidden="true" />
            )}
            <span aria-live="polite">{justAdded ? 'Added' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
