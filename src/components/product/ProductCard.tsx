'use client'

import Link from 'next/link'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { Product } from '@/lib/types'
import { useWishlistStore, useCartStore } from '@/lib/store'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCart, openCart } = useCartStore()
  const wishlisted = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlisted) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const defaultSize = product.sizes.find(s => s.available)?.value || 'm'
    const defaultColor = product.colors.find(c => c.available)?.name || 'Black'
    addToCart(product, defaultSize, defaultColor)
    openCart()
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/product/${product.id}`} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
          <p className="text-sm font-medium text-navy-800 truncate">{product.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-navy-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="card-interactive">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <span className="badge-primary text-[10px]">NEW</span>}
            {product.isTrending && <span className="badge bg-amber-100 text-amber-700 text-[10px]">TRENDING</span>}
            {product.originalPrice && (
              <span className="badge bg-red-100 text-red-600 text-[10px]">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all hover:scale-110"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              className={wishlisted ? 'fill-fitsona-500 text-fitsona-500' : 'text-gray-600'}
            />
          </button>

          {/* Quick actions overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex gap-2">
              <button
                onClick={handleQuickAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-navy-800 py-2.5 rounded-xl text-xs font-semibold hover:bg-fitsona-500 hover:text-white transition-colors"
              >
                <ShoppingBag size={14} /> Quick Add
              </button>
              <Link
                href={`/product/${product.id}`}
                className="p-2.5 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/40 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={14} />
              </Link>
            </div>
          </div>

          {/* Color swatches */}
          <div className="absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-0 transition-opacity">
            {product.colors.filter(c => c.available).slice(0, 4).map(color => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-navy-800 mt-0.5 line-clamp-1">{product.name}</h3>

          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-base font-bold text-navy-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {variant !== 'compact' && (
            <div className="flex gap-1 mt-2">
              {product.colors.filter(c => c.available).slice(0, 5).map(color => (
                <div
                  key={color.name}
                  className="w-3.5 h-3.5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.filter(c => c.available).length > 5 && (
                <span className="text-[10px] text-gray-400 flex items-center">
                  +{product.colors.filter(c => c.available).length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
