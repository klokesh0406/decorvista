import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/types';

const COLLECTION = 'products';

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
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

// Get ALL products for admin panel
export async function getAllProductsAdmin(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
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
