// profile-update: 171




































'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Settings, Heart, Package, LogOut, Bell, Shield, Ruler, Palette, ArrowRight, Camera, Save } from 'lucide-react'
import { useAuthStore, useOrderStore, useWishlistStore } from '@/lib/store'

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore()
  const { orders } = useOrderStore()
  const { items: wishlistItems } = useWishlistStore()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isAuthenticated || !user) {
    return (
      <div className="page-container py-20 text-center">
        <User size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-navy-800 mb-2">Sign in to your account</h1>
        <Link href="/auth" className="btn-primary inline-flex items-center gap-2 mt-4">Sign In <ArrowRight size={16} /></Link>
      </div>
    )
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: User },
    { key: 'preferences', label: 'Style Preferences', icon: Palette },
    { key: 'sizes', label: 'Saved Sizes', icon: Ruler },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'privacy', label: 'Privacy', icon: Shield },
    { key: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="page-container py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10 p-6 bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl text-white">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-fitsona-500 flex items-center justify-center text-white font-display text-2xl font-bold">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <button className="absolute -bottom-1 -right-1 p-1.5 bg-white text-navy-800 rounded-full shadow-lg">
            <Camera size={12} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-white/70 text-sm">{user.email}</p>
          <p className="text-white/50 text-xs mt-1">Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-xs text-white/60">Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{wishlistItems.length}</p>
            <p className="text-xs text-white/60">Wishlist</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.key ? 'bg-fitsona-50 text-fitsona-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
          <hr className="my-3" />
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/orders" className="card p-6 hover:shadow-lg transition-shadow">
                  <Package size={24} className="text-fitsona-500 mb-3" />
                  <h3 className="font-semibold text-navy-800">Recent Orders</h3>
                  <p className="text-sm text-gray-500 mt-1">{orders.length} orders</p>
                </Link>
                <Link href="/wishlist" className="card p-6 hover:shadow-lg transition-shadow">
                  <Heart size={24} className="text-fitsona-500 mb-3" />
                  <h3 className="font-semibold text-navy-800">Wishlist</h3>
                  <p className="text-sm text-gray-500 mt-1">{wishlistItems.length} items saved</p>
                </Link>
                <div className="card p-6">
                  <Settings size={24} className="text-fitsona-500 mb-3" />
                  <h3 className="font-semibold text-navy-800">Account Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your profile</p>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-display text-xl font-bold text-navy-800 mb-4">Saved Addresses</h3>
                {user.addresses.map(addr => (
                  <div key={addr.id} className="p-4 bg-gray-50 rounded-xl flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-navy-800">{addr.label}</span>
                        {addr.isDefault && <span className="badge-primary text-[10px]">Default</span>}
                      </div>
                      <p className="text-sm text-gray-600">{addr.street}</p>
                      <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                    </div>
                    <button className="text-sm text-fitsona-500 font-medium">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">Style Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-3">Favorite Brands</label>
                  <div className="flex flex-wrap gap-2">
                    {['Fitsona Originals', 'Urban Thread', 'Velvet Arc', 'Noir Studio', 'Cascade', 'Drift & Co'].map(brand => (
                      <button key={brand} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                        user.preferences.favoriteBrands.includes(brand)
                          ? 'border-fitsona-400 bg-fitsona-50 text-fitsona-600'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-800 mb-3">Style</label>
                  <div className="flex flex-wrap gap-2">
                    {['Minimalist', 'Streetwear', 'Classic', 'Bohemian', 'Athleisure', 'Avant-Garde', 'Preppy', 'Casual'].map(style => (
                      <button key={style} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                        user.preferences.stylePreferences.includes(style)
                          ? 'border-fitsona-400 bg-fitsona-50 text-fitsona-600'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2"><Save size={16} /> Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'sizes' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">Saved Sizes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Tops', value: user.preferences.sizes.tops || '' },
                  { label: 'Bottoms', value: user.preferences.sizes.bottoms || '' },
                  { label: 'Shoes', value: user.preferences.sizes.shoes || '' },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-semibold text-navy-800 mb-2">{item.label}</label>
                    <select className="input-field" defaultValue={item.value}>
                      <option value="">Select size</option>
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button className="btn-primary flex items-center gap-2 mt-6"><Save size={16} /> Save Sizes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive order updates and promotions via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Get instant alerts on your device' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Text message alerts for orders and deals' },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div>
                      <p className="font-semibold text-sm text-navy-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={user.preferences.notificationSettings[item.key as keyof typeof user.preferences.notificationSettings]}
                      className="w-5 h-5 rounded text-fitsona-500 focus:ring-fitsona-400" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">Privacy Settings</h3>
              <div className="space-y-4">
                {[
                  { key: 'shareReviews', label: 'Share Reviews Publicly', desc: 'Allow your reviews to appear on product pages' },
                  { key: 'personalizedRecommendations', label: 'Personalized Recommendations', desc: 'Use browsing history for tailored suggestions' },
                  { key: 'demographicMatching', label: 'Demographic Review Matching', desc: 'See reviews from shoppers with similar profiles' },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div>
                      <p className="font-semibold text-sm text-navy-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={user.preferences.privacySettings[item.key as keyof typeof user.preferences.privacySettings]}
                      className="w-5 h-5 rounded text-fitsona-500 focus:ring-fitsona-400" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">Account Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-navy-800 mb-1.5">First Name</label><input type="text" className="input-field" defaultValue={user.firstName} /></div>
                  <div><label className="block text-sm font-medium text-navy-800 mb-1.5">Last Name</label><input type="text" className="input-field" defaultValue={user.lastName} /></div>
                </div>
                <div><label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label><input type="email" className="input-field" defaultValue={user.email} /></div>
                <div><label className="block text-sm font-medium text-navy-800 mb-1.5">Current Password</label><input type="password" className="input-field" placeholder="Enter current password" /></div>
                <div><label className="block text-sm font-medium text-navy-800 mb-1.5">New Password</label><input type="password" className="input-field" placeholder="Enter new password" /></div>
                <button className="btn-primary flex items-center gap-2"><Save size={16} /> Update Profile</button>
              </div>
              <div className="mt-8 p-4 bg-red-50 rounded-xl">
                <h4 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h4>
                <p className="text-xs text-red-500 mb-3">Permanently delete your account and all associated data</p>
                <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
