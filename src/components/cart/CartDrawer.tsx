// cart-update: 744






























































































































'use client'

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { products } from '@/lib/data/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const drawerRef = useFocusTrap(isOpen, closeCart)

  if (!isOpen) return null

  const subtotal = total()
  const discount = promoApplied ? subtotal * 0.15 : 0
  const shipping = subtotal > 75 ? 0 : 9.99
  const finalTotal = subtotal - discount + shipping

  // AI Recommendation Logic (Smart Cart)
  const cartCategories = items.map(i => i.product.category)
  const recommendedProduct = products.find(p => !cartCategories.includes(p.category) && p.inStock) || products[0]

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={closeCart} aria-hidden="true" />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 shadow-2xl z-50 flex flex-col animate-slide-in-right text-white"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-fitsona-500" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              SYNDICATE BAG ({items.length})
            </h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-none border border-transparent hover:border-white/20 transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#050505]">
            <div className="w-24 h-24 rounded-none bg-[#111] border border-white/10 flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-white/20" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-widest mb-2">Bag is empty</h3>
            <p className="text-white/40 font-mono text-xs uppercase mb-8">Access the archives to acquire pieces.</p>
            <Link href="/categories" onClick={closeCart} className="btn-primary inline-flex items-center gap-2">
              Explore Archives <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map(item => (
                <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 bg-[#111] border border-white/10 relative group">
                  <div className="w-24 h-28 bg-[#050505] flex-shrink-0 border border-white/5 overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover filter grayscale-[20%] contrast-125 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="font-display text-lg font-bold uppercase truncate leading-tight">{item.product.name}</p>
                      <p className="font-mono text-[10px] text-fitsona-500 mt-1 uppercase tracking-widest">
                        {item.selectedColor} // {item.selectedSize}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-0 border border-white/20 bg-transparent">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-mono text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-mono text-base font-bold text-fitsona-500">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* AI Smart Cart Recommendation */}
              <div className="mt-8 border border-fitsona-500/30 bg-fitsona-500/5 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Sparkles size={64} className="text-fitsona-500" />
                </div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <Sparkles size={14} className="text-fitsona-500" />
                  <span className="font-mono text-[10px] text-fitsona-500 font-bold uppercase tracking-widest">
                    AI SYNDICATE MATCH
                  </span>
                </div>
                <div className="flex gap-4 items-center relative z-10">
                  <div className="w-16 h-20 bg-[#050505] border border-white/10 overflow-hidden flex-shrink-0">
                    <img src={recommendedProduct.images[0]} alt={recommendedProduct.name} className="w-full h-full object-cover filter grayscale" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold uppercase leading-tight line-clamp-2">{recommendedProduct.name}</p>
                    <p className="font-mono text-xs text-white/60 mt-1">${recommendedProduct.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => {
                      const defaultSize = recommendedProduct.sizes.find(s => s.available)?.value || 'm'
                      const defaultColor = recommendedProduct.colors.find(c => c.available)?.name || 'Black'
                      useCartStore.getState().addItem(recommendedProduct, defaultSize, defaultColor)
                    }}
                    className="w-10 h-10 border border-fitsona-500 flex items-center justify-center text-fitsona-500 hover:bg-fitsona-500 hover:text-black transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="pt-4">
                <div className="flex gap-0">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="ACCESS CODE"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-[#111] border border-white/10 border-r-0 text-xs font-mono uppercase focus:border-fitsona-500 focus:ring-0 outline-none placeholder:text-white/20"
                    />
                  </div>
                  <button
                    onClick={() => { if (promoCode) setPromoApplied(true) }}
                    className="px-6 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-fitsona-500 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="font-mono text-[10px] text-fitsona-500 mt-2 flex items-center gap-1 uppercase tracking-widest">
                    <Tag size={10} /> 15% discount active
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-white/10 p-6 space-y-4 bg-[#111]">
              <div className="flex justify-between font-mono text-xs text-white/60 uppercase">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between font-mono text-xs text-fitsona-500 uppercase">
                  <span>Discount (15%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-mono text-xs text-white/60 uppercase">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-display text-2xl font-bold pt-4 border-t border-white/10 uppercase">
                <span>Total</span>
                <span className="text-fitsona-500">${finalTotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full flex items-center justify-center gap-3 mt-4"
              >
                Secure Checkout <ArrowRight size={18} />
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors py-3"
              >
                Return to Archives
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
