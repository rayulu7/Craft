import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './components/CartContext/CartContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Product/Product';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckOutPage/CheckOutPage';
import Footer from './components/Footer/Footer';
import './index.css';
import Contact from './pages/Contact/Contact';

// Create a wrapper component inside App.js
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Add the ScrollToTop component here */}
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow pt-[50px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;