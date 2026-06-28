import {
  collection, addDoc, getDocs, getDoc, doc,
  updateDoc, deleteDoc, query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { Product } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION = 'products';

// Upload image to Firebase Storage
export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `products/${uuidv4()}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Delete image from Firebase Storage
export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch {
    console.warn('Image not found in storage, skipping delete');
  }
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
