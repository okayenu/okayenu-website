// search-update: 924




























'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchStore } from '@/lib/store'
import { searchProducts, products, trendingProducts } from '@/lib/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function SearchOverlay() {
  const { query, setQuery, closeSearch, recentSearches, addRecentSearch } = useSearchStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState(searchProducts(''))

  useEffect(() => {
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchProducts(query))
    } else {
      setResults([])
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      addRecentSearch(query.trim())
      closeSearch()
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  const trendingTerms = ['Oversized hoodies', 'Summer dresses', 'Street style', 'Minimal basics', 'Activewear']
  const categories = ['Hoodies', 'T-Shirts', 'Jackets', 'Dresses', 'Pants', 'Accessories']

  return (
    <div className="fixed inset-0 z-[60] bg-white">
      <div className="page-container py-4">
        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for products, brands, collections..."
              className="w-full pl-12 pr-4 py-4 text-lg bg-gray-50 rounded-2xl border-2 border-transparent focus:border-fitsona-400 focus:bg-white outline-none transition-all"
            />
          </div>
          <button
            type="button"
            onClick={closeSearch}
            className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </form>

        {query.length < 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={14} /> Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="block w-full text-left px-4 py-2.5 text-navy-800 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp size={14} /> Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTerms.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-gray-50 hover:bg-fitsona-50 text-sm text-navy-800 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    href={`/categories?category=${cat.toLowerCase()}`}
                    onClick={closeSearch}
                    className="px-4 py-3 bg-gradient-to-br from-navy-800 to-navy-900 text-white text-sm font-medium rounded-xl text-center hover:from-fitsona-500 hover:to-fitsona-600 transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Products */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Trending Right Now
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trendingProducts.slice(0, 4).map(p => (
                  <div key={p.id} onClick={closeSearch}>
                    <ProductCard product={p} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
              </p>
              {results.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => { addRecentSearch(query); closeSearch() }}
                  className="text-sm text-fitsona-500 font-medium flex items-center gap-1 hover:text-fitsona-600"
                >
                  View all <ArrowRight size={14} />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {results.slice(0, 8).map(p => (
                <div key={p.id} onClick={closeSearch}>
                  <ProductCard product={p} variant="compact" />
                </div>
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No results found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or browse our categories</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
