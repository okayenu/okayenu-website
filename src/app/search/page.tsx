'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { searchProducts, products } from '@/lib/data/products'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? searchProducts(query) : products

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <h1 className="section-heading">
          {query ? `Results for "${query}"` : 'All Products'}
        </h1>
        <p className="text-gray-500 mt-1">{results.length} product{results.length !== 1 ? 's' : ''} found</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-navy-800 mb-2">No results found</h2>
          <p className="text-gray-500">Try different keywords or browse our categories</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-container py-8"><p>Loading...</p></div>}>
      <SearchResults />
    </Suspense>
  )
}
