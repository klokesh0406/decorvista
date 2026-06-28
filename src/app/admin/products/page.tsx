'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProductsAdmin, deleteProduct, toggleProductStatus } from '@/lib/products';
import { Product, CATEGORIES } from '@/types';
import toast from 'react-hot-toast';
import styles from './page.module.css';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('All');
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await getAllProductsAdmin();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.productName}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id, product.imageUrl);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      toast.success('Product deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const handleToggle = async (product: Product) => {
    const newStatus = product.status === 'active' ? 'hidden' : 'active';
    try {
      await toggleProductStatus(product.id, newStatus);
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, status: newStatus } : p));
      toast.success(`Product is now ${newStatus}.`);
    } catch { toast.error('Failed to update status.'); }
  };

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'All' || p.category === catFilter;
    const matchSearch = !search.trim() || p.productName.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>All Products</h1>
          <p className={styles.subtitle}>{products.length} total · {products.filter(p => p.status === 'active').length} active</p>
        </div>
        <Link href="/admin/add-product" className="btn-primary">+ Add Product</Link>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`form-input ${styles.searchInput}`}
        />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="form-input">
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /><p>Loading products…</p></div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No products found. <Link href="/admin/add-product" className={styles.addLink}>Add your first product →</Link></p>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Product</span>
            <span>Category</span>
            <span>Store</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filtered.map(product => (
            <div key={product.id} className={styles.row}>
              <div className={styles.productCell}>
                <div className={styles.productImg}>
                  <Image src={product.imageUrl} alt={product.productName} fill className={styles.productImgInner} />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.productName}</p>
                  {product.price && <p className={styles.productPrice}>{product.price}</p>}
                </div>
              </div>
              <span className={styles.cell}>{product.category}</span>
              <span className={styles.cell}>
                <span className={`badge badge-${product.storeName.toLowerCase()}`}>{product.storeName}</span>
              </span>
              <span className={styles.cell}>
                <span className={`badge badge-${product.status}`}>{product.status}</span>
              </span>
              <div className={styles.actionsCell}>
                <button onClick={() => handleToggle(product)} className={styles.actionBtn} title={product.status === 'active' ? 'Hide product' : 'Show product'}>
                  {product.status === 'active' ? '👁️' : '🚫'}
                </button>
                <Link href={`/admin/edit-product/${product.id}`} className={styles.actionBtn} title="Edit product">✏️</Link>
                <button onClick={() => handleDelete(product)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete product">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
