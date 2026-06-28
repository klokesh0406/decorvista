'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, uploadProductImage } from '@/lib/products';
import { CATEGORIES, STORE_NAMES } from '@/types';
import toast from 'react-hot-toast';
import Image from 'next/image';
import styles from '../product-form.module.css';

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    productName: '',
    category: CATEGORIES[0].name,
    storeName: 'Amazon' as 'Amazon' | 'Flipkart' | 'IKEA' | 'Other',
    productLink: '',
    description: '',
    price: '',
    status: 'active' as 'active' | 'hidden',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB'); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) { toast.error('Please upload a product image'); return; }
    if (!form.productLink.startsWith('http')) { toast.error('Product link must start with http:// or https://'); return; }

    setSaving(true);
    try {
      const imageUrl = await uploadProductImage(imageFile);
      await addProduct({ ...form, imageUrl });
      toast.success('Product added successfully!');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product. Please try again.');
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
        {/* Image Upload */}
        <div className={styles.imageSection}>
          <label className={styles.imageLabel}>Product Image *</label>
          <div className={styles.imageUploadArea}>
            {imagePreview ? (
              <div className={styles.imagePreview}>
                <Image src={imagePreview} alt="Preview" fill className={styles.previewImg} />
                <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); }} className={styles.removeImg}>✕</button>
              </div>
            ) : (
              <label htmlFor="imageInput" className={styles.uploadPlaceholder}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Click to upload image</span>
                <span className={styles.uploadHint}>PNG, JPG, WEBP – max 5 MB</span>
              </label>
            )}
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
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
