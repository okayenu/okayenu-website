// cart-update: 740




























































































































'use client'

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  if (!isOpen) return null

  const subtotal = total()
  const discount = promoApplied ? subtotal * 0.15 : 0
  const shipping = subtotal > 75 ? 0 : 9.99
  const finalTotal = subtotal - discount + shipping

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={closeCart} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-fitsona-500" />
            <h2 className="font-display text-xl font-bold text-navy-800">
              Your Bag ({items.length})
            </h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">Your bag is empty</h3>
            <p className="text-gray-500 text-sm mb-6">Discover something you love and add it here.</p>
            <Link href="/categories" onClick={closeCart} className="btn-primary inline-flex items-center gap-2">
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map(item => (
                <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-navy-800 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.selectedColor} / {item.selectedSize.toUpperCase()}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50 rounded-l-lg transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50 rounded-r-lg transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-navy-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Promo Code */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:border-fitsona-400 focus:ring-1 focus:ring-fitsona-100 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => { if (promoCode) setPromoApplied(true) }}
                    className="px-4 py-2.5 bg-navy-800 text-white text-sm font-medium rounded-xl hover:bg-navy-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                    <Tag size={12} /> 15% discount applied!
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t p-6 space-y-3 bg-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount (15%)</span>
                  <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-navy-800">${finalTotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-3"
              >
                Checkout <ArrowRight size={16} />
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-gray-500 hover:text-navy-800 transition-colors py-2"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
