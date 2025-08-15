'use client'

import Link from 'next/link'
import { Heart, ShoppingBag, Eye, Box } from 'lucide-react'
import { Product } from '@/lib/types'
import { useWishlistStore, useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
}

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Suspense, useState } from 'react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCart, openCart } = useCartStore()
  const wishlisted = isInWishlist(product.id)
  const [isHovered, setIsHovered] = useState(false)

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
      <Link href={`/product/${product.id}`} className="group block h-full">
        <div className="flex gap-6 p-4 hover:bg-white/5 transition-colors h-full cursor-pointer">
          <div className="w-24 h-24 overflow-hidden bg-navy-950 flex-shrink-0 relative">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover filter grayscale-[20%] contrast-125 group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="font-display text-lg font-bold text-white truncate uppercase">{product.name}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-mono font-bold text-fitsona-500">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`} className="group block h-full bg-[#050505] relative overflow-hidden">
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-[#111]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-[#111] to-[#050505] transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}>
          {product.model3dUrl ? (
            <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ alpha: true, powerPreference: "high-performance" }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={2.5} />
              <directionalLight position={[-10, -10, -5]} intensity={1.5} />
              <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} />
              <Suspense fallback={null}>
                <Stage environment="studio" intensity={1.2} adjustCamera={1.2}>
                  <Model url={product.model3dUrl} />
                </Stage>
              </Suspense>
              <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                autoRotate={isHovered} 
                autoRotateSpeed={4} 
              />
            </Canvas>
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover filter grayscale-[20%] contrast-125 transition-all duration-700 ease-out`}
              loading="lazy"
            />
          )}
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-fitsona-500 text-black px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="bg-white text-black px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
              Hot
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-600 text-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* 3D Badge */}
        {product.model3dUrl && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/20 p-2 rounded-full z-10 text-white">
            <Box size={14} />
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center gap-4">
          <Button
            onClick={handleQuickAdd}
            className="bg-fitsona-500 hover:bg-white text-black font-bold uppercase tracking-widest rounded-none border-none w-3/4 h-12"
          >
            Quick Add
          </Button>
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={handleWishlistToggle}
              className={`w-12 h-12 rounded-none border-white/30 hover:border-fitsona-500 hover:bg-transparent transition-colors ${wishlisted ? 'border-fitsona-500 text-fitsona-500' : 'text-white bg-transparent'}`}
            >
              <Heart size={18} className={wishlisted ? 'fill-fitsona-500' : ''} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-none border-white/30 text-white bg-transparent hover:border-white hover:bg-white hover:text-black transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-xl font-bold text-white uppercase leading-tight line-clamp-2 group-hover:text-fitsona-500 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="font-mono text-lg font-bold text-fitsona-500">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="font-mono text-sm text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {variant !== 'compact' && (
          <div className="flex gap-2 mt-4 items-center">
            {product.colors.filter(c => c.available).slice(0, 4).map(color => (
              <div
                key={color.name}
                className="w-4 h-4 border border-white/20"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.filter(c => c.available).length > 4 && (
              <span className="font-mono text-[10px] text-white/40 font-bold ml-1">
                +{product.colors.filter(c => c.available).length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
