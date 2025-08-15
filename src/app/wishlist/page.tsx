// wishlist-update: 227








'use client'

import { useState } from 'react'
import { Heart, Trash2, ShoppingBag, ArrowRight, Share2, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useWishlistStore, useCartStore } from '@/lib/store'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/data/products'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem, openCart } = useCartStore()
  const [isCopied, setIsCopied] = useState(false)

  const recommendations = products.filter(p => !items.find(i => i.productId === p.id)).slice(0, 4)

  const handleShare = () => {
    // Simulate copying a shareable link
    const shareLink = `https://fitsona.com/wishlist/shared?id=${Math.random().toString(36).substring(7)}`
    navigator.clipboard.writeText(shareLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="page-container py-12 min-h-[80vh]">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-fitsona-500/30 bg-fitsona-500/10">
             <Heart size={14} className="text-fitsona-500" />
             <span className="font-mono text-[10px] text-fitsona-500 uppercase tracking-widest font-bold">// YOUR SAVED ASSETS</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter">
            Personal<br/>Syndicate
          </h1>
          <p className="font-mono text-white/50 text-sm mt-4 uppercase tracking-widest">{items.length} 3D ASSETS SECURED</p>
        </div>
        
        {items.length > 0 && (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare} 
              className="flex items-center gap-2 px-6 py-3 border border-fitsona-500 text-fitsona-500 hover:bg-fitsona-500 hover:text-black font-mono uppercase text-xs font-bold tracking-widest transition-all"
            >
              {isCopied ? <Check size={16} /> : <Share2 size={16} />}
              {isCopied ? 'LINK COPIED' : 'SHARE SYNDICATE'}
            </button>
            <button onClick={clearWishlist} className="text-xs text-white/40 hover:text-red-500 font-mono uppercase tracking-widest flex items-center gap-2 transition-colors">
              <Trash2 size={14} /> Purge All
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-32 border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md">
          <div className="w-24 h-24 border border-white/20 flex items-center justify-center mx-auto mb-6 bg-black/50">
            <Heart size={32} className="text-white/20" />
          </div>
          <h2 className="font-display text-3xl font-bold uppercase mb-4 tracking-tight">No Assets Secured</h2>
          <p className="font-mono text-white/50 text-sm mb-8 uppercase tracking-widest">Initialize your syndicate by saving items from the archives.</p>
          <Link href="/categories" className="btn-primary inline-flex items-center gap-3">
            Enter Archives <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(item => (
            <div key={item.productId} className="relative group">
              <ProductCard product={item.product} />
              <button
                onClick={() => {
                  const size = item.product.sizes.find(s => s.available)?.value || 'm'
                  addItem(item.product, size, item.product.colors[0]?.name || 'Black')
                  openCart()
                }}
                className="absolute top-4 left-4 flex items-center justify-center gap-2 bg-fitsona-500 text-black px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase hover:bg-white transition-colors z-20 opacity-0 group-hover:opacity-100"
              >
                <ShoppingBag size={14} /> To Bag
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <section className="mt-24 pt-12 border-t border-white/10">
          <span className="font-mono text-[10px] text-fitsona-500 uppercase tracking-widest font-bold mb-4 block">// ALGORITHMIC SUGGESTIONS</span>
          <h2 className="font-display text-4xl font-black uppercase mb-8 tracking-tighter">Expand Syndicate</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
