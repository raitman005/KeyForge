import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatPeso } from '../utils/format';

export default function CartDrawer({
  isOpen,
  lines,
  subtotal,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const closeButtonRef = useRef(null);
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // Close on Escape, lock page scroll and move focus into the drawer while open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setCheckoutNotice(false);
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-lift transition-[transform,visibility] duration-300 ease-out ${
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl font-bold">Your Cart</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-sand"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-accent">
              <ShoppingBag size={28} aria-hidden="true" />
            </span>
            <p className="mt-5 font-display text-xl font-semibold">Your cart is empty</p>
            <p className="mt-2 text-muted">
              Add a keyboard and it will show up here.
            </p>
            <a href="#keyboards" onClick={onClose} className="btn-primary mt-6">
              Browse keyboards
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {lines.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <div className="w-24 shrink-0 self-start overflow-hidden bg-sand">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="aspect-[4/3] w-full object-cover mix-blend-multiply"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="product-name">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted">
                          {product.layout} · {product.connectivity}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-sand hover:text-accent-dark"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() => onDecrease(product.id)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-sand"
                        >
                          <Minus size={14} aria-hidden="true" />
                        </button>
                        <span
                          className="w-8 text-center text-sm font-semibold"
                          aria-label={`Quantity ${quantity}`}
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onIncrease(product.id)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-sand"
                        >
                          <Plus size={14} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-semibold">{formatPeso(product.price * quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-ink/10 bg-sand/50 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-2xl font-bold">{formatPeso(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">Shipping and taxes calculated at checkout.</p>
              <button
                type="button"
                onClick={() => setCheckoutNotice(true)}
                className="btn-primary mt-5 w-full"
              >
                Checkout
              </button>
              {checkoutNotice && (
                <p role="status" className="mt-3 text-center text-xs text-accent-dark">
                  This is a demo storefront, so checkout is not connected.
                </p>
              )}
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
