// review-update: 1041


// viewer-update: 1031
































































































// pdp-version: 570

























































































































































































































































































































































'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus, Share2, Ruler, Box } from 'lucide-react'
import { getProductById, getReviewsForProduct, products } from '@/lib/data/products'
import { useCartStore, useWishlistStore } from '@/lib/store'
import ProductCard from '@/components/product/ProductCard'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF, PresentationControls, ContactShadows, useProgress, Html } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Camera } from 'lucide-react'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-fitsona-200 border-t-fitsona-500 rounded-full animate-spin" />
        <div className="text-sm font-medium text-navy-800">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  )
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

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
  const [show3D, setShow3D] = useState(!!product.model3dUrl)

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

  const handleTakeSnapshot = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `fitsona-${product.name.replace(/\s+/g, '-').toLowerCase()}-3d.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

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
          <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-[#111] to-[#050505] border border-white/10">
            {show3D && product.model3dUrl ? (
              <div className="w-full h-full relative">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ preserveDrawingBuffer: true, alpha: true, powerPreference: "high-performance" }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
                  <directionalLight position={[-10, -10, -5]} intensity={1.5} />
                  <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />
                  <Suspense fallback={<Loader />}>
                    <PresentationControls
                      global
                      config={{ mass: 2, tension: 500 }}
                      snap={{ mass: 4, tension: 1500 }}
                      rotation={[0, -0.3, 0]}
                      polar={[-Math.PI / 4, Math.PI / 4]}
                      azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                      <Stage environment="studio" intensity={1.2} adjustCamera={1.2}>
                        <Model url={product.model3dUrl} />
                      </Stage>
                    </PresentationControls>
                  </Suspense>
                  <OrbitControls enablePan={false} enableRotate={false} minZoom={0.5} maxZoom={2} />
                </Canvas>
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={handleTakeSnapshot}
                    className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-mono font-bold text-white hover:bg-white hover:text-black uppercase tracking-widest transition-colors"
                    title="Take Snapshot"
                  >
                    <Camera size={16} /> Snapshot
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                   <span className="font-mono text-xs text-fitsona-500 font-bold tracking-widest uppercase">// INTERACTIVE 3D ASSET</span>
                </div>
              </div>
            ) : (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover filter grayscale-[20%] contrast-125"
              />
            )}
            {!show3D && product.isNew && <span className="absolute top-4 left-4 badge-primary">NEW</span>}
            {!show3D && product.originalPrice && (
              <span className="absolute top-4 right-4 bg-red-600 text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
            {product.model3dUrl && (
              <button
                onClick={() => setShow3D(!show3D)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-sm border border-white/20 font-mono text-xs font-bold text-white hover:bg-white hover:text-black uppercase tracking-widest transition-colors z-10"
              >
                <Box size={16} /> {show3D ? 'VIEW PHOTOS' : 'VIEW IN 3D'}
              </button>
            )}
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
        <div className="text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-fitsona-500/30 bg-fitsona-500/10">
             <span className="font-mono text-[10px] text-fitsona-500 uppercase tracking-widest font-bold">// {product.brand}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-4 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-fitsona-500 text-fitsona-500' : 'text-white/20'} />
              ))}
            </div>
            <span className="text-sm font-mono text-white/60">({product.reviewCount} OPINIONS)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-mono text-4xl font-bold text-fitsona-500">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="font-mono text-xl text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="font-mono text-xs font-bold px-2 py-1 bg-red-600/20 text-red-500 border border-red-600/30">
                  SAVE ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-white/60 mt-6 leading-relaxed font-sans">{product.description}</p>

          {/* Color Selection */}
          <div className="mt-10">
            <p className="font-mono text-xs font-bold text-white/60 mb-4 uppercase tracking-widest">
              Pigment: <span className="text-white">{selectedColor}</span>
            </p>
            <div className="flex gap-4">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => color.available && setSelectedColor(color.name)}
                  disabled={!color.available}
                  className={`w-12 h-12 rounded-none border-2 transition-all ${
                    selectedColor === color.name ? 'border-fitsona-500 ring-4 ring-fitsona-500/20 scale-110' : 'border-white/20'
                  } ${!color.available ? 'opacity-20 cursor-not-allowed' : 'hover:border-white'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs font-bold text-white/60 uppercase tracking-widest">Dimensions</p>
              <button className="text-xs text-fitsona-500 font-mono font-bold flex items-center gap-2 hover:text-white uppercase tracking-widest transition-colors">
                <Ruler size={14} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => size.available && setSelectedSize(size.value)}
                  disabled={!size.available}
                  className={`min-w-[4rem] px-4 py-3 text-sm font-mono font-bold uppercase transition-all ${
                    selectedSize === size.value
                      ? 'bg-fitsona-500 text-black border border-fitsona-500'
                      : size.available
                        ? 'bg-[#111] border border-white/20 text-white hover:border-white hover:bg-white/5'
                        : 'bg-transparent border border-white/10 text-white/20 cursor-not-allowed line-through'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-fitsona-500 mt-3 font-mono">PLEASE SELECT DIMENSIONS</p>}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mt-12">
            <div className="flex items-center border border-white/20 bg-[#111]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 text-white/60 hover:text-white hover:bg-white/5">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-mono font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-4 text-white/60 hover:text-white hover:bg-white/5">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={20} /> ADD TO SYNDICATE BAG
            </button>

            <button
              onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-4 border transition-all ${
                wishlisted ? 'border-fitsona-500 bg-fitsona-500/10 text-fitsona-500' : 'border-white/20 bg-[#111] hover:border-white text-white/60 hover:text-white'
              }`}
            >
              <Heart size={22} className={wishlisted ? 'fill-fitsona-500' : ''} />
            </button>

            <button onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }} className="p-4 border border-white/20 hover:border-white transition-colors bg-[#111] text-white/60 hover:text-white group">
              <Share2 size={22} className="group-hover:text-white" />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-12 space-y-4 p-6 bg-[#111] border border-white/10">
            <div className="flex items-center gap-4 text-sm font-mono text-white/70">
              <Truck size={20} className="text-fitsona-500 flex-shrink-0" />
              <span><strong className="text-white">FREE LOGISTICS</strong> ON SYNDICATE ORDERS &gt; $75</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-mono text-white/70">
              <RotateCcw size={20} className="text-fitsona-500 flex-shrink-0" />
              <span><strong className="text-white">30-DAY PURGE</strong> PERIOD (FREE RETURNS)</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-mono text-white/70">
              <Shield size={20} className="text-fitsona-500 flex-shrink-0" />
              <span><strong className="text-white">ENCRYPTED CHECKOUT</strong> (END-TO-END)</span>
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
