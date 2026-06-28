import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/ui/ProductGrid';
import { CATEGORIES } from '@/types';
import { getProductsByCategory } from '@/lib/products';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

// Always fetch the latest products from Firestore when a category page opens.
// Without this, Vercel can cache the page from the last deployment and new admin products may not show.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find(c => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} Decor Ideas – DecorVista`,
    description: `Browse the best ${cat.name.toLowerCase()} decor products, handpicked and curated by DecorVista. Find the perfect pieces for your ${cat.name.toLowerCase()}.`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.name);

  return (
    <>
      <Navbar />
      <main>
        {/* Category Hero */}
        <section className={styles.hero}>
          <div className={styles.heroImg}>
            <Image src={category.heroImage} alt={`${category.name} decor`} fill className={styles.heroBg} />
            <div className={styles.heroOverlay} />
          </div>
          <div className={`container ${styles.heroContent}`}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/categories">Categories</Link>
              <span>›</span>
              <span>{category.name}</span>
            </nav>
            <span className={styles.heroIcon}>{category.icon}</span>
            <h1 className={styles.heroTitle}>{category.name}</h1>
            <p className={styles.heroDesc}>{category.description}</p>
          </div>
        </section>

        {/* Products */}
        <section className={styles.products}>
          <div className="container">
            <div className={styles.productsHeader}>
              <div>
                <h2 className={styles.productsTitle}>{category.name} Products</h2>
                <p className={styles.productsSubtitle}>Handpicked {category.name.toLowerCase()} decor for your home</p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🪴</span>
                <h3>No products added yet</h3>
                <p>We're curating the best {category.name.toLowerCase()} decor products. Please check back soon.</p>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}

            {/* Affiliate Disclosure */}
            <div className={styles.disclosure}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="m12 8 0 4 0 4M12 8l0 .01"/>
              </svg>
              Some product links may be affiliate links. We may earn a small commission when you purchase through these links, at no extra cost to you.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
