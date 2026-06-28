'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllProductsAdmin, toggleProductStatus, deleteProduct } from '@/lib/products';
import { Product, CATEGORIES } from '@/types';
import toast from 'react-hot-toast';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getAllProductsAdmin();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const total = products.length;
  const active = products.filter(p => p.status === 'active').length;
  const hidden = products.filter(p => p.status === 'hidden').length;

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.name).length,
  })).filter(c => c.count > 0).sort((a, b) => b.count - a.count);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's your content overview.</p>
        </div>
        <Link href="/admin/add-product" className="btn-primary">+ Add Product</Link>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { label: 'Total Products', value: total, icon: '📦', color: '#3D2E22' },
          { label: 'Active', value: active, icon: '✅', color: '#2E7D32' },
          { label: 'Hidden', value: hidden, icon: '👁️', color: '#E65100' },
          { label: 'Categories', value: CATEGORIES.length, icon: '🗂️', color: '#1565C0' },
        ].map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statIcon}>{s.icon}</span>
            <div>
              <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* By Category */}
      {byCategory.length > 0 && (
        <div className={styles.catBreakdown}>
          <h2 className={styles.sectionTitle}>Products by Category</h2>
          <div className={styles.catGrid}>
            {byCategory.map(c => (
              <div key={c.id} className={styles.catCard}>
                <span className={styles.catIcon}>{c.icon}</span>
                <div>
                  <p className={styles.catName}>{c.name}</p>
                  <p className={styles.catCount}>{c.count} product{c.count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.quickLinks}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actions}>
          <Link href="/admin/add-product" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <div>
              <p className={styles.actionTitle}>Add New Product</p>
              <p className={styles.actionDesc}>Upload a new decor product</p>
            </div>
          </Link>
          <Link href="/admin/products" className={styles.actionCard}>
            <span className={styles.actionIcon}>📋</span>
            <div>
              <p className={styles.actionTitle}>Manage Products</p>
              <p className={styles.actionDesc}>Edit, hide, or delete products</p>
            </div>
          </Link>
          <Link href="/" target="_blank" className={styles.actionCard}>
            <span className={styles.actionIcon}>🌐</span>
            <div>
              <p className={styles.actionTitle}>View Website</p>
              <p className={styles.actionDesc}>See how your site looks publicly</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
