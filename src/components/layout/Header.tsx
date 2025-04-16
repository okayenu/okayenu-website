// layout-version: 276


// a11y-pass: 86






















'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore, useWishlistStore, useSearchStore, useUIStore, useAuthStore } from '@/lib/store'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchOverlay from '@/components/search/SearchOverlay'

const navLinks = [
  { label: 'New In', href: '/categories?filter=new', highlight: true },
  { label: 'Women', href: '/categories?gender=women' },
  { label: 'Men', href: '/categories?gender=men' },
  { label: 'Collections', href: '/categories' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Trending', href: '/products?sort=trending' },
]

export default function Header() {
  const { itemCount, isOpen: cartOpen, toggleCart } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { openSearch, isOpen: searchOpen } = useSearchStore()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const { isAuthenticated } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20)
    })
  }

  return (
    <>
      <div className="h-8 gradient-primary flex items-center justify-center">
        <p className="text-white text-xs font-medium tracking-wider uppercase">
          Free shipping on orders over $75 | New members get 15% off
        </p>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-white'}`}>
        <div className="page-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-navy-800">Fit</span>
                <span className="text-fitsona-500">sona</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    link.highlight
                      ? 'text-fitsona-600 hover:bg-fitsona-50'
                      : 'text-navy-800 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={openSearch}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-navy-800" />
              </button>

              <Link
                href={isAuthenticated ? '/profile' : '/auth'}
                className="hidden sm:flex p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Account"
              >
                <User size={20} className="text-navy-800" />
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} className="text-navy-800" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-fitsona-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} className="text-navy-800" />
                {itemCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-fitsona-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
            <nav className="page-container py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    link.highlight
                      ? 'text-fitsona-600 bg-fitsona-50'
                      : 'text-navy-800 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-3" />
              <Link href={isAuthenticated ? '/profile' : '/auth'} onClick={closeMobileMenu}
                className="block px-4 py-3 text-base font-medium text-navy-800 hover:bg-gray-50 rounded-xl">
                {isAuthenticated ? 'My Account' : 'Sign In / Register'}
              </Link>
              <Link href="/orders" onClick={closeMobileMenu}
                className="block px-4 py-3 text-base font-medium text-navy-800 hover:bg-gray-50 rounded-xl">
                Orders & Tracking
              </Link>
              <Link href="/dashboard" onClick={closeMobileMenu}
                className="block px-4 py-3 text-base font-medium text-navy-800 hover:bg-gray-50 rounded-xl">
                Merchant Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
      {searchOpen && <SearchOverlay />}
    </>
  )
}
