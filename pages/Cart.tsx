import React from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const shipping = 15;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 border border-gray-100 rounded-xl bg-white">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                            className="p-1 hover:bg-gray-100 rounded-l-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <Minus className="w-4 h-4 text-slate-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                            className="p-1 hover:bg-gray-100 rounded-r-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                    <div className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-96">
            <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Estimated Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-slate-900 border-t border-gray-200 pt-4 mb-8">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                </div>

                <Button className="w-full flex justify-between items-center group">
                    Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-xs text-center text-slate-400 mt-4">
                    Secure checkout powered by Stripe & Crypto options.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};