import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Wallet, Menu, X, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWeb3 } from '../context/Web3Context';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useWeb3();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Sellers', path: '/dashboard' },
  ];

  const handleWalletClick = () => {
    if (isConnected) {
      if (confirm('Disconnect wallet?')) {
        disconnectWallet();
      }
    } else {
      connectWallet();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold tracking-tight text-slate-900">SIC<span className="text-gray-400">.</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  location.pathname === link.path ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
               <button className="p-2 text-slate-400 hover:text-slate-600">
                <Search className="w-5 h-5" />
               </button>
            </div>
            
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-slate-600">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-slate-900 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            <Button
              variant={isConnected ? 'web3' : 'outline'}
              size="sm"
              onClick={handleWalletClick}
              className="flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? walletAddress : 'Connect'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-2 text-slate-400">
               <ShoppingBag className="w-5 h-5" />
               {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-400 hover:text-slate-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Button
                variant={isConnected ? 'web3' : 'outline'}
                className="w-full justify-center flex items-center gap-2"
                onClick={() => {
                  handleWalletClick();
                  setIsMenuOpen(false);
                }}
              >
                 <Wallet className="w-4 h-4" />
                 {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};