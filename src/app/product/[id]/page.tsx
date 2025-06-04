// viewer-update: 543
// pdp-version: 543




































// review-update: 454








































































































































































































































































































'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus, Share2, Ruler, Box } from 'lucide-react'
import { getProductById, getReviewsForProduct, products } from '@/lib/data/products'
import { useCartStore, useWishlistStore } from '@/lib/store'
import ProductCard from '@/components/product/ProductCard'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string) || products[0]
  const reviews = getReviewsForProduct(product.id)
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details')
  const [show3D, setShow3D] = useState(false)

  const { addItem, openCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (!selectedSize) return
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
    }
    openCart()
  }

  const fitRatings = [
    { label: 'Too Small', pct: 5 },
    { label: 'Slightly Small', pct: 15 },
    { label: 'True to Size', pct: 60 },
    { label: 'Slightly Large', pct: 15 },
    { label: 'Too Large', pct: 5 },
  ]

  return (
    <div className="page-container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-navy-800">Home</Link>
        <ChevronRight size={14} />
        <Link href="/categories" className="hover:text-navy-800">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-navy-800 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && <span className="absolute top-4 left-4 badge-primary">NEW</span>}
            {product.originalPrice && (
              <span className="absolute top-4 right-4 badge bg-red-100 text-red-600">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
            <button
              onClick={() => setShow3D(!show3D)}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-navy-800 hover:bg-white transition-colors shadow-lg"
            >
              <Box size={16} /> {show3D ? 'View Photos' : 'View in 3D'}
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImage === idx ? 'border-fitsona-400 ring-2 ring-fitsona-200' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-1">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm font-medium text-navy-800">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-navy-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="badge bg-red-100 text-red-600">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-navy-800 mb-3">Color: <span className="font-normal text-gray-500">{selectedColor}</span></p>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => color.available && setSelectedColor(color.name)}
                  disabled={!color.available}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? 'border-fitsona-400 ring-2 ring-fitsona-200 scale-110' : 'border-gray-200'
                  } ${!color.available ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-navy-800">Size</p>
              <button className="text-sm text-fitsona-500 font-medium flex items-center gap-1 hover:text-fitsona-600">
                <Ruler size={14} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => size.available && setSelectedSize(size.value)}
                  disabled={!size.available}
                  className={`min-w-[3rem] px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    selectedSize === size.value
                      ? 'border-fitsona-400 bg-fitsona-50 text-fitsona-600'
                      : size.available
                        ? 'border-gray-200 text-navy-800 hover:border-gray-300'
                        : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-fitsona-500 mt-2">Please select a size</p>}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border-2 border-gray-200 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 rounded-l-xl">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 rounded-r-xl">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>

            <button
              onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-3.5 rounded-xl border-2 transition-all ${
                wishlisted ? 'border-fitsona-400 bg-fitsona-50' : 'border-gray-200 hover:border-fitsona-200'
              }`}
            >
              <Heart size={20} className={wishlisted ? 'fill-fitsona-500 text-fitsona-500' : 'text-gray-600'} />
            </button>

            <button className="p-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-8 space-y-3 p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={18} className="text-fitsona-500 flex-shrink-0" />
              <span><strong>Free shipping</strong> on orders over $75</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw size={18} className="text-fitsona-500 flex-shrink-0" />
              <span><strong>Free returns</strong> within 30 days</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-fitsona-500 flex-shrink-0" />
              <span><strong>Secure checkout</strong> with encrypted payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b">
          {(['details', 'reviews', 'shipping'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab ? 'border-fitsona-500 text-fitsona-500' : 'border-transparent text-gray-500 hover:text-navy-800'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-bold text-navy-800 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Material</span>
                    <span className="text-navy-800 text-sm font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Fit</span>
                    <span className="text-navy-800 text-sm font-medium capitalize">{product.fitType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Gender</span>
                    <span className="text-navy-800 text-sm font-medium capitalize">{product.gender}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-navy-800 mb-4">Care Instructions</h3>
                <ul className="space-y-2">
                  {product.careInstructions.map((inst, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-fitsona-400" />
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="text-5xl font-bold text-navy-800">{product.rating.toFixed(1)}</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{product.reviewCount} reviews</p>
                </div>
                <div className="md:col-span-2 p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-sm text-navy-800 mb-3">Fit Rating</h4>
                  {fitRatings.map(fr => (
                    <div key={fr.label} className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-500 w-24">{fr.label}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-fitsona-400 transition-all" style={{ width: `${fr.pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{fr.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map(review => (
                  <div key={review.id} className="p-6 border border-gray-100 rounded-2xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-navy-800">{review.userName}</span>
                          {review.verified && <span className="badge bg-green-100 text-green-700 text-[10px]">Verified</span>}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-semibold text-navy-800 mt-3">{review.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.body}</p>
                    {review.demographics && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {Object.entries(review.demographics).map(([k, v]) => v && (
                          <span key={k} className="badge bg-navy-50 text-navy-600 text-[10px]">{v}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <button className="hover:text-navy-800">Helpful ({review.helpful})</button>
                      <button className="hover:text-navy-800">Not helpful ({review.notHelpful})</button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg font-display font-semibold mb-2">No reviews yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                    <button className="btn-primary mt-4">Write a Review</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl space-y-6">
              <div className="p-6 border border-gray-100 rounded-2xl">
                <h3 className="font-display text-lg font-bold text-navy-800 mb-3">Shipping Information</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p><strong>Standard Shipping:</strong> 5-7 business days - $9.99 (Free on orders over $75)</p>
                  <p><strong>Express Shipping:</strong> 2-3 business days - $19.99</p>
                  <p><strong>Next-Day Delivery:</strong> Order by 2 PM EST - $29.99</p>
                </div>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl">
                <h3 className="font-display text-lg font-bold text-navy-800 mb-3">Returns & Exchanges</h3>
                <p className="text-sm text-gray-600">Free returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <h2 className="section-heading mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
