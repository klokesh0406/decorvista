import Image from 'next/image';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

interface Props { product: Product; }

const STORE_COLORS: Record<string, string> = {
  Amazon: 'badge-amazon',
  Flipkart: 'badge-flipkart',
  IKEA: 'badge-ikea',
  Other: 'badge-other',
};

export default function ProductCard({ product }: Props) {
  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <Image
          src={product.imageUrl}
          alt={`${product.productName} – ${product.category} decor`}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={styles.storeTag}>
          <span className={`badge ${STORE_COLORS[product.storeName] || 'badge-other'}`}>
            {product.storeName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name} title={product.productName}>
          {product.productName}
        </h3>
        {product.description && (
          <p className={styles.desc}>{product.description}</p>
        )}
        <div className={styles.footer}>
          {product.price && (
            <span className={styles.price}>{product.price}</span>
          )}
          <a
            href={product.productLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={styles.cta}
            aria-label={`View ${product.productName} on ${product.storeName}`}
          >
            View Product
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
