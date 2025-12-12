import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../services/mockData';

export const Home: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                alt="Background" 
                className="w-full h-full object-cover opacity-30"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Essential Goods for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Modern Living
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg">
              Discover a curated marketplace where minimalism meets functionality. 
              Web3 enabled, but not required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Exploring
                </Button>
              </Link>
              <Link to="/shop?sort=newest">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 text-slate-200 hover:bg-slate-800">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Value Prop */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Lightning Fast</h3>
                    <p className="text-slate-600">Headless architecture ensures instant page loads and smooth navigation.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Secure & Optional Web3</h3>
                    <p className="text-slate-600">Connect your wallet for exclusive items or shop traditionally with ease.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Global Marketplace</h3>
                    <p className="text-slate-600">Curated sellers from around the world bringing unique products to you.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Trending / Featured */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
            <Link to="/shop" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your lifestyle?</h2>
        <Link to="/shop">
             <Button variant="web3" size="lg">Shop The Collection</Button>
        </Link>
      </section>
    </div>
  );
};