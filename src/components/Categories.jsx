import { ArrowUpRight } from 'lucide-react';
import { categories, products } from '../data/products';

export default function Categories({ activeCategory, onSelectCategory }) {
  return (
    <section id="categories" className="bg-sand/60 py-20 sm:py-24">
      <div className="section-pad">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow">Shop by layout</p>
          <h2 className="section-heading mt-3">Find Your Perfect Size</h2>
          <p className="mt-4 text-muted">
            Pick a layout to filter the collection below. Every board shares the same
            hand-tuned typing feel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const productCount = products.filter(
              (product) => product.categoryId === category.id,
            ).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                aria-pressed={isActive}
                aria-label={`Show ${category.title}`}
                className={`group relative flex flex-col overflow-hidden border p-6 text-left font-normal shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
                  isActive
                    ? 'border-accent bg-cream ring-2 ring-accent/40'
                    : 'border-ink/10 bg-cream'
                }`}
              >
                <div className="dot-grid mb-6 overflow-hidden bg-sand">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    className="product-photo transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold leading-snug">{category.title}</h3>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                      isActive
                        ? 'bg-accent text-cream'
                        : 'bg-sand text-ink group-hover:bg-accent group-hover:text-cream'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{category.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                  {category.keyCount} · {productCount} {productCount === 1 ? 'model' : 'models'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
