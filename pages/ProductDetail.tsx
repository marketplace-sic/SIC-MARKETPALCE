import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Share2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { useWeb3 } from '../context/Web3Context';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { isConnected } = useWeb3();

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-slate-500">
            <Link to="/shop" className="hover:text-slate-900">Shop</Link>
            <span className="mx-2">/</span>
            <span>{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{product.name}</span>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery (Simplified) */}
        <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
            <div className="mb-2">
                {product.isNFT && (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold mb-3">
                        <ShieldCheck className="w-3 h-3" /> NFT Authenticated
                    </span>
                )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium text-slate-900">{product.rating}</span>
                    <span className="ml-1 text-slate-500">({product.reviews} reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <button className="flex items-center text-slate-500 hover:text-slate-700">
                    <Share2 className="w-4 h-4 mr-1" /> Share
                </button>
            </div>

            <div className="text-3xl font-bold text-slate-900 mb-6">${product.price}</div>

            <div className="prose prose-slate mb-8">
                <p>{product.description}</p>
            </div>

            <div className="space-y-4 mt-auto">
                <Button size="lg" className="w-full" onClick={() => addToCart(product)}>
                    Add to Cart
                </Button>
                {isConnected && (
                    <Button variant="web3" size="lg" className="w-full">
                        Buy Now with Crypto
                    </Button>
                )}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900 text-sm">Free Shipping</h4>
                        <p className="text-xs text-slate-500">On all orders over $200</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900 text-sm">Authenticity Guaranteed</h4>
                        <p className="text-xs text-slate-500">Verified by our experts</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};