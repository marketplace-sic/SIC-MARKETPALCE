import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import { SELLER_STATS, MOCK_PRODUCTS } from '../services/mockData';
import { Button } from '../components/Button';

export const SellerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Seller Dashboard</h1>
            <p className="text-slate-500">Welcome back, SIC Store</p>
        </div>
        <Button>Add New Product</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
            { label: 'Total Sales', value: '$12,450', icon: DollarSign, change: '+12%' },
            { label: 'Total Orders', value: '145', icon: Package, change: '+5%' },
            { label: 'Visitors', value: '3,200', icon: Users, change: '+18%' },
            { label: 'Conversion', value: '3.2%', icon: TrendingUp, change: '+1.1%' }
        ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg">
                        <stat.icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Sales Overview</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SELLER_STATS}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{fill: '#f8fafc'}}
                        />
                        <Bar dataKey="sales" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Inventory Status</h3>
            <div className="space-y-4">
                {MOCK_PRODUCTS.slice(0, 5).map(product => (
                    <div key={product.id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                        <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 truncate">{product.name}</h4>
                            <p className="text-xs text-slate-500">{product.reviews} sales</p>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">${product.price}</div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All Products</button>
            </div>
        </div>
      </div>
    </div>
  );
};