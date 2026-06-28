'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/products';
import { CATEGORIES, STORE_NAMES } from '@/types';
import toast from 'react-hot-toast';
import Image from 'next/image';
import styles from '../product-form.module.css';

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    productName: '',
    category: CATEGORIES[0].name,
    storeName: 'Amazon' as 'Amazon' | 'Flipkart' | 'IKEA' | 'Other',
    productLink: '',
    imageUrl: '',
    description: '',
    price: '',
    status: 'active' as 'active' | 'hidden',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const isValidUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(form.productLink)) { toast.error('Product link must start with http:// or https://'); return; }
    if (!isValidUrl(form.imageUrl)) { toast.error('Image URL must start with http:// or https://'); return; }

    setSaving(true);
    try {
      await addProduct(form);
      toast.success('Product added successfully!');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product. Please check Firestore rules and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Product</h1>
        <p className={styles.subtitle}>Fill in the details below to add a product to your catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Image URL */}
        <div className={styles.imageSection}>
          <label className={styles.imageLabel}>Product Image URL *</label>
          <div className={styles.imageUploadArea}>
            {form.imageUrl && isValidUrl(form.imageUrl) ? (
              <div className={styles.imagePreview}>
                <Image src={form.imageUrl} alt="Preview" fill className={styles.previewImg} unoptimized />
                <button type="button" onClick={() => set('imageUrl', '')} className={styles.removeImg}>✕</button>
              </div>
            ) : (
              <div className={styles.uploadPlaceholder}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Paste an image URL below</span>
                <span className={styles.uploadHint}>Use any direct image URL starting with https://</span>
              </div>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className={styles.fields}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Product Name *</label>
            <input id="name" type="text" className="form-input" placeholder="e.g. Minimalist Bedside Lamp" value={form.productName} onChange={e => set('productName', e.target.value)} required />
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category *</label>
              <select id="category" className="form-input" value={form.category} onChange={e => set('category', e.target.value)} required>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="store">Store *</label>
              <select id="store" className="form-input" value={form.storeName} onChange={e => set('storeName', e.target.value as typeof form.storeName)} required>
                {STORE_NAMES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="link">Product Link * <span className={styles.hint}>(Amazon / Flipkart / IKEA URL)</span></label>
            <input id="link" type="url" className="form-input" placeholder="https://www.amazon.in/product..." value={form.productLink} onChange={e => set('productLink', e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="imageUrl">Product Image URL * <span className={styles.hint}>(direct image URL)</span></label>
            <input id="imageUrl" type="url" className="form-input" placeholder="https://images.unsplash.com/photo-..." value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="desc">Short Description</label>
            <textarea id="desc" className={`form-input ${styles.textarea}`} placeholder="Briefly describe what makes this product great..." value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">Price <span className={styles.hint}>(optional)</span></label>
              <input id="price" type="text" className="form-input" placeholder="e.g. ₹1,299 or $29.99" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="status">Visibility *</label>
              <select id="status" className="form-input" value={form.status} onChange={e => set('status', e.target.value as 'active' | 'hidden')} required>
                <option value="active">Active – visible to users</option>
                <option value="hidden">Hidden – not shown publicly</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving && <span className="spinner" style={{width:'16px',height:'16px',borderWidth:'2px',borderTopColor:'white'}} />}
              {saving ? 'Adding Product…' : 'Add Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
