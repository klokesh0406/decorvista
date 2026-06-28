import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/types';

const COLLECTION = 'products';

function toDateString(value: unknown): string {
  if (!value) return new Date().toISOString();
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
  return new Date().toISOString();
}

function productFromDoc(document: { id: string; data: () => Record<string, unknown> }): Product {
  const data = document.data();
  return {
    id: document.id,
    productName: String(data.productName ?? ''),
    category: String(data.category ?? ''),
    storeName: (data.storeName as Product['storeName']) ?? 'Other',
    productLink: String(data.productLink ?? ''),
    imageUrl: String(data.imageUrl ?? ''),
    description: String(data.description ?? ''),
    price: data.price ? String(data.price) : '',
    status: (data.status as Product['status']) ?? 'hidden',
    createdAt: toDateString(data.createdAt),
    updatedAt: toDateString(data.updatedAt),
  };
}

// No Firebase Storage needed in the free setup.
// Product images are stored as external image URLs in Firestore.
export async function deleteProductImage(_imageUrl: string): Promise<void> {
  return;
}

// Add a new product
export async function addProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all active products for a category (public)
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION),
    where('category', '==', category),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(productFromDoc);
}

// Get ALL products for admin panel
export async function getAllProductsAdmin(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(productFromDoc);
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return productFromDoc(snap);
}

// Update a product
export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

// Delete a product
export async function deleteProduct(id: string, imageUrl?: string): Promise<void> {
  if (imageUrl) await deleteProductImage(imageUrl);
  await deleteDoc(doc(db, COLLECTION, id));
}

// Toggle product status
export async function toggleProductStatus(id: string, status: 'active' | 'hidden'): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status, updatedAt: serverTimestamp() });
}
