'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDownRight, Star, Sparkles, TrendingUp, Zap, Shield, Play } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { heroSlides, collections, featuredProducts, trendingProducts, newArrivals, brands } from '@/lib/data/products'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'

function HeroModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', count: 24, size: 'large' },
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', count: 36, size: 'small' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', count: 18, size: 'small' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', count: 31, size: 'medium' },
    { name: 'Pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', count: 20, size: 'medium' },
  ]

  return (
    <div className="bg-[#050505] text-white">
      {/* Editorial Hero with Interactive 3D */}
      <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-[#0a0a0a] to-black">
        <div className="absolute inset-0 bg-[#0a0a0a]/50 z-0" />
        
        {/* Huge 3D Model Rendering behind the text */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
           <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ alpha: true }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={3} />
              <directionalLight position={[-10, -10, -5]} intensity={1.5} />
              <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} />
              <Suspense fallback={null}>
                <Stage environment="studio" intensity={1.5} adjustCamera={1.1}>
                  <HeroModel url="/assets/models/3d_hoodie.glb" />
                </Stage>
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={true} 
                autoRotateSpeed={1.5} 
              />
            </Canvas>
        </div>

        <div className="relative z-20 h-full flex flex-col justify-end pb-20 px-4 sm:px-8 max-w-[1600px] mx-auto pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pointer-events-auto">
            <div className="lg:col-span-8">
              <span className="inline-block text-fitsona-500 font-mono text-sm tracking-[0.2em] mb-4">
                // FULL 3D EXPERIENCE ENABLED
              </span>
              <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase break-words drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
                VIRTUAL<br/>AESTHETICS
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <p className="text-white/80 text-lg md:text-xl font-medium mb-8 max-w-sm lg:text-right drop-shadow-lg">
                Explore curated collections designed to express your unique identity. Fashion that tells your story through immersive 3D technology.
              </p>
              <div className="flex gap-4">
                <Link href="/categories" className="btn-primary group pointer-events-auto">
                  <span className="flex items-center gap-3">
                    ENTER ARCHIVES
                    <ArrowDownRight size={24} className="group-hover:rotate-[-45deg] transition-transform" />
                  </span>
                </Link>
                <button className="w-16 h-16 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-full pointer-events-auto">
                  <Play size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-white/10 bg-fitsona-500 text-black py-3 overflow-hidden flex whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-8 font-mono font-bold tracking-widest uppercase">
          <span>FREE WORLDWIDE SHIPPING</span>
          <Star size={16} />
          <span>30-DAY RETURNS</span>
          <Star size={16} />
          <span>3D TRY-ON TECHNOLOGY</span>
          <Star size={16} />
          <span>NEW SUMMER COLLECTION</span>
          <Star size={16} />
          <span>FREE WORLDWIDE SHIPPING</span>
          <Star size={16} />
          <span>30-DAY RETURNS</span>
          <Star size={16} />
          <span>3D TRY-ON TECHNOLOGY</span>
          <Star size={16} />
          <span>NEW SUMMER COLLECTION</span>
        </div>
      </div>

      {/* Asymmetric Masonry Categories */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-fitsona-500 font-mono tracking-widest text-sm mb-4 block">// CATEGORIES</span>
              <h2 className="section-heading">Shop The Look</h2>
            </div>
            <Link href="/categories" className="text-white/60 hover:text-fitsona-500 font-mono tracking-widest text-sm uppercase flex items-center gap-2 transition-colors">
              View All Archives <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/categories?category=${cat.name.toLowerCase()}`}
                className={`group relative overflow-hidden bg-navy-900 border border-white/10 hover:border-fitsona-500 transition-colors ${
                  cat.size === 'large' ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 
                  cat.size === 'medium' ? 'md:col-span-2 aspect-[2/1]' : 
                  'md:col-span-1 aspect-square'
                }`}
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover filter grayscale-[50%] contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-end justify-between w-[calc(100%-3rem)]">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white uppercase">{cat.name}</h3>
                    <p className="font-mono text-fitsona-500 text-sm mt-2">{cat.count} PIECES</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:bg-fitsona-500 group-hover:text-black group-hover:border-fitsona-500 transition-colors">
                    <ArrowDownRight size={20} className="group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brutalist Grid */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-fitsona-500 font-mono tracking-widest text-sm mb-4 block">// LATEST ARRIVALS</span>
              <h2 className="section-heading">Season 04 Drop</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10">
            {newArrivals.slice(0, 8).map((product, index) => (
              <div key={product.id} className="border-r border-b border-white/10">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-fitsona-500 text-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
          <h2 className="text-[15vw] font-black leading-none text-black/5 whitespace-nowrap select-none absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/4">
            FITSONA ARCHIVES
          </h2>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mix-blend-difference text-white">
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter">
            Join The<br/>Syndicate
          </h2>
          <p className="font-mono text-lg mb-10 max-w-lg mx-auto">
            EARLY ACCESS TO EXPERIMENTAL DROPS. EXCLUSIVE 3D ASSETS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="w-full sm:w-auto min-w-[300px] px-6 py-4 bg-transparent border-2 border-white text-white placeholder:text-white/50 font-mono uppercase focus:outline-none focus:bg-white/10 transition-colors"
            />
            <button className="w-full sm:w-auto bg-white text-black font-bold uppercase tracking-widest px-8 py-4 border-2 border-white hover:bg-transparent hover:text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
