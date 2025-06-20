// filter-update: 652


















































'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products, collections, brands } from '@/lib/data/products'

const filterOptions = {
  categories: ['Hoodies', 'T-Shirts', 'Sweatshirts', 'Long Sleeves', 'Jackets', 'Pants', 'Dresses', 'Accessories'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#1e1b4b' }, { name: 'Rose', hex: '#e84d75' },
    { name: 'Gray', hex: '#6b7280' }, { name: 'Beige', hex: '#d4b896' },
  ],
  fits: ['Slim', 'Regular', 'Oversized', 'Relaxed'],
  priceRanges: ['Under $25', '$25 - $50', '$50 - $100', '$100 - $200', 'Over $200'],
  sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Rating', 'Most Popular', 'Trending'],
}

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFit, setSelectedFit] = useState<string>('')
  const [sortBy, setSortBy] = useState('Newest')
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large')
  const [showFilters, setShowFilters] = useState(true)

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory)
    if (selectedFit) result = result.filter(p => p.fitType === selectedFit.toLowerCase())
    if (selectedSizes.length) result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s.label) && s.available))
    if (selectedColors.length) result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name) && c.available))

    switch (sortBy) {
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break
      case 'Best Rating': result.sort((a, b) => b.rating - a.rating); break
      case 'Most Popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break
      case 'Trending': result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)); break
    }
    return result
  }, [selectedCategory, selectedSizes, selectedColors, selectedFit, sortBy])

  const activeFilterCount = [selectedCategory, selectedFit, ...selectedSizes, ...selectedColors].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedFit('')
  }

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-heading">Shop All</h1>
        <p className="text-gray-500 mt-1">{filteredProducts.length} products</p>
      </div>

      {/* Collections Banner */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mb-8 -mx-4 px-4">
        {collections.map(col => (
          <div key={col.id} className="flex-shrink-0 w-64 relative rounded-2xl overflow-hidden group cursor-pointer">
            <div className="aspect-[16/9]">
              <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-sm">{col.name}</p>
                <p className="text-white/60 text-xs">{col.productIds.length} items</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            showFilters ? 'bg-navy-800 text-white' : 'bg-gray-100 text-navy-800 hover:bg-gray-200'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-sm text-fitsona-500 font-medium hover:text-fitsona-600 flex items-center gap-1">
            <X size={14} /> Clear all
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <button onClick={() => setGridSize('large')} className={`p-1.5 rounded ${gridSize === 'large' ? 'bg-navy-800 text-white' : 'text-gray-400'}`}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setGridSize('small')} className={`p-1.5 rounded ${gridSize === 'small' ? 'bg-navy-800 text-white' : 'text-gray-400'}`}>
              <Grid3X3 size={16} />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm font-medium text-navy-800 focus:ring-2 focus:ring-fitsona-200 cursor-pointer"
          >
            {filterOptions.sortOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        {showFilters && (
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-sm text-navy-800 mb-3">Category</h3>
              <div className="space-y-1.5">
                {filterOptions.categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat ? 'bg-fitsona-50 text-fitsona-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-semibold text-sm text-navy-800 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizes(
                      selectedSizes.includes(size) ? selectedSizes.filter(s => s !== size) : [...selectedSizes, size]
                    )}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedSizes.includes(size)
                        ? 'border-fitsona-400 bg-fitsona-50 text-fitsona-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="font-semibold text-sm text-navy-800 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColors(
                      selectedColors.includes(color.name) ? selectedColors.filter(c => c !== color.name) : [...selectedColors, color.name]
                    )}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.name) ? 'border-fitsona-400 scale-110 ring-2 ring-fitsona-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Fit Filter */}
            <div>
              <h3 className="font-semibold text-sm text-navy-800 mb-3">Fit</h3>
              <div className="space-y-1.5">
                {filterOptions.fits.map(fit => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(selectedFit === fit ? '' : fit)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFit === fit ? 'bg-fitsona-50 text-fitsona-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className={`grid gap-4 md:gap-6 ${
            gridSize === 'large'
              ? 'grid-cols-2 md:grid-cols-3'
              : 'grid-cols-3 md:grid-cols-4'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                variant={gridSize === 'small' ? 'compact' : 'default'}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-display font-semibold text-navy-800 mb-2">No products found</p>
              <p className="text-gray-500 mb-4">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
