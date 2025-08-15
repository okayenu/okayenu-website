'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { products, trendingProducts } from '@/lib/data/products'

function ProductsContent() {
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')
  const filter = searchParams.get('filter')

  let displayProducts = [...products]
  let title = 'All Products'

  if (sort === 'trending') {
    displayProducts = trendingProducts
    title = 'Trending Now'
  } else if (filter === 'sale') {
    displayProducts = products.filter(p => p.originalPrice)
    title = 'On Sale'
  }

  return (
    <div className="page-container py-8">
      <h1 className="section-heading mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{displayProducts.length} products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayProducts.slice(0, 12).map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {displayProducts.length > 12 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-white/20 text-white font-mono uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-colors">
            Load More Models
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="page-container py-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
