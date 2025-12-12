import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { SellerDashboard } from './pages/SellerDashboard';
import { CartProvider } from './context/CartContext';
import { Web3Provider } from './context/Web3Context';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">SIC.</h3>
        <p className="text-sm text-slate-500">
          The future of marketplace commerce. Minimalist, fast, and Web3 ready.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>New Arrivals</li>
          <li>Best Sellers</li>
          <li>Categories</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>Help Center</li>
          <li>Returns</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Discord</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 text-center text-sm text-slate-400">
      &copy; 2024 SIC Marketplace. All rights reserved.
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Web3Provider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<SellerDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </Web3Provider>
  );
};

export default App;