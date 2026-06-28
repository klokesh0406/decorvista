'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct, uploadProductImage } from '@/lib/products';
import { Product, CATEGORIES, STORE_NAMES } from '@/types';
import toast from 'react-hot-toast';
import Image from 'next/image';
import styles from '../../product-form.module.css';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    productName: '',
    category: '',
    storeName: 'Amazon' as 'Amazon' | 'Flipkart' | 'IKEA' | 'Other',
    productLink: '',
    description: '',
    price: '',
    status: 'active' as 'active' | 'hidden',
  });

  useEffect(() => {
    const load = async () => {
      const p = await getProductById(id);
      if (!p) { router.push('/admin/products'); return; }
      setProduct(p);
      setForm({
        productName: p.productName,
        category: p.category,
        storeName: p.storeName,
        productLink: p.productLink,
        description: p.description || '',
        price: p.price || '',
        status: p.status,
      });
      setImagePreview(p.imageUrl);
      setLoading(false);
    };
    load();
  }, [id, router]);

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
    if (!form.productLink.startsWith('http')) { toast.error('Product link must start with http:// or https://'); return; }

    setSaving(true);
    try {
      let imageUrl = product!.imageUrl;
      if (imageFile) { imageUrl = await uploadProductImage(imageFile); }
      await updateProduct(id, { ...form, imageUrl });
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-center"><div className="spinner" /><p>Loading product…</p></div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Product</h1>
        <p className={styles.subtitle}>Update the details for "{product?.productName}"</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageSection}>
          <label className={styles.imageLabel}>Product Image</label>
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
                <span>Click to upload new image</span>
                <span className={styles.uploadHint}>PNG, JPG, WEBP – max 5 MB</span>
              </label>
            )}
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
          </div>
        </div>

        <div className={styles.fields}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input type="text" className="form-input" value={form.productName} onChange={e => set('productName', e.target.value)} required />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)} required>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Store *</label>
              <select className="form-input" value={form.storeName} onChange={e => set('storeName', e.target.value as typeof form.storeName)} required>
                {STORE_NAMES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Product Link *</label>
            <input type="url" className="form-input" value={form.productLink} onChange={e => set('productLink', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea className={`form-input ${styles.textarea}`} value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label">Price <span className={styles.hint}>(optional)</span></label>
              <input type="text" className="form-input" placeholder="₹1,299" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Visibility *</label>
              <select className="form-input" value={form.status} onChange={e => set('status', e.target.value as 'active' | 'hidden')} required>
                <option value="active">Active – visible to users</option>
                <option value="hidden">Hidden – not shown publicly</option>
              </select>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving && <span className="spinner" style={{width:'16px',height:'16px',borderWidth:'2px',borderTopColor:'white'}} />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
