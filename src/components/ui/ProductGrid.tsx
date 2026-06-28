'use client';
import { useState, useMemo } from 'react';
import { Product, STORE_NAMES } from '@/types';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

interface Props { products: Product[]; }

export default function ProductGrid({ products }: Props) {
  const [search, setSearch] = useState('');
  const [storeFilter, setStoreFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.productName.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    if (storeFilter !== 'All') {
      result = result.filter(p => p.storeName === storeFilter);
    }
    result.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortBy === 'latest' ? db - da : da - db;
    });

    return result;
  }, [products, search, storeFilter, sortBy]);

  return (
    <div className={styles.wrapper}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
            aria-label="Search products"
          />
        </div>

        <div className={styles.selects}>
          <select
            value={storeFilter}
            onChange={e => setStoreFilter(e.target.value)}
            className={styles.select}
            aria-label="Filter by store"
          >
            <option value="All">All Stores</option>
            {STORE_NAMES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'latest' | 'oldest')}
            className={styles.select}
            aria-label="Sort products"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <p className={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🪴</span>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters, or check back soon for new additions.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 50}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
