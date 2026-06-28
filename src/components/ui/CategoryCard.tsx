import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import styles from './CategoryCard.module.css';

interface Props { category: Category; delay?: number; }

export default function CategoryCard({ category, delay = 0 }: Props) {
  return (
    <Link href={`/category/${category.slug}`} className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.imageWrap}>
        <Image
          src={category.heroImage}
          alt={`${category.name} decor ideas`}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className={styles.overlay} />
        <span className={styles.icon}>{category.icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{category.name}</h3>
        <p className={styles.desc}>{category.description}</p>
        <span className={styles.cta}>Explore →</span>
      </div>
    </Link>
  );
}
