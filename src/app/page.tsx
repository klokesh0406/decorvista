import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryCard from '@/components/ui/CategoryCard';
import { CATEGORIES } from '@/types';
import styles from './page.module.css';

export const metadata = {
  title: 'DecorVista – Discover Beautiful Decor Ideas for Every Corner',
  description: 'Explore handpicked home decor products for bedrooms, bathrooms, living rooms, kitchens, balconies, study rooms, and more. Curated for Pinterest lovers.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <p className="section-label">Home Decor Curation</p>
              <h1 className={styles.heroTitle}>
                Discover Beautiful<br />
                <em>Decor Ideas</em> for<br />
                Every Corner
              </h1>
              <p className={styles.heroSubtitle}>
                Explore handpicked home decor products for bedrooms, bathrooms,
                living rooms, kitchens, balconies, study rooms, and more.
              </p>
              <div className={styles.heroActions}>
                <Link href="/categories" className="btn-primary">Browse Categories</Link>
                <a href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Follow on Pinterest
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroGrid}>
                {[
                  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
                  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
                  'https://images.unsplash.com/photo-1513506003901-1e6a35f7e28b?w=400&q=80',
                ].map((src, i) => (
                  <div key={i} className={`${styles.heroImg} ${styles[`heroImg${i}`]}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="Beautiful home decor inspiration" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.heroDecor} />
        </section>

        {/* Stats strip */}
        <section className={styles.stats}>
          <div className={`container ${styles.statsInner}`}>
            {[
              { num: '11+', label: 'Decor Categories' },
              { num: '100%', label: 'Curated Products' },
              { num: 'Daily', label: 'New Additions' },
              { num: 'Free', label: 'To Browse' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className={styles.categories}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="section-label">Browse by Room</p>
              <h2 className={styles.sectionTitle}>Every Corner, Curated</h2>
              <p className={styles.sectionDesc}>
                Click any category to explore handpicked decor products perfect for that space.
              </p>
            </div>
            <div className={styles.categoryGrid}>
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} delay={i * 40} />
              ))}
            </div>
            <div className={styles.categoryFooter}>
              <Link href="/categories" className="btn-outline">View All Categories →</Link>
            </div>
          </div>
        </section>

        {/* Pinterest CTA */}
        <section className={styles.pinterest}>
          <div className="container">
            <div className={styles.pinterestCard}>
              <div className={styles.pinterestIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </div>
              <div>
                <h2 className={styles.pinterestTitle}>Follow DecorVista on Pinterest</h2>
                <p className={styles.pinterestDesc}>
                  Get daily decor inspiration, room ideas, and curated product picks straight to your Pinterest feed.
                </p>
              </div>
              <a
                href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'}
                target="_blank" rel="noopener noreferrer"
                className={styles.pinterestCta}
              >
                Follow Us →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
