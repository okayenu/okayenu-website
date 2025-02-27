'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react'
import { useOrderStore, useAuthStore } from '@/lib/store'

const statusConfig: Record<string, { icon: typeof Package; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  confirmed: { icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
  processing: { icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  shipped: { icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  in_transit: { icon: Truck, color: 'text-fitsona-600', bg: 'bg-fitsona-50' },
  delivered: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
  returned: { icon: Package, color: 'text-gray-600', bg: 'bg-gray-50' },
}

export default function OrdersPage() {
  const { orders } = useOrderStore()
  const { isAuthenticated } = useAuthStore()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(orders[0]?.id || null)

  const activeOrder = orders.find(o => o.id === selectedOrder)

  if (!isAuthenticated) {
    return (
      <div className="page-container py-20 text-center">
        <Package size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-navy-800 mb-2">Sign in to view orders</h1>
        <p className="text-gray-500 mb-6">Track your deliveries and manage returns</p>
        <Link href="/auth" className="btn-primary inline-flex items-center gap-2">Sign In <ArrowRight size={16} /></Link>
      </div>
    )
  }

  return (
    <div className="page-container py-8">
      <h1 className="section-heading mb-8">Orders & Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order List */}
        <div className="space-y-3">
          {orders.map(order => {
            const config = statusConfig[order.status] || statusConfig.pending
            const Icon = config.icon
            return (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  selectedOrder === order.id ? 'border-fitsona-400 bg-fitsona-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-navy-800">{order.id}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${config.bg} ${config.color}`}>
                    <Icon size={12} /> {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{order.items.length} item{order.items.length > 1 ? 's' : ''} &middot; ${order.total.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </button>
            )
          })}
        </div>

        {/* Order Detail */}
        {activeOrder && (
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-navy-800">Tracking</h2>
                {activeOrder.trackingNumber && (
                  <a href="#" className="text-sm text-fitsona-500 font-medium flex items-center gap-1 hover:text-fitsona-600">
                    {activeOrder.carrier} <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {activeOrder.estimatedDelivery && activeOrder.status !== 'delivered' && (
                <div className="p-4 bg-fitsona-50 rounded-xl mb-6">
                  <p className="text-sm text-fitsona-700 font-medium">
                    Estimated delivery: {new Date(activeOrder.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}

              <div className="relative pl-8">
                {activeOrder.timeline.map((event, idx) => (
                  <div key={idx} className="relative pb-8 last:pb-0">
                    <div className={`absolute left-[-24px] w-4 h-4 rounded-full border-2 ${
                      idx === activeOrder.timeline.length - 1 ? 'bg-fitsona-500 border-fitsona-500' : 'bg-white border-gray-300'
                    }`} />
                    {idx < activeOrder.timeline.length - 1 && (
                      <div className="absolute left-[-18px] top-4 w-0.5 h-full bg-gray-200" />
                    )}
                    <div>
                      <p className="font-semibold text-sm text-navy-800">{event.status}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                        {event.location && (
                          <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Items</h3>
              <div className="space-y-4">
                {activeOrder.items.map(item => (
                  <div key={item.productId} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-800">{item.productName}</p>
                      <p className="text-xs text-gray-500">{item.color} / {item.size.toUpperCase()} &middot; Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-navy-800 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>${activeOrder.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{activeOrder.shipping === 0 ? 'FREE' : `$${activeOrder.shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tax</span><span>${activeOrder.tax.toFixed(2)}</span></div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-${activeOrder.discount.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between text-base font-bold border-t pt-2"><span>Total</span><span>${activeOrder.total.toFixed(2)}</span></div>
              </div>
            </div>

            {/* Help */}
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-navy-800 mb-3">Need Help?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/shipping" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-fitsona-200 transition-colors">
                  <HelpCircle size={20} className="text-fitsona-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">Return or Exchange</p>
                    <p className="text-xs text-gray-500">Free returns within 30 days</p>
                  </div>
                </Link>
                <Link href="/shipping#contact" className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-fitsona-200 transition-colors">
                  <HelpCircle size={20} className="text-fitsona-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">Contact Support</p>
                    <p className="text-xs text-gray-500">We&apos;re here to help</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
