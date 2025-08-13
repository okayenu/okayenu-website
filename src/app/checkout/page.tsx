// checkout-update: 1025































































































































































































'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Truck, Shield, ChevronRight, Lock, Tag, MapPin, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function CheckoutPage() {
  const { items, total } = useCartStore()
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [shippingMethod, setShippingMethod] = useState('standard')

  const subtotal = total()
  const shipping = shippingMethod === 'express' ? 19.99 : shippingMethod === 'nextday' ? 29.99 : subtotal > 75 ? 0 : 9.99
  const tax = subtotal * 0.0875
  const finalTotal = subtotal + shipping + tax

  const steps = [
    { key: 'shipping', label: 'Shipping', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'review', label: 'Review', icon: Shield },
  ] as const

  if (items.length === 0) {
    return (
      <div className="page-container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-800 mb-4">Your bag is empty</h1>
        <Link href="/categories" className="btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="page-container py-8">
      <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-6">
        <ArrowLeft size={14} /> Continue Shopping
      </Link>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((s, idx) => {
          const Icon = s.icon
          const isActive = step === s.key
          const isPast = steps.findIndex(x => x.key === step) > idx
          return (
            <div key={s.key} className="flex items-center gap-2">
              {idx > 0 && <div className={`w-12 h-0.5 ${isPast ? 'bg-fitsona-400' : 'bg-gray-200'}`} />}
              <button
                onClick={() => isPast && setStep(s.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-fitsona-500 text-white' : isPast ? 'bg-fitsona-50 text-fitsona-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon size={16} /> {s.label}
              </button>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">First Name</label>
                  <input type="text" className="input-field" placeholder="Jane" defaultValue="Fashion" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Last Name</label>
                  <input type="text" className="input-field" placeholder="Doe" defaultValue="Enthusiast" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Street Address</label>
                  <input type="text" className="input-field" placeholder="123 Main St" defaultValue="123 Style Avenue" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Apt / Suite (optional)</label>
                  <input type="text" className="input-field" placeholder="Apt 4B" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">City</label>
                  <input type="text" className="input-field" placeholder="New York" defaultValue="New York" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">State</label>
                    <input type="text" className="input-field" placeholder="NY" defaultValue="NY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">ZIP</label>
                    <input type="text" className="input-field" placeholder="10001" defaultValue="10001" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone</label>
                  <input type="tel" className="input-field" placeholder="(555) 123-4567" defaultValue="(555) 123-4567" />
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-navy-800 mt-8 mb-4">Shipping Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'standard', label: 'Standard Shipping', time: '5-7 business days', price: subtotal > 75 ? 'FREE' : '$9.99' },
                  { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: '$19.99' },
                  { id: 'nextday', label: 'Next-Day Delivery', time: 'Order by 2 PM EST', price: '$29.99' },
                ].map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === method.id ? 'border-fitsona-400 bg-fitsona-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value={method.id} checked={shippingMethod === method.id} onChange={() => setShippingMethod(method.id)}
                        className="text-fitsona-500 focus:ring-fitsona-400" />
                      <div>
                        <p className="text-sm font-semibold text-navy-800">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-navy-800">{method.price}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => setStep('payment')} className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
                Continue to Payment <ChevronRight size={16} />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Card Number</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" className="input-field pl-10" placeholder="4242 4242 4242 4242" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">Expiry Date</label>
                    <input type="text" className="input-field" placeholder="MM / YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1.5">CVC</label>
                    <input type="text" className="input-field" placeholder="123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Name on Card</label>
                  <input type="text" className="input-field" placeholder="Jane Doe" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <Lock size={12} />
                <span>Your payment info is encrypted and secure</span>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep('shipping')} className="btn-ghost flex items-center gap-1">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => setStep('review')} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  Review Order <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Review Your Order</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-800">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.selectedColor} / {item.selectedSize.toUpperCase()} &middot; Qty: {item.quantity}</p>
                      <p className="text-sm font-bold mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ship to</p>
                  <p className="text-sm text-navy-800 font-medium">123 Style Avenue</p>
                  <p className="text-xs text-gray-500">New York, NY 10001</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Payment</p>
                  <p className="text-sm text-navy-800 font-medium">Visa ending in 4242</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('payment')} className="btn-ghost flex items-center gap-1">
                  <ArrowLeft size={14} /> Back
                </button>
                <Link href="/orders" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Lock size={16} /> Place Order &middot; ${finalTotal.toFixed(2)}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="card p-6 h-fit sticky top-24">
          <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy-800 text-white text-[10px] rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-navy-800 font-medium truncate">{item.product.name}</p>
                  <p className="text-[10px] text-gray-400">{item.selectedSize.toUpperCase()}</p>
                </div>
                <span className="text-xs font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-base font-bold border-t pt-3"><span>Total</span><span className="text-navy-800">${finalTotal.toFixed(2)}</span></div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-xl text-xs text-green-700 flex items-center gap-2">
            <Shield size={14} />
            <span>Protected by Fitsona Buyer Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}
