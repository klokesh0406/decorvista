import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryCard from '@/components/ui/CategoryCard';
import { CATEGORIES } from '@/types';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'All Categories – DecorVista',
  description: 'Browse all home decor categories including Bedroom, Bathroom, Living Room, Kitchen, Balcony, and more.',
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <p className="section-label">Browse & Discover</p>
            <h1 className={styles.title}>All Decor Categories</h1>
            <p className={styles.subtitle}>
              Choose a room to explore curated products handpicked just for that space.
            </p>
          </div>
          <div className={styles.grid}>
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} delay={i * 40} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
