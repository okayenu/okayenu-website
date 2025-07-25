// bugfix-pass: 893















































































































































import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, WishlistItem, User, ChatMessage, Order } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateSize: (productId: string, size: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, size, color) => {
        const existing = get().items.find(
          i => i.productId === product.id && i.selectedSize === size && i.selectedColor === color
        )
        if (existing) {
          set({
            items: get().items.map(i =>
              i.productId === product.id && i.selectedSize === size && i.selectedColor === color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({
            items: [...get().items, {
              productId: product.id,
              product,
              quantity: 1,
              selectedSize: size,
              selectedColor: color,
              addedAt: new Date().toISOString(),
            }],
          })
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }),
      updateSize: (productId, size) =>
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, selectedSize: size } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'fitsona-cart' }
  )
)

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().items.find(i => i.productId === product.id)) {
          set({ items: [...get().items, { productId: product.id, product, addedAt: new Date().toISOString() }] })
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
      isInWishlist: (productId) => get().items.some(i => i.productId === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'fitsona-wishlist' }
  )
)

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, _password) => {
        set({ isLoading: true })
        await new Promise(r => setTimeout(r, 800))
        set({
          user: {
            id: 'user-001',
            email,
            firstName: 'Fashion',
            lastName: 'Enthusiast',
            preferences: {
              sizes: { tops: 'M', bottoms: '32', shoes: '10' },
              favoriteColors: ['Black', 'Navy'],
              favoriteBrands: ['Fitsona Originals'],
              stylePreferences: ['Minimalist', 'Streetwear'],
              notificationSettings: { email: true, push: true, sms: false },
              privacySettings: { shareReviews: true, personalizedRecommendations: true, demographicMatching: true },
            },
            addresses: [{
              id: 'addr-001', label: 'Home', firstName: 'Fashion', lastName: 'Enthusiast',
              street: '123 Style Avenue', city: 'New York', state: 'NY', zipCode: '10001',
              country: 'US', phone: '(555) 123-4567', isDefault: true,
            }],
            paymentMethods: [{
              id: 'pm-001', type: 'card', last4: '4242', brand: 'Visa',
              expiryMonth: 12, expiryYear: 2027, isDefault: true,
            }],
            createdAt: '2025-02-27T00:00:00Z',
          },
          isAuthenticated: true,
          isLoading: false,
        })
      },
      register: async (data) => {
        set({ isLoading: true })
        await new Promise(r => setTimeout(r, 800))
        set({
          user: {
            id: `user-${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            preferences: {
              sizes: {}, favoriteColors: [], favoriteBrands: [], stylePreferences: [],
              notificationSettings: { email: true, push: true, sms: false },
              privacySettings: { shareReviews: true, personalizedRecommendations: true, demographicMatching: false },
            },
            addresses: [],
            paymentMethods: [],
            createdAt: new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
        })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => {
        const user = get().user
        if (user) set({ user: { ...user, ...updates } })
      },
    }),
    { name: 'fitsona-auth' }
  )
)

interface SearchStore {
  query: string
  isOpen: boolean
  recentSearches: string[]
  setQuery: (q: string) => void
  openSearch: () => void
  closeSearch: () => void
  addRecentSearch: (q: string) => void
  clearRecent: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      query: '',
      isOpen: false,
      recentSearches: [],
      setQuery: (query) => set({ query }),
      openSearch: () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false, query: '' }),
      addRecentSearch: (q) => {
        const recent = [q, ...get().recentSearches.filter(s => s !== q)].slice(0, 10)
        set({ recentSearches: recent })
      },
      clearRecent: () => set({ recentSearches: [] }),
    }),
    { name: 'fitsona-search' }
  )
)

interface ChatStore {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  toggleChat: () => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Fitsona! I\'m your personal style assistant. I can help you find the perfect outfit, recommend sizes, or answer any questions about our products. What are you looking for today?',
      timestamp: new Date().toISOString(),
      suggestions: ['Show me trending items', 'Help me find my size', 'What\'s new this season?'],
    },
  ],
  isOpen: false,
  isLoading: false,
  addMessage: (msg) =>
    set({
      messages: [...get().messages, { ...msg, id: `msg-${Date.now()}`, timestamp: new Date().toISOString() }],
    }),
  toggleChat: () => set({ isOpen: !get().isOpen }),
  clearMessages: () =>
    set({
      messages: [{
        id: 'welcome',
        role: 'assistant',
        content: 'Welcome back! How can I help you today?',
        timestamp: new Date().toISOString(),
        suggestions: ['Show me trending items', 'Help me find my size', 'What\'s new?'],
      }],
    }),
}))

interface UIStore {
  isMobileMenuOpen: boolean
  activeModal: string | null
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openModal: (id: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  isMobileMenuOpen: false,
  activeModal: null,
  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}))

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: 'ORD-2025-001',
          userId: 'user-001',
          items: [
            { productId: 'prod-0001', productName: 'Fitsona Originals Hoodie Essential', productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200', size: 'M', color: 'Black', quantity: 1, price: 79.99 },
            { productId: 'prod-0003', productName: 'Velvet Arc Sweatshirt Classic', productImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200', size: 'L', color: 'Navy', quantity: 2, price: 64.99 },
          ],
          subtotal: 209.97,
          tax: 18.37,
          shipping: 0,
          discount: 20,
          total: 208.34,
          status: 'in_transit',
          shippingAddress: { id: 'addr-001', label: 'Home', firstName: 'Fashion', lastName: 'Enthusiast', street: '123 Style Avenue', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '(555) 123-4567', isDefault: true },
          paymentMethod: { id: 'pm-001', type: 'card', last4: '4242', brand: 'Visa', expiryMonth: 12, expiryYear: 2027, isDefault: true },
          trackingNumber: '1Z999AA10123456784',
          carrier: 'UPS',
          estimatedDelivery: '2025-04-20',
          timeline: [
            { status: 'Order Placed', description: 'Your order has been confirmed', timestamp: '2025-04-10T10:30:00Z' },
            { status: 'Processing', description: 'Your items are being prepared', timestamp: '2025-04-11T08:00:00Z' },
            { status: 'Shipped', description: 'Package picked up by UPS', timestamp: '2025-04-12T14:20:00Z', location: 'Brooklyn, NY' },
            { status: 'In Transit', description: 'Package in transit to destination', timestamp: '2025-04-14T06:45:00Z', location: 'Newark, NJ' },
          ],
          createdAt: '2025-04-10T10:30:00Z',
          updatedAt: '2025-04-14T06:45:00Z',
        },
        {
          id: 'ORD-2025-002',
          userId: 'user-001',
          items: [
            { productId: 'prod-0005', productName: 'Cascade Jacket Limited', productImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200', size: 'M', color: 'Rose', quantity: 1, price: 129.99 },
          ],
          subtotal: 129.99,
          tax: 11.37,
          shipping: 9.99,
          discount: 0,
          total: 151.35,
          status: 'delivered',
          shippingAddress: { id: 'addr-001', label: 'Home', firstName: 'Fashion', lastName: 'Enthusiast', street: '123 Style Avenue', city: 'New York', state: 'NY', zipCode: '10001', country: 'US', phone: '(555) 123-4567', isDefault: true },
          paymentMethod: { id: 'pm-001', type: 'card', last4: '4242', brand: 'Visa', expiryMonth: 12, expiryYear: 2027, isDefault: true },
          trackingNumber: '1Z999AA10123456785',
          carrier: 'FedEx',
          estimatedDelivery: '2025-03-28',
          timeline: [
            { status: 'Order Placed', description: 'Your order has been confirmed', timestamp: '2025-03-22T15:00:00Z' },
            { status: 'Processing', description: 'Your items are being prepared', timestamp: '2025-03-23T09:00:00Z' },
            { status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2025-03-24T11:30:00Z', location: 'Los Angeles, CA' },
            { status: 'In Transit', description: 'Package in transit', timestamp: '2025-03-26T08:00:00Z', location: 'Denver, CO' },
            { status: 'Delivered', description: 'Package delivered to front door', timestamp: '2025-03-28T14:22:00Z', location: 'New York, NY' },
          ],
          createdAt: '2025-03-22T15:00:00Z',
          updatedAt: '2025-03-28T14:22:00Z',
        },
      ],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      getOrder: (id) => get().orders.find(o => o.id === id),
    }),
    { name: 'fitsona-orders' }
  )
)
