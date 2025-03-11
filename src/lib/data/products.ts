// seed-version: 61















import { Product, Collection, Brand, Review } from '@/lib/types'

const placeholderImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
  'https://images.unsplash.com/photo-1434389677669-e08b4cda3a40?w=600',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
]

const heroImages = [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600',
]

const brandNames = ['Fitsona Originals', 'Urban Thread', 'Velvet Arc', 'Noir Studio', 'Cascade', 'Drift & Co', 'Prism Label', 'Meridian']
const categories = ['Hoodies', 'T-Shirts', 'Sweatshirts', 'Long Sleeves', 'Jackets', 'Pants', 'Dresses', 'Accessories']
const fitTypes: Product['fitType'][] = ['slim', 'regular', 'oversized', 'relaxed']
const genders: Product['gender'][] = ['men', 'women', 'unisex']
const materials = ['100% Cotton', 'Cotton Blend', 'Polyester', 'French Terry', 'Jersey Knit', 'Denim', 'Silk Blend', 'Organic Cotton']

function generateProduct(index: number): Product {
  const category = categories[index % categories.length]
  const brand = brandNames[index % brandNames.length]
  const fitType = fitTypes[index % fitTypes.length]
  const gender = genders[index % genders.length]
  const basePrice = 29.99 + (index * 7.5) % 150
  const hasDiscount = index % 3 === 0

  return {
    id: `prod-${String(index + 1).padStart(4, '0')}`,
    name: `${brand} ${category.slice(0, -1)} ${['Essential', 'Premium', 'Classic', 'Signature', 'Limited', 'Sport', 'Luxe', 'Street'][index % 8]}`,
    brand,
    price: Math.round(basePrice * 100) / 100,
    originalPrice: hasDiscount ? Math.round(basePrice * 1.4 * 100) / 100 : undefined,
    description: `Elevate your wardrobe with this ${fitType} fit ${category.toLowerCase().slice(0, -1)} from ${brand}. Crafted from ${materials[index % materials.length].toLowerCase()} for all-day comfort and effortless style.`,
    category,
    subcategory: `${gender}'s ${category}`,
    images: [
      placeholderImages[index % placeholderImages.length],
      placeholderImages[(index + 1) % placeholderImages.length],
      placeholderImages[(index + 2) % placeholderImages.length],
      placeholderImages[(index + 3) % placeholderImages.length],
    ],
    colors: [
      { name: 'Black', hex: '#1a1a1a', available: true },
      { name: 'White', hex: '#ffffff', available: true },
      { name: 'Navy', hex: '#1e1b4b', available: index % 2 === 0 },
      { name: 'Rose', hex: '#e84d75', available: index % 3 === 0 },
    ],
    sizes: [
      { label: 'XS', value: 'xs', available: index % 5 !== 0 },
      { label: 'S', value: 's', available: true },
      { label: 'M', value: 'm', available: true },
      { label: 'L', value: 'l', available: true },
      { label: 'XL', value: 'xl', available: index % 4 !== 0 },
      { label: 'XXL', value: 'xxl', available: index % 3 === 0 },
    ],
    rating: 3.5 + (index % 15) / 10,
    reviewCount: 10 + (index * 17) % 300,
    tags: [category.toLowerCase(), fitType, gender, brand.toLowerCase().replace(/\s/g, '-')],
    inStock: index % 10 !== 0,
    isNew: index % 5 === 0,
    isTrending: index % 7 === 0,
    isFeatured: index < 8,
    shippingEstimate: index % 2 === 0 ? 'Free shipping' : '2-5 business days',
    fitType,
    gender,
    material: materials[index % materials.length],
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on low heat'],
    createdAt: new Date(2025, 1, 27 + Math.floor(index / 3)).toISOString(),
  }
}

export const products: Product[] = Array.from({ length: 64 }, (_, i) => generateProduct(i))

export const featuredProducts = products.filter(p => p.isFeatured)
export const trendingProducts = products.filter(p => p.isTrending)
export const newArrivals = products.filter(p => p.isNew)

export const collections: Collection[] = [
  {
    id: 'col-001',
    name: 'Spring Essentials',
    description: 'Refresh your wardrobe with lightweight layers and vibrant colors for the new season.',
    image: heroImages[0],
    productIds: products.slice(0, 8).map(p => p.id),
    isFeatured: true,
    season: 'Spring 2025',
    createdAt: '2025-02-27T00:00:00Z',
  },
  {
    id: 'col-002',
    name: 'Street Culture',
    description: 'Bold silhouettes and statement pieces that define contemporary street style.',
    image: heroImages[1],
    productIds: products.slice(8, 16).map(p => p.id),
    isFeatured: true,
    season: 'Year-Round',
    createdAt: '2025-02-27T00:00:00Z',
  },
  {
    id: 'col-003',
    name: 'Minimalist Edit',
    description: 'Clean lines, neutral tones, and timeless design for the modern wardrobe.',
    image: heroImages[2],
    productIds: products.slice(16, 24).map(p => p.id),
    isFeatured: true,
    createdAt: '2025-02-27T00:00:00Z',
  },
  {
    id: 'col-004',
    name: 'Workout Ready',
    description: 'Performance meets style. Activewear engineered for movement and designed for life.',
    image: placeholderImages[5],
    productIds: products.slice(24, 32).map(p => p.id),
    isFeatured: false,
    createdAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'col-005',
    name: 'Summer Nights',
    description: 'After-dark essentials for warm evenings and unforgettable moments.',
    image: placeholderImages[8],
    productIds: products.slice(32, 40).map(p => p.id),
    isFeatured: false,
    season: 'Summer 2025',
    createdAt: '2025-03-15T00:00:00Z',
  },
]

export const brands: Brand[] = brandNames.map((name, i) => ({
  id: `brand-${i + 1}`,
  name,
  logo: placeholderImages[i % placeholderImages.length],
  description: `${name} creates thoughtfully designed fashion that bridges the gap between comfort and style.`,
  productCount: products.filter(p => p.brand === name).length,
}))

export const sampleReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-0001',
    userId: 'user-001',
    userName: 'Alex M.',
    rating: 5,
    title: 'Perfect fit and incredible quality',
    body: 'This is hands down the best hoodie I have ever purchased. The fabric is thick but breathable, and the fit is exactly as described. Highly recommend for anyone looking for a premium everyday piece.',
    fitRating: 'true_to_size',
    helpful: 47,
    notHelpful: 2,
    verified: true,
    demographics: { height: '5\'10"', bodyType: 'Athletic', ageRange: '25-34', stylePreference: 'Streetwear' },
    createdAt: '2025-03-10T14:30:00Z',
  },
  {
    id: 'rev-002',
    productId: 'prod-0001',
    userId: 'user-002',
    userName: 'Jordan K.',
    rating: 4,
    title: 'Great but runs slightly large',
    body: 'Love the design and the material quality. I went with my usual size M but it feels a bit roomy. Would recommend sizing down if you prefer a fitted look. Color is exactly as shown.',
    fitRating: 'slightly_large',
    helpful: 32,
    notHelpful: 5,
    verified: true,
    demographics: { height: '5\'6"', bodyType: 'Slim', ageRange: '18-24', stylePreference: 'Minimalist' },
    createdAt: '2025-03-12T09:15:00Z',
  },
  {
    id: 'rev-003',
    productId: 'prod-0002',
    userId: 'user-003',
    userName: 'Sam R.',
    rating: 5,
    title: 'A wardrobe staple',
    body: 'This piece has become my go-to for every occasion. The versatility is unmatched, whether I dress it up or keep it casual. The quality after multiple washes is still pristine.',
    fitRating: 'true_to_size',
    images: [placeholderImages[4]],
    helpful: 61,
    notHelpful: 3,
    verified: true,
    demographics: { height: '6\'1"', bodyType: 'Regular', ageRange: '25-34', stylePreference: 'Classic' },
    createdAt: '2025-03-15T16:45:00Z',
  },
]

export const heroSlides = [
  {
    id: 1,
    title: 'Define Your Style',
    subtitle: 'Spring/Summer 2025 Collection',
    cta: 'Shop Now',
    image: heroImages[0],
    link: '/categories',
  },
  {
    id: 2,
    title: 'Made for Movement',
    subtitle: 'Activewear that keeps up with you',
    cta: 'Explore',
    image: heroImages[1],
    link: '/categories?category=activewear',
  },
  {
    id: 3,
    title: 'Less is More',
    subtitle: 'The Minimalist Edit',
    cta: 'Discover',
    image: heroImages[2],
    link: '/lookbook',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}

export function getReviewsForProduct(productId: string): Review[] {
  return sampleReviews.filter(r => r.productId === productId)
}
