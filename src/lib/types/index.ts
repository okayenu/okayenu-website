export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  category: string
  subcategory: string
  images: string[]
  colors: ColorVariant[]
  sizes: SizeVariant[]
  rating: number
  reviewCount: number
  tags: string[]
  inStock: boolean
  isNew?: boolean
  isTrending?: boolean
  isFeatured?: boolean
  model3dUrl?: string
  videoReviewUrl?: string
  shippingEstimate: string
  fitType: 'slim' | 'regular' | 'oversized' | 'relaxed'
  gender: 'men' | 'women' | 'unisex'
  material: string
  careInstructions: string[]
  createdAt: string
}

export interface ColorVariant {
  name: string
  hex: string
  image?: string
  available: boolean
}

export interface SizeVariant {
  label: string
  value: string
  available: boolean
  measurements?: {
    chest?: string
    waist?: string
    length?: string
  }
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  body: string
  fitRating: 'too_small' | 'slightly_small' | 'true_to_size' | 'slightly_large' | 'too_large'
  images?: string[]
  videoUrl?: string
  helpful: number
  notHelpful: number
  verified: boolean
  demographics?: ReviewDemographics
  createdAt: string
  affinityScore?: number
}

export interface ReviewDemographics {
  height?: string
  bodyType?: string
  ageRange?: string
  stylePreference?: string
  skinTone?: string
  occasion?: string
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
  addedAt: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  preferences: UserPreferences
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  createdAt: string
}

export interface UserPreferences {
  sizes: Record<string, string>
  favoriteColors: string[]
  favoriteBrands: string[]
  stylePreferences: string[]
  notificationSettings: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacySettings: {
    shareReviews: boolean
    personalizedRecommendations: boolean
    demographicMatching: boolean
  }
}

export interface Address {
  id: string
  label: string
  firstName: string
  lastName: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'applepay' | 'googlepay'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: PaymentMethod
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  timeline: OrderEvent[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  size: string
  color: string
  quantity: number
  price: number
}

export interface OrderEvent {
  status: string
  description: string
  timestamp: string
  location?: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled' | 'returned'

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  productIds: string[]
  isFeatured: boolean
  season?: string
  createdAt: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
  productCount: number
}

export interface WishlistItem {
  productId: string
  product: Product
  addedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  suggestions?: string[]
  productRecommendations?: string[]
}

export interface MerchantProfile {
  id: string
  userId: string
  storeName: string
  storeDescription: string
  logo: string
  banner: string
  approved: boolean
  rating: number
  productCount: number
  policies: {
    shippingPolicy: string
    returnWindow: number
    freeShippingThreshold?: number
  }
  createdAt: string
}

export interface TrendingItem {
  productId: string
  product: Product
  score: number
  saves: number
  conversions: number
  reviewVelocity: number
  pageTraffic: number
}

export interface SearchResult {
  products: Product[]
  categories: string[]
  brands: string[]
  suggestions: string[]
  totalResults: number
}

export interface ShippingRate {
  id: string
  carrier: string
  service: string
  price: number
  estimatedDays: string
  isDefault: boolean
}

export interface GroupRoom {
  id: string
  name: string
  description: string
  members: string[]
  interests: string[]
  createdAt: string
}

export interface DirectMessage {
  id: string
  senderId: string
  recipientId: string
  content: string
  read: boolean
  timestamp: string
}

export interface AnalyticsEvent {
  type: string
  productId?: string
  userId?: string
  metadata: Record<string, unknown>
  timestamp: string
  consentGranted: boolean
}
