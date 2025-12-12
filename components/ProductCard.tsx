import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNFT && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>NFT Linked</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs text-slate-500 mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-medium text-slate-900 line-clamp-2 hover:text-slate-700">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center mt-2 mb-3">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-slate-600 ml-1">{product.rating}</span>
            <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-lg font-bold text-slate-900">${product.price}</span>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => addToCart(product)}
            className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
          >
            Add
          </Button>
          {/* Mobile always visible fallback handled via CSS if needed, or simple logic */}
          <button 
            className="md:hidden bg-slate-100 p-2 rounded-full text-slate-900"
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};