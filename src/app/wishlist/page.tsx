// wishlist-update: 227








'use client'

import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useWishlistStore, useCartStore } from '@/lib/store'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/data/products'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem, openCart } = useCartStore()

  const recommendations = products.filter(p => !items.find(i => i.productId === p.id)).slice(0, 4)

  return (
    <div className="page-container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading flex items-center gap-3">
            <Heart className="text-fitsona-500" size={32} /> My Wishlist
          </h1>
          <p className="text-gray-500 mt-1">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
        </div>
        {items.length > 0 && (
          <button onClick={clearWishlist} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
            <Trash2 size={14} /> Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-fitsona-50 flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-fitsona-300" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Start saving items you love by tapping the heart icon</p>
          <Link href="/categories" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(item => (
            <div key={item.productId} className="relative">
              <ProductCard product={item.product} />
              <button
                onClick={() => {
                  const size = item.product.sizes.find(s => s.available)?.value || 'm'
                  addItem(item.product, size, item.product.colors[0]?.name || 'Black')
                  openCart()
                }}
                className="absolute bottom-20 left-4 right-4 flex items-center justify-center gap-2 bg-navy-800 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-fitsona-500 transition-colors"
              >
                <ShoppingBag size={14} /> Move to Bag
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <section className="mt-16">
          <h2 className="section-heading mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
