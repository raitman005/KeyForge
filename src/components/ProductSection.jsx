import { categories } from '../data/products';
import ProductCard from './ProductCard';

const FILTERS = [{ id: 'all', title: 'All' }, ...categories.map(({ id, title }) => ({
  id,
  title: id === 'tkl' ? 'TKL' : `${id}%`,
  fullTitle: title,
}))];

export default function ProductSection({ products, activeCategory, onSelectCategory, onAddToCart }) {
  return (
    <section id="keyboards" className="py-20 sm:py-24">
      <div className="section-pad">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2 className="section-heading mt-3">
              Boards Worth Typing On
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter keyboards by layout"
          >
            {FILTERS.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onSelectCategory(filter.id)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-5 py-2 transition duration-200 ${
                    isActive
                      ? 'border-ink bg-ink text-cream'
                      : 'border-ink/20 text-ink hover:border-accent hover:text-accent'
                  }`}
                >
                  {filter.title}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-6 text-sm text-muted" aria-live="polite">
          Showing {products.length} {products.length === 1 ? 'keyboard' : 'keyboards'}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="border border-dashed border-ink/20 py-16 text-center text-muted">
            No keyboards match this layout yet.
          </p>
        )}
      </div>
    </section>
  );
}
