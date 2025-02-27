'use client'

import Link from 'next/link'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Tag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/data/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = total()
  const discount = promoApplied ? subtotal * 0.15 : 0
  const shipping = subtotal > 75 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.0875
  const finalTotal = subtotal - discount + shipping + tax

  const recommendations = products.filter(p => !items.find(i => i.productId === p.id)).slice(0, 4)

  if (items.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-navy-800 mb-2">Your shopping bag is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet</p>
        <Link href="/categories" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container py-8">
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-6">
        <ArrowLeft size={14} /> Continue Shopping
      </Link>
      <h1 className="section-heading mb-8">Shopping Bag ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.productId}-${item.selectedSize}`} className="card p-6">
              <div className="flex gap-6">
                <Link href={`/product/${item.productId}`} className="w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{item.product.brand}</p>
                      <Link href={`/product/${item.productId}`} className="font-semibold text-navy-800 hover:text-fitsona-500 transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Color: {item.selectedColor} &middot; Size: {item.selectedSize.toUpperCase()}
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 border rounded-xl">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 hover:bg-gray-50 rounded-l-xl" disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 hover:bg-gray-50 rounded-r-xl">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-navy-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                      {item.quantity > 1 && <p className="text-xs text-gray-400">${item.product.price.toFixed(2)} each</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Order Summary</h3>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                className="input-field pl-9 text-sm" placeholder="Promo code" />
            </div>
            <button onClick={() => { if (promoCode) setPromoApplied(true) }}
              className="px-4 py-2 bg-navy-800 text-white text-sm font-medium rounded-xl hover:bg-navy-700 transition-colors">Apply</button>
          </div>
          {promoApplied && <p className="text-xs text-green-600 mb-3 flex items-center gap-1"><Tag size={12} /> 15% discount applied!</p>}

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {promoApplied && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Estimated tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-lg font-bold border-t pt-3"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
          </div>

          <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          {subtotal < 75 && (
            <p className="text-xs text-center text-gray-400 mt-3">Add ${(75 - subtotal).toFixed(2)} more for free shipping!</p>
          )}
        </div>
      </div>

      <section className="mt-16">
        <h2 className="section-heading mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
