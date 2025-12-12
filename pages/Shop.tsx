import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { SortOption } from '../types';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Assume mock data is initially 'newest' or just shuffle/keep as is
        break;
    }
    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
            <p className="text-slate-500 mt-1">Found {filteredProducts.length} items</p>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 border border-gray-200 rounded-lg flex items-center gap-2"
            >
                <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="relative">
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 space-y-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div>
                <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat}>
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-sm ${selectedCategory === cat ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Price Range Placeholder */}
            <div>
                <h3 className="font-semibold text-slate-900 mb-4">Price Range</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>$0</span>
                    <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <span>$1000+</span>
                </div>
            </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-slate-500">No products found matching your criteria.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};