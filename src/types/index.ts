export interface Product {
  id: string;
  productName: string;
  category: string;
  storeName: 'Amazon' | 'Flipkart' | 'IKEA' | 'Other';
  productLink: string;
  imageUrl: string;
  description: string;
  price?: string;
  status: 'active' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  heroImage: string;
}

export const CATEGORIES: Category[] = [
  { id: 'bedroom', name: 'Bedroom', slug: 'bedroom', icon: '🛏️', description: 'Create your perfect sleep sanctuary', heroImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80' },
  { id: 'bathroom', name: 'Bathroom', slug: 'bathroom', icon: '🛁', description: 'Transform your bathroom into a spa', heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
  { id: 'living-room', name: 'Living Room', slug: 'living-room', icon: '🛋️', description: 'Design a welcoming living space', heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 'kitchen', name: 'Kitchen', slug: 'kitchen', icon: '🍳', description: 'Style your culinary haven', heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id: 'balcony', name: 'Balcony', slug: 'balcony', icon: '🌿', description: 'Your private outdoor retreat', heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { id: 'study-room', name: 'Study Room', slug: 'study-room', icon: '📚', description: 'A space built for focus', heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 'gaming-room', name: 'Gaming Room', slug: 'gaming-room', icon: '🎮', description: 'Level up your gaming setup', heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80' },
  { id: 'outdoor-decor', name: 'Outdoor Decor', slug: 'outdoor-decor', icon: '🌳', description: 'Beautiful spaces beyond your walls', heroImage: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80' },
  { id: 'wall-decor', name: 'Wall Decor', slug: 'wall-decor', icon: '🖼️', description: 'Art that speaks to your walls', heroImage: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=800&q=80' },
  { id: 'lighting', name: 'Lighting', slug: 'lighting', icon: '💡', description: 'Set the perfect mood with light', heroImage: 'https://images.unsplash.com/photo-1513506003901-1e6a35f7e28b?w=800&q=80' },
  { id: 'furniture', name: 'Furniture', slug: 'furniture', icon: '🪑', description: 'Timeless pieces for every room', heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
];

export const STORE_NAMES = ['Amazon', 'Flipkart', 'IKEA', 'Other'] as const;
