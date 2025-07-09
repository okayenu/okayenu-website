// shipping-update: 773










































'use client'

import { Truck, RotateCcw, Clock, MapPin, HelpCircle, Phone, Mail, MessageCircle, ChevronDown, Package, Shield, Globe } from 'lucide-react'
import { useState } from 'react'

export default function ShippingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const shippingMethods = [
    { icon: Package, name: 'Standard Shipping', time: '5-7 business days', price: '$9.99', note: 'Free on orders over $75' },
    { icon: Truck, name: 'Express Shipping', time: '2-3 business days', price: '$19.99', note: 'Guaranteed delivery' },
    { icon: Clock, name: 'Next-Day Delivery', time: 'Next business day', price: '$29.99', note: 'Order by 2 PM EST' },
    { icon: Globe, name: 'International', time: '7-14 business days', price: 'From $24.99', note: 'Duties may apply' },
  ]

  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days, express takes 2-3 business days, and next-day delivery is available for orders placed before 2 PM EST.' },
    { q: 'Do you offer free shipping?', a: 'Yes! Free standard shipping is available on all orders over $75 within the continental US.' },
    { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order in the Orders section of your account.' },
    { q: 'What is your return policy?', a: 'We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.' },
    { q: 'Can I exchange an item?', a: 'Yes! You can request an exchange for a different size or color within 30 days. Start the process from your Orders page.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.' },
  ]

  return (
    <div className="page-container py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="section-heading">Shipping & Delivery</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">Fast, reliable shipping with easy returns. We make sure your fashion finds arrive safely.</p>
      </div>

      {/* Shipping Methods */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Shipping Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shippingMethods.map(method => {
            const Icon = method.icon
            return (
              <div key={method.name} className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-fitsona-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-fitsona-500" />
                </div>
                <h3 className="font-semibold text-navy-800">{method.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{method.time}</p>
                <p className="text-xl font-bold text-navy-800 mt-2">{method.price}</p>
                <p className="text-xs text-fitsona-500 mt-1">{method.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Returns */}
      <section id="returns" className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-800 mb-4">Easy Returns & Exchanges</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <RotateCcw size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">Free Returns</h3>
                  <p className="text-sm text-gray-500">Return any item within 30 days for a full refund</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">Free Exchanges</h3>
                  <p className="text-sm text-gray-500">Swap for a different size or color at no cost</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">Buyer Protection</h3>
                  <p className="text-sm text-gray-500">Every purchase is covered by our satisfaction guarantee</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-fitsona-50 to-cream-100 rounded-2xl">
            <h3 className="font-display text-xl font-bold text-navy-800 mb-3">Track Your Return</h3>
            <p className="text-sm text-gray-600 mb-4">Enter your order number to check the status of your return or exchange.</p>
            <div className="flex gap-2">
              <input type="text" className="input-field" placeholder="Order number (e.g. ORD-2025-001)" />
              <button className="btn-primary whitespace-nowrap">Track</button>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section id="size-guide" className="mb-16">
        <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Size Guide</h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Size</th>
                  <th className="px-6 py-3 text-left font-medium">US</th>
                  <th className="px-6 py-3 text-left font-medium">Chest (in)</th>
                  <th className="px-6 py-3 text-left font-medium">Waist (in)</th>
                  <th className="px-6 py-3 text-left font-medium">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['XS', '0-2', '31-33', '24-26', '34-36'],
                  ['S', '4-6', '34-36', '27-29', '37-39'],
                  ['M', '8-10', '37-39', '30-32', '40-42'],
                  ['L', '12-14', '40-42', '33-35', '43-45'],
                  ['XL', '16-18', '43-45', '36-38', '46-48'],
                  ['XXL', '20-22', '46-48', '39-41', '49-51'],
                ].map(row => (
                  <tr key={row[0]} className="hover:bg-gray-50">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-6 py-3 ${i === 0 ? 'font-semibold text-navy-800' : 'text-gray-600'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-16">
        <h2 className="font-display text-2xl font-bold text-navy-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy-800 text-sm pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="font-display text-3xl font-bold mb-3">Need Help?</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">Our support team is available 7 days a week to assist you.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white text-fitsona-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
            <MessageCircle size={18} /> Live Chat
          </a>
          <a href="mailto:support@fitsona.com" className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors">
            <Mail size={18} /> Email Us
          </a>
          <a href="tel:+15551234567" className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors">
            <Phone size={18} /> Call Us
          </a>
        </div>
      </section>
    </div>
  )
}
