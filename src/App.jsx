import { useCallback, useState } from 'react';
import { products } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductSection from './components/ProductSection';
import BrandStory from './components/BrandStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  // Cart is a list of { id, quantity }; product details are looked up from the catalog.
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const addToCart = (productId) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === productId);
      if (existing) {
        return items.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { id: productId, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => addToCart(productId);

  const decreaseQuantity = (productId) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Clicking the active category again clears the filter.
  const selectCategory = (categoryId) => {
    setActiveCategory((current) => (current === categoryId ? 'all' : categoryId));
  };

  const handleCategoryCardClick = (categoryId) => {
    setActiveCategory((current) => (current === categoryId ? 'all' : categoryId));
    document.getElementById('keyboards')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartLines = cartItems.map((item) => ({
    product: products.find((product) => product.id === item.id),
    quantity: item.quantity,
  }));
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartLines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );

  const visibleProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.categoryId === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <Categories activeCategory={activeCategory} onSelectCategory={handleCategoryCardClick} />
        <ProductSection
          products={visibleProducts}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          onAddToCart={addToCart}
        />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        lines={cartLines}
        subtotal={subtotal}
        onClose={closeCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
