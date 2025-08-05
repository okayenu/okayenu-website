// dashboard-update: 959










































































































































































'use client'

import { useState } from 'react'
import { BarChart3, Package, DollarSign, Users, TrendingUp, Upload, Settings, Eye, Star, ShoppingBag, ArrowUpRight, ArrowDownRight, Plus, Search, Filter, MoreHorizontal, Image } from 'lucide-react'
import { products, brands } from '@/lib/data/products'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Revenue', value: '$24,589', change: '+12.5%', up: true, icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Orders', value: '342', change: '+8.2%', up: true, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Products', value: '64', change: '+3', up: true, icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'Visitors', value: '12.4K', change: '-2.1%', up: false, icon: Users, color: 'bg-amber-50 text-amber-600' },
  ]

  const recentOrders = [
    { id: 'ORD-4521', customer: 'Alex M.', amount: '$156.99', status: 'Processing', items: 2 },
    { id: 'ORD-4520', customer: 'Jordan K.', amount: '$89.99', status: 'Shipped', items: 1 },
    { id: 'ORD-4519', customer: 'Sam R.', amount: '$234.50', status: 'Delivered', items: 3 },
    { id: 'ORD-4518', customer: 'Riley T.', amount: '$67.99', status: 'Processing', items: 1 },
    { id: 'ORD-4517', customer: 'Casey W.', amount: '$312.00', status: 'Shipped', items: 4 },
  ]

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'orders', label: 'Orders', icon: ShoppingBag },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp },
    { key: 'media', label: 'Media', icon: Image },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-heading">Merchant Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your store, products, and orders</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Add Product
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Nav */}
          <aside className="hidden lg:block w-56 flex-shrink-0 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.key ? 'bg-white shadow-sm text-fitsona-600' : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <Icon size={18} /> {tab.label}
                </button>
              )
            })}
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map(stat => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="card p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                            <Icon size={20} />
                          </div>
                          <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                            {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {stat.change}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-navy-800">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Revenue Chart Placeholder */}
                <div className="card p-6">
                  <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Revenue Overview</h3>
                  <div className="h-64 bg-gradient-to-t from-fitsona-50 to-white rounded-xl flex items-end justify-between px-4 pb-4">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 mx-0.5">
                        <div
                          className="bg-gradient-to-t from-fitsona-500 to-fitsona-300 rounded-t-md transition-all hover:from-fitsona-600 hover:to-fitsona-400"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400 px-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                  <div className="p-5 border-b flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-navy-800">Recent Orders</h3>
                    <button className="text-sm text-fitsona-500 font-medium">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Order</th>
                          <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Customer</th>
                          <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Items</th>
                          <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Amount</th>
                          <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                          <th className="px-5 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="px-5 py-4 font-mono font-semibold text-navy-800">{order.id}</td>
                            <td className="px-5 py-4 text-gray-600">{order.customer}</td>
                            <td className="px-5 py-4 text-gray-600">{order.items}</td>
                            <td className="px-5 py-4 font-semibold text-navy-800">{order.amount}</td>
                            <td className="px-5 py-4">
                              <span className={`badge text-[10px] ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal size={16} className="text-gray-400" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="card p-6">
                  <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {products.slice(0, 5).map((product, idx) => (
                      <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="w-6 text-center text-sm font-bold text-gray-400">#{idx + 1}</span>
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.reviewCount} orders</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="font-medium">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm font-bold text-navy-800">${product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <div className="card">
                <div className="p-5 border-b flex items-center justify-between flex-wrap gap-4">
                  <h3 className="font-display text-lg font-bold text-navy-800">All Products</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-0 focus:ring-2 focus:ring-fitsona-200 w-64" />
                    </div>
                    <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Filter size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Product</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Category</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Price</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Stock</th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Rating</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 15).map(product => (
                        <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-navy-800 text-xs">{product.name}</p>
                                <p className="text-[10px] text-gray-400">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-600 text-xs">{product.category}</td>
                          <td className="px-5 py-4 font-semibold text-navy-800">${product.price.toFixed(2)}</td>
                          <td className="px-5 py-4">
                            <span className={`badge text-[10px] ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-amber-400 text-amber-400" />
                              <span className="text-xs">{product.rating.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <button className="text-xs text-fitsona-500 font-medium hover:text-fitsona-600">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="card p-6">
                <h3 className="font-display text-lg font-bold text-navy-800 mb-6">Media Library</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-fitsona-300 transition-colors cursor-pointer">
                  <Upload size={40} className="text-gray-300 mx-auto mb-4" />
                  <p className="font-semibold text-navy-800 mb-1">Upload Media</p>
                  <p className="text-sm text-gray-500">Drag & drop images, videos, or 3D models here</p>
                  <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG, WebP, MP4, GLB, OBJ</p>
                  <button className="btn-primary mt-4">Browse Files</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {products.slice(0, 8).map(p => (
                    <div key={p.id} className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group cursor-pointer">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'orders' || activeTab === 'analytics' || activeTab === 'settings') && (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'orders' ? <ShoppingBag size={28} className="text-gray-400" /> :
                   activeTab === 'analytics' ? <TrendingUp size={28} className="text-gray-400" /> :
                   <Settings size={28} className="text-gray-400" />}
                </div>
                <h3 className="font-display text-xl font-bold text-navy-800 mb-2 capitalize">{activeTab}</h3>
                <p className="text-gray-500 text-sm">Full {activeTab} management coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
