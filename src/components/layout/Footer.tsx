// nav-update: 45











import Link from 'next/link'
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', href: '/categories?filter=new' },
    { label: 'Women', href: '/categories?gender=women' },
    { label: 'Men', href: '/categories?gender=men' },
    { label: 'Collections', href: '/categories' },
    { label: 'Trending', href: '/products?sort=trending' },
    { label: 'Sale', href: '/products?filter=sale' },
  ],
  Help: [
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/shipping#returns' },
    { label: 'Size Guide', href: '/shipping#size-guide' },
    { label: 'Track Order', href: '/orders' },
    { label: 'Contact Us', href: '/shipping#contact' },
    { label: 'FAQ', href: '/shipping#faq' },
  ],
  Company: [
    { label: 'About Fitsona', href: '/lookbook' },
    { label: 'Careers', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Sell on Fitsona', href: '/dashboard' },
    { label: 'Affiliate Program', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-3xl font-bold">
                <span className="text-white">Fit</span>
                <span className="text-fitsona-400">sona</span>
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm mb-6">
              Discover fashion that fits your story. Fitsona brings together curated collections,
              3D try-on technology, and a community of style-forward shoppers.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-sm text-white placeholder:text-navy-400 focus:border-fitsona-400 focus:ring-1 focus:ring-fitsona-400 outline-none transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                <Mail size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 bg-navy-800 hover:bg-fitsona-500 rounded-xl transition-colors" aria-label="Social link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-fitsona-400 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-navy-300 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">&copy; 2025 Fitsona. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-navy-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-navy-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-navy-400 hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
