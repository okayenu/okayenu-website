'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { collections, products } from '@/lib/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function LookbookPage() {
  const editorials = [
    {
      title: 'The Art of Layering',
      subtitle: 'Spring 2025',
      description: 'Master the art of transitional dressing with versatile layers that take you from morning coffee to evening cocktails.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
      products: products.slice(0, 4),
    },
    {
      title: 'Urban Nomad',
      subtitle: 'Street Culture Edit',
      description: 'Where functionality meets fashion. Pieces designed for the modern explorer who never stops moving.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
      products: products.slice(8, 12),
    },
    {
      title: 'Quiet Luxury',
      subtitle: 'The Minimalist Collection',
      description: 'Understated elegance for those who let quality speak louder than logos. Less is infinitely more.',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200',
      products: products.slice(16, 20),
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 h-full flex items-center justify-center text-center page-container">
          <div>
            <span className="text-fitsona-400 text-sm font-semibold uppercase tracking-[0.3em]">Spring / Summer 2025</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mt-4 mb-4">The Lookbook</h1>
            <p className="text-white/70 text-lg max-w-lg mx-auto">Curated editorial stories that explore the intersection of fashion, culture, and self-expression.</p>
          </div>
        </div>
      </section>

      {/* Editorials */}
      {editorials.map((editorial, idx) => (
        <section key={idx} className={`py-16 md:py-24 ${idx % 2 === 1 ? 'bg-gray-50' : ''}`}>
          <div className="page-container">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={editorial.image} alt={editorial.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-fitsona-500 text-sm font-semibold uppercase tracking-wider">{editorial.subtitle}</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-800 mt-2 mb-4">{editorial.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{editorial.description}</p>
                <Link href="/categories" className="btn-primary inline-flex items-center gap-2">
                  Shop the Look <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-xl font-bold text-navy-800 mb-6">From This Edit</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {editorial.products.map(p => <ProductCard key={p.id} product={p} variant="compact" />)}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Collections Grid */}
      <section className="py-16 gradient-hero">
        <div className="page-container">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-10">Explore Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.slice(0, 3).map(col => (
              <Link key={col.id} href={`/categories?collection=${col.id}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-display text-2xl font-bold">{col.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{col.description}</p>
                  <span className="inline-flex items-center gap-1 text-fitsona-300 text-sm font-medium mt-3">
                    View Collection <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
