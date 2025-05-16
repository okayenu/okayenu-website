// analytics-update: 434























































'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles, TrendingUp, Zap, Shield } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { heroSlides, collections, featuredProducts, trendingProducts, newArrivals, brands } from '@/lib/data/products'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400', count: 24 },
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', count: 36 },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', count: 18 },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', count: 22 },
    { name: 'Pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', count: 20 },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', count: 31 },
  ]

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative z-20 page-container h-full flex items-center">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 bg-fitsona-500/20 backdrop-blur-sm text-fitsona-300 text-xs font-semibold rounded-full mb-6 tracking-wider uppercase border border-fitsona-500/30">
              {heroSlides[currentSlide].subtitle}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-md">
              Explore curated collections designed to express your unique identity. Fashion that tells your story.
            </p>
            <div className="flex items-center gap-4">
              <Link href={heroSlides[currentSlide].link} className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                {heroSlides[currentSlide].cta} <ArrowRight size={20} />
              </Link>
              <Link href="/lookbook" className="btn-ghost text-white hover:bg-white/10">
                View Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide ? 'w-8 h-2 bg-fitsona-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors hidden md:block"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors hidden md:block"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* Features Bar */}
      <section className="bg-navy-800 py-4">
        <div className="page-container flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {[
            { icon: Zap, text: 'Free Express Shipping' },
            { icon: Shield, text: '30-Day Returns' },
            { icon: Sparkles, text: '3D Try-On Technology' },
            { icon: Star, text: 'Curated Collections' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/80 text-sm">
              <Icon size={16} className="text-fitsona-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Category Chips */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="section-heading">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Find exactly what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                href={`/categories?category=${cat.name.toLowerCase()}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-white/60 text-xs">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="page-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-heading">New Arrivals</h2>
              <p className="text-gray-500 mt-1">Fresh drops you don&apos;t want to miss</p>
            </div>
            <Link href="/categories?filter=new" className="hidden sm:flex items-center gap-1 text-fitsona-500 font-medium text-sm hover:text-fitsona-600 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Spotlight */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="section-heading">Curated Collections</h2>
            <p className="text-gray-500 mt-2">Hand-picked edits for every mood and moment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.slice(0, 3).map(col => (
              <Link key={col.id} href={`/categories?collection=${col.id}`} className="group relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  {col.season && <span className="badge bg-white/20 text-white text-[10px] backdrop-blur-sm mb-2">{col.season}</span>}
                  <h3 className="text-white font-display text-2xl font-bold">{col.name}</h3>
                  <p className="text-white/70 text-sm mt-1 line-clamp-2">{col.description}</p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-medium mt-3 group-hover:text-fitsona-300 transition-colors">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="page-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-fitsona-400" />
                <span className="text-fitsona-400 text-sm font-semibold uppercase tracking-wider">Hot Right Now</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Trending</h2>
            </div>
            <Link href="/products?sort=trending" className="hidden sm:flex items-center gap-1 text-fitsona-400 font-medium text-sm hover:text-fitsona-300">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          <h2 className="section-heading text-center mb-10">Our Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {brands.slice(0, 8).map(brand => (
              <Link key={brand.id} href={`/categories?brand=${brand.name}`}
                className="flex flex-col items-center p-6 rounded-2xl border border-gray-100 hover:border-fitsona-200 hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-800 to-fitsona-500 flex items-center justify-center text-white font-display text-xl font-bold mb-3">
                  {brand.name.charAt(0)}
                </div>
                <span className="font-semibold text-navy-800 text-sm group-hover:text-fitsona-500 transition-colors">{brand.name}</span>
                <span className="text-xs text-gray-400 mt-0.5">{brand.productCount} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 gradient-primary">
        <div className="page-container text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Join the Fitsona Community</h2>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Get early access to new drops, exclusive offers, and personalized style recommendations.
          </p>
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 border border-white/30 focus:border-white focus:bg-white/30 outline-none transition-all"
            />
            <button className="btn-secondary px-8 py-4">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
